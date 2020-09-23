import jsdom from 'jsdom-global'
import assert from 'assert'
import { Tokens } from '../src/tokens.js'
import { createToken } from './support/createToken.js'
import debug from 'debug'

const log = {
  error: debug('oidc:Tokens'),
  info: debug('oidc:Tokens')
}

describe('tokens', function () {
  let tokens

  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })
  after(function () {
    this.jsdom()
  })
  before(function () {
    tokens = new Tokens({ log })
  })

  it('shall authenticate with calcuating the correct time skew value', async function () {
    tokens.startTokenRequest()
    tokens.setTokens(
      createToken({ realm_access: { roles: ['read'] }, resource_access: { client: { roles: ['read', 'write'] } } }),
      createToken({ typ: 'Refresh' }),
      createToken({ typ: 'ID' })
    )
    assert.strictEqual(tokens._timeSkew, 2)
    assert.strictEqual(tokens.authenticated, true)
    // console.log(tokens)
  })

  it('shall get session state', function () {
    assert.strictEqual(tokens.sessionState(), 'mystate')
  })

  it('shall get subject', function () {
    assert.strictEqual(tokens.subject(), 'f:uuid:subject')
  })

  it('shall get realmAccess', function () {
    assert.deepStrictEqual(tokens.realmAccess(), { roles: ['read'] })
  })

  it('shall get resourceAccess', function () {
    assert.deepStrictEqual(tokens.resourceAccess(), { client: { roles: ['read', 'write'] } })
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

  it('shall clear all tokens', function () {
    tokens.clearTokens()
    assert.strictEqual(tokens.authenticated, false)
    assert.strictEqual(tokens.sessionState(), '')
  })
})
