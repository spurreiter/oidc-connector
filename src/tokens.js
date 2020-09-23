import { decodeToken, get } from './utils/index.js'
import { IMPLICIT } from './constants.js'

export class Tokens {
  constructor ({ flow, log, useNonce } = {}) {
    this._flow = flow
    this._useNonce = useNonce
    this.log = log
    this._timeSkew = 0
    this._authenticated = false
  }

  get authenticated () {
    return this._authenticated
  }

  startTokenRequest () {
    this._timeLocal = new Date().getTime()
  }

  setTokens (token, refreshToken, idToken) {
    this._timeLocal = (this._timeLocal + new Date().getTime()) / 2
    if (refreshToken) {
      this.refreshToken = refreshToken
      this.refreshTokenParsed = decodeToken(refreshToken)
    } else {
      delete this.refreshToken
      delete this.refreshTokenParsed
    }

    if (idToken) {
      this.idToken = idToken
      this.idTokenParsed = decodeToken(idToken)
    } else {
      delete this.idToken
      delete this.idTokenParsed
    }

    if (token) {
      this.token = token
      this.tokenParsed = decodeToken(token)
      this._authenticated = true
      this._timeSkew = Math.floor(this._timeLocal / 1000) - this.tokenParsed.iat
      this.log.info('Estimated time difference between browser and server is %s seconds', this._timeSkew)
    } else {
      delete this.token
      delete this.tokenParsed
      this._authenticated = false
    }
  }

  getTokens () {
    const { token, tokenParsed, idTokenParsed } = this
    return { token, tokenParsed, idTokenParsed }
  }

  clearTokens () {
    this.setTokens(null, null, null)
  }

  sessionState () {
    return get(this, 'tokenParsed.session_state', '')
  }

  subject () {
    return get(this, 'tokenParsed.sub')
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
    const expires = get(this, 'tokenParsed.exp', 0)
    return expires - Math.ceil(new Date().getTime() / 1000) + this._timeSkew
  }

  isTokenExpired (minValidity) {
    if (!this.tokenParsed || (!this.refreshToken && this._flow !== IMPLICIT)) {
      this._authenticated = false
      throw new Error('Not authenticated')
    }

    let expiresIn = this.expiresIn()
    if (!isNaN(minValidity)) {
      expiresIn -= minValidity
    }
    return expiresIn < 0
  }

  validateNonce (storedNonce) {
    const {
      _useNonce,
      tokenParsed,
      refreshTokenParsed,
      idTokenParsed
    } = this.tokens
    const invalid = _useNonce &&
        ((tokenParsed && tokenParsed.nonce !== storedNonce) ||
         (refreshTokenParsed && refreshTokenParsed.nonce !== storedNonce) ||
         (idTokenParsed && idTokenParsed.nonce !== storedNonce))
    if (invalid) {
      this.clearTokens()
    }
    return invalid
  }
}
