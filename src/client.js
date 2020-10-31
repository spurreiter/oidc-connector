/*!
Copyright 2016 Red Hat, Inc. and/or its affiliates and other contributors.
Copyright 2020 spurreiter

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
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

import {
  IMPLICIT,
  LOGIN,
  STANDARD,
  TYPE_URLENCODED
} from './constants.js'

export class Client extends EventEmitter {
  constructor (options = {}) {
    super()
    this.options = initOptions(options)
    this.adapter = options.adapter || new Adapter()
    this.callback = new Callback(this.options)
    this.tokens = new Tokens(this.options)
    this.debounce = debouncePromises()
    this.endpoints = null
    this.statusIframe = null
    // try to load tokens
    this.tokens.fromInitOptions(this.options)
  }

  async init () {
    try {
      const { log } = this.options
      const {
        serverUrl,
        clientId,
        oidcConfig
      } = await loadConfig(this.options)
      this.options.clientId = clientId
      this.endpoints = endpoints(serverUrl, oidcConfig, this.callback)
      this.statusIframe = new StatusIframe(this)
      this.adapter.initialize(this)
      this.options.redirectUri = this.adapter.redirectUri()
      log.info('oidcConfig loaded %o', oidcConfig)

      await this._processInit()
      this._schedule()
      return this._handleToken()
    } catch (err) {
      this._handleError(err)
      return Promise.reject(err)
    }
  }

  async _processInit () {
    const oauth = this.callback.parse(window.location.href)
    if (oauth) {
      window.history.replaceState(window.history.state, null, oauth.newUrl)
      if (oauth.valid) {
        await this.statusIframe.setup()
        return this._processCallback(oauth)
      }
    }
    const { token, refreshToken } = this.tokens
    if (token && refreshToken) {
      return this._processWithTokens()
    }
    if (this.options.forceLogin) {
      return this.login()
    }
  }

  async _processWithTokens () {
    let minValidity = -1

    if (this.options.statusIframe) {
      await this.statusIframe.setup()
      const unchanged = await this.statusIframe.check() // may throw on error
      if (unchanged === false) {
        this._handleLogout()
        return Promise.reject(new Error('changed session'))
      } else {
        this.statusIframe.schedule()
        minValidity = undefined
      }
    }

    return this._refresh(minValidity)
      .then(tokens => tokens || this.tokens.getTokens()) // tokens may not be present if not yet expired
  }

  async _processCallback (oauth) {
    const { flow, clientId } = this.options
    const { code, error } = oauth

    if (oauth.kc_action_status) {
      this.emit('action', { status: oauth.kc_action_status })
    }

    if (error) {
      const err = new Error(error)
      err.description = oauth.error_description
      return Promise.reject(err)
    }

    if ((flow !== STANDARD) && (oauth.access_token || oauth.id_token)) {
      return this._authSuccess(oauth, oauth)
    }

    if ((flow !== IMPLICIT) && code) {
      const query = {
        code,
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: oauth.redirectUri
      }
      if (oauth.pkceCodeVerifier) {
        query.code_verifier = oauth.pkceCodeVerifier
      }
      const url = this.endpoints.createTokenUrl()
      this.tokens.startTokenRequest()
      const res = await fetchToken(url, query)
      if (res.status === 200) {
        const tokenResponse = await res.json()
        this.statusIframe.schedule()
        return this._authSuccess(tokenResponse, oauth)
      }
      const error = await res.json()
      const err = new Error(get(error, 'error', 'auth error'))
      err.description = get(error, 'error_description')
      err.status = res.status
      return Promise.reject(err)
    }
  }

  async _authSuccess (tokenResponse, oauth) {
    this.tokens.setTokens(tokenResponse)

    if (this.tokens.isInvalidNonce(oauth.storedNonce)) {
      return Promise.reject(new Error('invalid nonce'))
    }
  }

  async _refresh (minValidity = this.options.minValidity) {
    const promise = createPromise()
    const { log, clientId } = this.options
    const { tokens } = this

    if (!this.tokens.refreshToken) {
      promise.reject(new Error('no refresh token'))
      return promise
    }

    let needsRefresh = false
    if (minValidity === -1) {
      needsRefresh = true
      log.info('forced refresh')
    } else if (!tokens.tokenParsed || tokens.isTokenExpired(minValidity)) {
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
      const url = this.endpoints.createTokenUrl()
      this.tokens.startTokenRequest()
      const res = await fetchToken(url, query)
      if (res.status === 200) {
        log.info('token refreshed')
        const tokenResponse = await res.json()
        this.tokens.setTokens(tokenResponse)
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

  _schedule () {
    const { expiryInterval } = this.options
    if (expiryInterval > 0 && !this._expiryTimerId && this.tokens.refreshToken) {
      this._expiryTimerId = setTimeout(async () => {
        this._refresh()
          .then(tokens => {
            if (tokens) this.emit('token', tokens)
            this._expiryTimerId = null
            this._schedule()
          })
          .catch(err => {
            this._expiryTimerId = null
            this._handleLogout()
            this._handleError(err)
          })
      }, expiryInterval * 1000)
    }
  }

  _handleToken () {
    const tokens = this.tokens.getTokens()
    this.emit('token', tokens)
    return tokens
  }

  _handleError (err) {
    const { log } = this.options
    log.error(err.message)
    this.emit('error', err)
  }

  _handleLogout () {
    const { forceLogout } = this.options
    this.tokens.clearTokens()
    this.emit('logout')
    if (forceLogout) {
      this.logout().catch(err => this._handleError(err))
    }
  }

  getTokens () {
    return this.tokens.getTokens()
  }

  async bearerToken () {
    const { token, refreshToken } = this.tokens
    const isExpired = this.tokens.isTokenExpired()
    if ((!token || isExpired) && refreshToken) {
      await this._refresh()
      return this.tokens.token
    }
    return !isExpired && token
  }

  async login (opts = {}) {
    opts.prompt = opts.prompt || LOGIN
    return this.adapter.login(opts)
  }

  async silentLogin () {
    const { silentLoginRedirectUri } = this.options
    if (!silentLoginRedirectUri) {
      return Promise.reject(new Error('no silentLoginRedirectUri'))
    }
    return checkSilentLogin(this)
      .then(oauth => this._processCallback(oauth))
      .then(() => {
        this._schedule()
        return this._handleToken()
      })
  }

  async logout () {
    const { idToken } = this.getTokens()
    this.statusIframe.clearSchedule()
    clearTimeout(this._expiryTimerId)
    this.tokens.clearTokens()
    return this.adapter.logout({ idToken })
  }

  async userinfo () {
    const url = this.endpoints.userinfo()
    const token = await this.bearerToken()
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
    err.status = res.status
    err.response = res
    return Promise.reject(err)
  }

  async register () {
    return this.adapter.register()
  }

  async account () {
    return this.adapter.account()
  }
}

async function fetchToken (url, query) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': TYPE_URLENCODED, Accept: 'application/json' },
    body: urlEncoded(query)
  })
}
