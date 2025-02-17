/**
Copyright 2020 spurreiter

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Adapter } from './adapter/default.js'
import { Tokens } from './tokens.js'
import { endpoints } from './endpoints.js'

import {
  Callback,
  checkSilentLogin,
  createPromise,
  debouncePromises,
  EventEmitter,
  get,
  initOptions,
  loadConfig,
  StatusIframe,
  urlEncoded
} from './utils/index.js'

import { IMPLICIT, STANDARD, TYPE_URLENCODED } from './constants.js'

/** @typedef {import('./client').Options} Options */
/** @typedef {import('./types').OidcError} OidcError */

export class Client extends EventEmitter {
  /**
   * @param {Options} [options]
   */
  constructor(options = { url: '', clientId: '' }) {
    super()
    this.options = initOptions(options)
    this.adapter = options.adapter || new Adapter()
    this.callback = new Callback(this.options)
    // @ts-ignore
    this.tokens = new Tokens(this.options)
    this.debounce = debouncePromises()
    this.endpoints = null
    this.statusIframe = new StatusIframe(this)
    this.checkSilentLogin = checkSilentLogin
    // try to load tokens
    // @ts-expect-error
    this.tokens.fromInitOptions(this.options)
    this.isInitialized = false
  }

  async init() {
    try {
      const { log } = this.options
      const { serverUrl, clientId, oidcConfig } = await loadConfig(this.options)
      this.options.clientId = clientId
      this.endpoints = endpoints(serverUrl, oidcConfig, this.callback)
      this.adapter.initialize(this)
      this.options.redirectUri = this.adapter.redirectUri()
      this.isInitialized = true
      log.info('oidcConfig loaded %o', oidcConfig)

      await this._processInit()
      this._schedule()
      return this._handleToken()
    } catch (err) {
      this._handleError(err)
      return Promise.reject(err)
    }
  }

  async _processInit() {
    const oauth = this.callback.parse(window.location.href)
    if (oauth) {
      window.history.replaceState(window.history.state, '', oauth.newUrl)
      if (oauth.valid) {
        return this._processCallback(oauth)
      }
    }

    const { token, refreshToken } = this.tokens
    if (token && refreshToken) {
      return this._processWithTokens()
    }
    const isExpired = this.tokens.isTokenExpired(this.options.minValidity)
    if (token && isExpired) {
      return this._handleLogout()
    }
    if (this.options.forceLogin) {
      return this.login()
    }
  }

  async _processWithTokens() {
    // check if session is still valid
    // throws if invalid otherwise starts timer
    await this.statusIframe.schedule()

    // force refresh if status iframe is disabled
    const _minValidity = !this.statusIframe.enabled
      ? -1
      : this.options.minValidity

    return this._refresh(_minValidity).then(
      (tokens) => tokens || this.tokens.getTokens()
    ) // tokens may not be present if not yet expired
  }

  async _processCallback(oauth) {
    const { flow, clientId, scope, scopeInTokenRequest } = this.options
    const { code, error, iss } = oauth

    // see https://github.com/keycloak/keycloak-community/blob/main/design/application-initiated-actions.md
    if (oauth.kc_action_status) {
      this.emit('action', { status: oauth.kc_action_status })
    }

    if (error) {
      /** @type {OidcError} */
      const err = new Error(error)
      err.description = oauth.error_description
      return Promise.reject(err)
    }

    if (!this.endpoints?.verifyIssuer(iss)) {
      return Promise.reject(new Error('invalid_issuer'))
    }

    // if IMPLICIT or HYBRID flow contain an access token
    if (flow !== STANDARD && oauth.access_token && !oauth.code) {
      return this._authSuccess(oauth, oauth)
    }

    // if STANDARD or HYBRID flow contain a code
    if (flow !== IMPLICIT && code) {
      const query = {
        code,
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: oauth.redirectUri
      }
      if (scopeInTokenRequest) {
        query.scope = scope
      }

      if (oauth.pkceCodeVerifier) {
        query.code_verifier = oauth.pkceCodeVerifier
      }
      // @ts-ignore
      const url = this.endpoints.createTokenUrl()
      this.tokens.startTokenRequest()
      // @ts-expect-error
      const res = await fetchToken(url, query, this.options)
      if (res.status === 200) {
        const tokenResponse = await res.json()
        return this._authSuccess(tokenResponse, oauth)
      }
      const error = await res.json()
      /** @type {OidcError} */
      const err = new Error(get(error, 'error', 'auth error'))
      err.status = res.status
      err.description = get(error, 'error_description')
      return Promise.reject(err)
    }
  }

  async _authSuccess(tokenResponse, oauth) {
    this.tokens.setTokens(tokenResponse)

    if (this.tokens.isInvalidNonce(oauth.storedNonce)) {
      return Promise.reject(new Error('invalid nonce'))
    }

    await this.statusIframe.schedule()
  }

  async _refresh(minValidity = this.options.minValidity) {
    const promise = createPromise()
    const { log, clientId } = this.options
    const { tokens } = this

    const isExpired = tokens.isTokenExpired(minValidity)

    if (!this.tokens.refreshToken) {
      if (isExpired) {
        this._handleLogout()
      }
      promise.reject(new Error('no refresh token'))
      return promise
    }

    let needsRefresh = false
    if (minValidity === -1) {
      needsRefresh = true
      log.info('forced refresh')
    } else if (isExpired) {
      needsRefresh = true
      log.info('token expired')
    }

    if (!needsRefresh) {
      log.info('token expires in %s seconds', this.tokens.expiresIn())
      promise.resolve()
    } else if (this.debounce.push(promise)) {
      const query = {
        grant_type: 'refresh_token',
        refresh_token: tokens.refreshToken,
        client_id: clientId
      }
      // @ts-ignore
      const url = this.endpoints.createTokenUrl()
      this.tokens.startTokenRequest()
      // @ts-expect-error
      const res = await fetchToken(url, query, this.options)
      if (res.status === 200) {
        log.info('token refreshed')
        const tokenResponse = await res.json()
        this.tokens.setTokens(tokenResponse)
        await this.statusIframe.schedule()
        this.debounce.resolveAll(this.tokens.getTokens())
      } else {
        if (res.status === 400) {
          this._handleLogout()
        }
        const err = new Error('refresh failed')
        this.debounce.rejectAll(err)
      }
    }

    return promise
  }

  _schedule() {
    const { expiryInterval = 0 } = this.options
    if (
      expiryInterval > 0 &&
      !this._expiryTimerId &&
      this.tokens.refreshToken
    ) {
      this._expiryTimerId = setTimeout(async () => {
        this._refresh()
          .then((tokens) => {
            if (tokens) this.emit('token', tokens)
            this._expiryTimerId = null
            this._schedule()
          })
          .catch((err) => {
            this._expiryTimerId = null
            this._handleLogout()
            this._handleError(err)
          })
      }, expiryInterval * 1000)
    }
  }

  _handleToken() {
    const tokens = this.tokens.getTokens()
    this.emit('token', tokens)
    return tokens
  }

  _handleError(err) {
    const { log } = this.options
    log.error(err.message)
    this.emit('error', err)
  }

  _handleLogout() {
    const { forceLogout } = this.options
    this.emit('logout')
    if (forceLogout) {
      this.logout().catch((err) => this._handleError(err))
    } else {
      this.tokens.clearTokens()
    }
  }

  getTokens() {
    return this.tokens.getTokens()
  }

  getParsedToken() {
    const tokens = this.getTokens() || {}
    // @ts-expect-error
    return tokens.tokenParsed || tokens.idTokenParsed
  }

  async accessToken() {
    const { token, refreshToken } = this.tokens
    const isExpired = this.tokens.isTokenExpired()
    if ((!token || isExpired) && refreshToken) {
      await this._refresh()
      return this.tokens.token
    }
    return !isExpired && token
  }

  /**
   * Starts login procedure
   * @param {Object} [opts={}]
   * @param {'login'|'none'} [opts.prompt='login'] - 'login'|'none' if set to
   * 'none' then login will not prompt for credentials.
   * @return {Promise}
   */
  async login(opts = {}) {
    if (!this.isInitialized) {
      await this.init()
    }
    return this.adapter.login(opts)
  }

  /**
   * Silent login checks via iframe if auth session exists.
   * Requires option `silentLoginRedirectUri` with server side redirect page.
   * May be blocked if rejecting 3rd party cookies.
   * If opts.prompt is set then `login()` will be started.
   * For `{prompt: 'login'}` user is prompted for credentials.
   * @return {Promise}
   */
  async silentLogin(opts = {}) {
    if (!this.options.silentLoginRedirectUri) {
      if (!this.isInitialized) {
        await this.init()
      }
      if (opts.prompt) {
        return this.login(opts)
      }
      return Promise.reject(new Error('no silentLoginRedirectUri'))
    }

    try {
      const oauth = await this.checkSilentLogin(this)
      await this._processCallback(oauth)
      this._schedule()
      return this._handleToken()
    } catch (err) {
      if (opts.prompt) {
        return this.login(opts)
      }
      return Promise.reject(err)
    }
  }

  /**
   * Logout from auth session using end_session_endpoint.
   * No token revocation will be made.
   * @return {Promise}
   */
  async logout() {
    if (!this.isInitialized) {
      await this.init()
    }
    const { idToken } = this.getTokens()
    this.statusIframe.clearSchedule()
    clearTimeout(this._expiryTimerId)
    this.tokens.clearTokens()
    return this.adapter.logout({ idToken })
  }

  async userinfo() {
    // @ts-ignore
    const url = this.endpoints.userinfo()
    const token = await this.accessToken()
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      return res.json()
    }
    const err = new Error('userinfo failed')
    // @ts-ignore
    err.status = res.status
    // @ts-ignore
    err.response = res
    return Promise.reject(err)
  }

  async register() {
    return this.adapter.register()
  }

  async account() {
    return this.adapter.account()
  }
}

async function fetchToken(
  url,
  query,
  { clientId = '', clientSecret = '', clientSecretPost = '' } = {}
) {
  const headers = {
    'Content-Type': TYPE_URLENCODED,
    Accept: 'application/json'
  }
  if (clientSecret) {
    if (clientSecretPost) {
      query.clientSecret = clientSecret
    } else {
      headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    }
  }
  return fetch(url, {
    method: 'POST',
    headers,
    // mode: 'no-cors',
    body: urlEncoded(query)
  })
}
