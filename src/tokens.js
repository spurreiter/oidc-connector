import { decodeToken, get, LocalStorage } from './utils/index.js'

import {
  SESSION_STATE
} from './constants.js'

const now = () => Math.ceil(new Date().getTime() / 1000)

const toNumber = (num, def) => !isNaN(Number(num)) ? Number(num) : def

const claim = (t, claim, def) => get(t, ['idTokenParsed', claim], get(t, ['tokenParsed', claim], def))

export class Tokens {
  constructor ({ log, useNonce, minValidity, useLocalStorage = true } = {}) {
    this.log = log
    this._useNonce = useNonce
    this._authenticated = false
    this._timeSkew = 0
    this._expiresAt = 0
    this._store = new Store(useLocalStorage)
    this._minValidity = minValidity
  }

  get authenticated () {
    return this._authenticated
  }

  /**
   * load tokens from localStorage
   */
  loadTokens () {
    const tokens = this._store.get()
    if (tokens) this.setTokens(tokens)
    return this
  }

  fromInitOptions ({ token, refreshToken, idToken } = {}) {
    const ls = this._store.get() || {}
    token = token || ls.access_token
    refreshToken = refreshToken || ls.refresh_token

    if (token) {
      const tokens = {
        access_token: token,
        refresh_token: refreshToken,
        id_token: idToken || ls.id_token,
        expiresAt: ls.expiresAt
      }
      this.setTokens(tokens)
    }
    return this
  }

  startTokenRequest () {
    this._timeLocal = new Date().getTime()
  }

  setTokens (tokenResponse = {}) {
    const {
      access_token: token,
      refresh_token: refreshToken,
      id_token: idToken,
      expires_in: expiresIn = 60,
      expiresAt
    } = tokenResponse

    this._timeLocal = (this._timeLocal + new Date().getTime()) / 2
    if (refreshToken) {
      this.refreshToken = refreshToken
      this._store.refreshToken(refreshToken)
      try {
        this.refreshTokenParsed = decodeToken(refreshToken)
      } catch (e) {
        // token may be a oauth2 only token
        delete this.refreshTokenParsed
      }
      this.log.info('refresh token set %o', this.refreshTokenParsed)
    } else {
      delete this.refreshToken
      delete this.refreshTokenParsed
      this._store.refreshToken(null)
      this.log.info('refresh token cleared')
    }

    if (idToken) {
      this.idToken = idToken
      this._store.idToken(idToken)
      this.idTokenParsed = decodeToken(idToken)
      this.log.info('id token set %o', this.idTokenParsed)
    } else {
      delete this.idToken
      delete this.idTokenParsed
      this._store.idToken(null)
      this.log.info('id token cleared')
    }

    if (token) {
      this.token = token
      this._store.token(token)
      try {
        this.tokenParsed = decodeToken(token)
      } catch (e) {
        // token may be a oauth2 only token
        delete this.tokenParsed
      }
      this.log.info('token set %o', this.tokenParsed)
      const iat = toNumber(
        claim(this, 'iat'),
        now() - 1
      )
      this._expiresAt = toNumber(
        claim(this, 'exp'),
        now() + expiresIn
      )
      this._timeSkew = Math.floor(this._timeLocal / 1000) - iat
      this.log.info('Estimated time difference is %s seconds', this._timeSkew)
      this._expiresAt += this._timeSkew
      this._expiresAt = expiresAt || this._expiresAt
      this._store.token(token, this._expiresAt)
      this._authenticated = true
    } else {
      this._authenticated = false
      delete this.token
      delete this.tokenParsed
      this._store.token(null)
      this.log.info('token cleared')
    }
  }

  getTokens () {
    const obj = ['token', 'idToken', 'refreshToken'].reduce((o, key) => {
      const parsed = key + 'Parsed'
      o[key] = this[key]
      o[parsed] = this[parsed]
      return o
    }, {})
    return obj
  }

  clearTokens () {
    this.setTokens()
  }

  sessionState () {
    return claim(this, SESSION_STATE, '')
  }

  subject () {
    return claim(this, 'sub')
  }

  realmAccess () {
    return get(this, 'tokenParsed.realm_access')
  }

  resourceAccess () {
    return get(this, 'tokenParsed.resource_access')
  }

  /**
   * expiry in seconds
   * @return {number}
   */
  expiresIn () {
    return this._expiresAt - now()
  }

  isTokenExpired (minValidity = this._minValidity) {
    let expiresIn = this.expiresIn()
    if (!isNaN(minValidity)) {
      expiresIn -= minValidity
    }
    return expiresIn < 0
  }

  /**
   * checkes if storedNonce is different than nonce in tokens
   * requires `useNonce` in options.
   * if invalid tokens are cleared
   * @param {string} storedNonce
   * @return {boolean} true if storedNonce is different than nonce in tokens
   */
  isInvalidNonce (storedNonce) {
    const {
      _useNonce,
      tokenParsed,
      refreshTokenParsed,
      idTokenParsed
    } = this
    const verify = obj => obj && obj.nonce && obj.nonce !== storedNonce
    const invalid = _useNonce &&
      (verify(tokenParsed) || verify(refreshTokenParsed) || verify(idTokenParsed))
    if (invalid) {
      this.clearTokens()
    }
    return invalid
  }
}

const TOKEN = 'oidc-token'
const TOKEN_EXPIRES_AT = 'oidc-token-exp'
const ID_TOKEN = 'oidc-id-token'
const REFRESH_TOKEN = 'oidc-refresh-token'

class Store {
  constructor (useLocalStorage) {
    try {
      this.store = useLocalStorage ? new LocalStorage() : undefined
    } catch (e) {}
  }

  _set (key, token) {
    if (!this.store) return
    token
      ? this.store.setItem(key, token)
      : this.store.removeItem(key)
  }

  token (token, expiresAt) {
    this._set(TOKEN, token)
    this._set(TOKEN_EXPIRES_AT, expiresAt)
  }

  refreshToken (token) {
    this._set(REFRESH_TOKEN, token)
  }

  idToken (token) {
    this._set(ID_TOKEN, token)
  }

  get () {
    if (!this.store) return
    return {
      access_token: this.store.getItem(TOKEN),
      refresh_token: this.store.getItem(REFRESH_TOKEN),
      id_token: this.store.getItem(ID_TOKEN),
      expiresAt: this.store.getItem(TOKEN_EXPIRES_AT)
    }
  }
}
