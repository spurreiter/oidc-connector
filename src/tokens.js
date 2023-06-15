import { decodeToken, get, storage } from './utils/index.js'

import {
  NONE,
  SESSION_STATE,
  S_MEMORY,
  S_SESSION
} from './constants.js'

const now = () => Math.ceil(new Date().getTime() / 1000)

const toNumber = (num, def) => !isNaN(Number(num)) ? Number(num) : def

const claim = (t, claim, def) => get(t, ['idTokenParsed', claim], get(t, ['tokenParsed', claim], def))

export class Tokens {
  constructor ({ log = undefined, useNonce = undefined, minValidity = undefined, clientId = undefined, storage = S_SESSION } = {}) {
    this.log = log
    this._useNonce = useNonce
    this._authenticated = false
    this._timeSkew = 0
    this._expiresAt = 0
    this._store = new Store(storage, clientId)
    this._minValidity = minValidity
    this._timeLocal = new Date().getTime()
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

  fromInitOptions ({ token = undefined, refreshToken = undefined, idToken = undefined } = {}) {
    const ls = this._store.get() || {}
    // @ts-ignore
    token = token || ls.access_token
    // @ts-ignore
    refreshToken = refreshToken || ls.refresh_token

    if (token) {
      const tokens = {
        access_token: token,
        refresh_token: refreshToken,
        // @ts-ignore
        id_token: idToken || ls.id_token,
        // @ts-ignore
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
    return new TokenClaims(this)
  }

  clearTokens () {
    this.setTokens()
  }

  sessionState () {
    return claim(this, SESSION_STATE, '')
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
   * checks if storedNonce is different than nonce in tokens
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

const _getName = (type) => (clientId) => `oidc-${clientId || ''}-${type}`
const tokenName = _getName('token')
const tokenExpiresAtName = _getName('token-exp')
const idTokenName = _getName('id-token')
const refreshTokenName = _getName('refresh-token')

class Store {
  constructor (type, clientId) {
    if (!type || type === NONE) return
    this.clientId = clientId
    this.store = storage(type, S_MEMORY)
  }

  _set (key, token) {
    if (!this.store) return
    token
      ? this.store.setItem(key, token)
      : this.store.removeItem(key)
  }

  token (token, expiresAt) {
    this._set(tokenName(this.clientId), token)
    this._set(tokenExpiresAtName(this.clientId), expiresAt)
  }

  refreshToken (token) {
    this._set(refreshTokenName(this.clientId), token)
  }

  idToken (token) {
    this._set(idTokenName(this.clientId), token)
  }

  get () {
    if (!this.store) return
    return {
      access_token: this.store.getItem(tokenName(this.clientId)),
      refresh_token: this.store.getItem(refreshTokenName(this.clientId)),
      id_token: this.store.getItem(idTokenName(this.clientId)),
      expiresAt: this.store.getItem(tokenExpiresAtName(this.clientId))
    }
  }
}

export class TokenClaims {
  constructor (tokens) {
    this.token = this.idToken = this.refreshToken = undefined
    ;['token', 'idToken', 'refreshToken'].forEach((key) => {
      const parsed = key + 'Parsed'
      this[key] = tokens[key]
      this[parsed] = tokens[parsed]
    })
  }

  claim (claimName) {
    return claim(this, claimName)
  }
}
