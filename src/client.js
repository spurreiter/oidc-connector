import { Adapter } from './adapter/default.js'
import { Tokens } from './tokens.js'
import { endpoints } from './endpoints.js'

import {
  Callback,
  checkSsoSilently,
  createPromise,
  debouncePromises,
  EventEmitter,
  initOptions,
  loadConfig,
  StatusIframe,
  urlEncoded
} from './utils/index.js'

import {
  STANDARD,
  IMPLICIT,
  NONE,
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
    return this._processInit()
      .then(() => {
        this._schedule()
        return this._handleToken()
      })
      .catch(err => {
        this._handleError(err)
        throw err
      })
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
    if (this.options.statusIframe) {
      await this.statusIframe.setup()
      const unchanged = await this.statusIframe.check()
      if (unchanged) {
        this.statusIframe.schedule()
        return this._refresh().then(tokens => tokens || this.tokens.getTokens())
      } else {
        this._handleLogout()
        return Promise.reject(new Error('changed session'))
      }
    } else {
      return this._refresh(-1)
    }
  }

  async _processCallback (oauth) {
    const { flow, clientId } = this.options
    const { code, error, prompt } = oauth

    if (oauth.kc_action_status) {
      this.emit('action', { status: oauth.kc_action_status })
    }

    if (error) {
      if (prompt !== NONE) {
        const err = new Error(error)
        err.description = oauth.error_description
        return Promise.reject(err)
      }
      return
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
      return Promise.reject(new Error('auth error'))
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
    await this.statusIframe.check()

    let needsRefresh = false
    if (minValidity === -1) {
      needsRefresh = true
      log.info('Refreshing token: forced refresh')
    } else if (!tokens.tokenParsed || tokens.isTokenExpired(minValidity)) {
      needsRefresh = true
      log.info('Refreshing token: token expired')
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

  async getToken () {
    return this._refresh().then(() => this.tokens.token)
  }

  async login () {
    return this.adapter.login()
  }

  async silentLogin () {
    const { silentCheckSsoRedirectUri } = this.options
    if (!silentCheckSsoRedirectUri) throw new Error('no silentCheckSsoRedirectUri')
    return checkSsoSilently(this)
      .then(oauth => this._processCallback(oauth))
      .then(() => {
        this._schedule()
        return this._handleToken()
      })
  }

  async logout () {
    clearTimeout(this._expiryTimerId)
    this.tokens.clearTokens()
    return this.adapter.logout()
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
    credentials: 'include',
    headers: { 'Content-Type': TYPE_URLENCODED, Accept: 'application/json' },
    body: urlEncoded(query)
  })
}
