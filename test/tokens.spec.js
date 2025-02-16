import assert from 'assert'
import sinon from 'sinon'
import debug from 'debug'
import { Tokens } from '../src/tokens.js'
import { jsdom } from './support/shims.js'
import { createToken } from './support/createToken.js'
import './support/shims.js'

const log = debug('test')

const _log = {
  error: debug('oidc:Tokens'),
  info: debug('oidc:Tokens')
}

describe('tokens', function () {
  const latency = 2000
  const skew = 2

  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })

  describe('oidc tokens', function () {
    const nonce = 'nonce1234'

    let tokens
    before(function () {
      tokens = new Tokens({ log: _log, useNonce: true })
    })
    before(function () {
      this.clock = sinon.useFakeTimers()
    })
    after(function () {
      this.clock.restore()
    })

    it('shall authenticate with calcuating the correct time skew value', function () {
      const exp = 300
      tokens.startTokenRequest()
      this.clock.tick(latency)
      const tokenResponse = {
        access_token: createToken({
          exp,
          nonce,
          skew,
          realm_access: { roles: ['read'] },
          resource_access: { client: { roles: ['read', 'write'] } }
        }),
        refresh_token: createToken({ typ: 'Refresh', nonce, skew }),
        id_token: createToken({ typ: 'ID', nonce, skew }),
        expires_in: exp
      }
      this.clock.tick(latency)
      tokens.setTokens(tokenResponse)
      log(tokens)
      assert.strictEqual(tokens._expiresAt, 302)
      assert.strictEqual(tokens.authenticated, true)
    })

    it('shall get tokens', function () {
      const r = tokens.getTokens()
      log(r)
      assert.strictEqual(typeof r.token, 'string')
      assert.strictEqual(typeof r.tokenParsed, 'object')
      assert.strictEqual(typeof r.idTokenParsed, 'object')
      assert.strictEqual(typeof r.refreshTokenParsed, 'object')
      assert.strictEqual(r.claim('sub'), 'f:uuid:subject')
    })

    it('shall load tokens from localStorage', function () {
      tokens.loadTokens()
      const r = tokens.getTokens()
      // console.log(r)
      assert.strictEqual(typeof r.token, 'string')
      assert.strictEqual(typeof r.tokenParsed, 'object')
      assert.strictEqual(typeof r.idTokenParsed, 'object')
      assert.strictEqual(typeof r.refreshTokenParsed, 'object')
    })

    it('shall validate nonce', function () {
      const r = tokens.isInvalidNonce(nonce)
      assert.strictEqual(r, false)
    })

    it('shall get session state', function () {
      assert.strictEqual(tokens.sessionState(), 'mystate')
    })

    it('shall expire in', function () {
      assert.strictEqual(tokens.expiresIn(), 298)
    })

    it('isTokenExpired', function () {
      assert.strictEqual(tokens.isTokenExpired(), false)
    })

    it('isTokenExpired with minValidity', function () {
      assert.strictEqual(tokens.isTokenExpired(300), true)
    })

    it('shall clear all tokens', function () {
      tokens.clearTokens()
      assert.strictEqual(tokens.token, undefined)
      assert.strictEqual(tokens.refreshToken, undefined)
      assert.strictEqual(tokens.idToken, undefined)
      assert.strictEqual(tokens.authenticated, false)
      assert.strictEqual(tokens.sessionState(), '')
    })
  })

  describe('oauth2 tokens with id_token', function () {
    let tokens
    before(function () {
      tokens = new Tokens({ log: _log, useNonce: true })
    })

    before(function () {
      this.clock = sinon.useFakeTimers(0)
    })
    after(function () {
      this.clock.restore()
    })

    it('shall authenticate with calcuating the correct time skew value', function () {
      const exp = 300
      tokens.startTokenRequest()
      this.clock.tick(latency)
      const tokenResponse = {
        access_token: 'ABCDEFGHIJKLMNOP',
        refresh_token: 'ABCDEFGHIJKLMNOP',
        id_token: createToken({ typ: 'ID', skew }),
        expires_in: exp
      }
      this.clock.tick(latency)
      tokens.setTokens(tokenResponse)
      log(tokens)
      assert.strictEqual(tokens._expiresAt, 302)
      assert.strictEqual(tokens.authenticated, true)
    })

    it('shall get session state from id token', function () {
      assert.strictEqual(tokens.sessionState(), 'mystate')
    })

    it('shall expire in', function () {
      assert.strictEqual(tokens.expiresIn(), 298)
    })

    it('isTokenExpired', function () {
      assert.strictEqual(tokens.isTokenExpired(), false)
    })

    it('isTokenExpired with minValidity', function () {
      assert.strictEqual(tokens.isTokenExpired(300), true)
    })

    it('shall clear all tokens', function () {
      tokens.clearTokens()
      assert.strictEqual(tokens.token, undefined)
      assert.strictEqual(tokens.refreshToken, undefined)
      assert.strictEqual(tokens.idToken, undefined)
      assert.strictEqual(tokens.authenticated, false)
      assert.strictEqual(tokens.sessionState(), '')
    })
  })

  describe('oauth2 tokens only', function () {
    let tokens
    before(function () {
      tokens = new Tokens({ log: _log, useNonce: true })
    })

    before(function () {
      this.clock = sinon.useFakeTimers()
    })
    after(function () {
      this.clock.restore()
    })

    it('shall authenticate with calcuating the correct time skew value', function () {
      const exp = 300
      tokens.startTokenRequest()
      this.clock.tick(latency)
      const tokenResponse = {
        access_token: 'ABCDEFGHIJKLMNOP',
        refresh_token: 'ABCDEFGHIJKLMNOP',
        expires_in: exp
      }
      this.clock.tick(latency)
      tokens.setTokens(tokenResponse)
      log(tokens)
      assert.strictEqual(tokens._expiresAt, 303)
      assert.strictEqual(tokens.authenticated, true)
    })

    it('shall expire in', function () {
      assert.strictEqual(tokens.expiresIn(), 299)
    })

    it('isTokenExpired', function () {
      assert.strictEqual(tokens.isTokenExpired(), false)
    })

    it('isTokenExpired with minValidity', function () {
      assert.strictEqual(tokens.isTokenExpired(300), true)
    })
  })

  describe('localStorage turned on', function () {
    let tokensPre
    let tokens
    before(function () {
      tokensPre = new Tokens({ log: _log })
      tokens = new Tokens({ log: _log })
    })

    it('shall set tokens', function () {
      tokensPre.setTokens({ access_token: 'ABCD' })
      assert.strictEqual(tokensPre.getTokens().token, 'ABCD')
    })

    it('shall load tokens', function () {
      tokens.loadTokens()
      assert.strictEqual(tokens.getTokens().token, 'ABCD')
    })

    it('shall clear tokens', function () {
      tokens.setTokens()
      assert.strictEqual(tokens.getTokens().token, undefined)
    })
  })

  describe('localStorage turned off', function () {
    let tokens
    before(function () {
      tokens = new Tokens({ log: _log, storage: 'none' })
    })

    it('shall ignore loading tokens', function () {
      tokens.loadTokens()
      assert.strictEqual(tokens.getTokens().token, undefined)
    })

    it('shall set tokens', function () {
      tokens.setTokens({ access_token: 'ABCD' })
      assert.strictEqual(tokens.getTokens().token, 'ABCD')
    })

    it('shall clear tokens', function () {
      tokens.setTokens()
      assert.strictEqual(tokens.getTokens().token, undefined)
    })
  })
})
