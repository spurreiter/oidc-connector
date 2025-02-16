import { jsdom } from './support/shims.js'
import assert from 'assert'
import debug from 'debug'
import { Callback } from '../src/utils/index.js'
import {
  // responseMode
  FRAGMENT,
  QUERY,
  // flow
  STANDARD,
  IMPLICIT,
  HYBRID
} from '../src/constants.js'

const log = {
  error: debug('oidc-client:error'),
  info: debug('oidc-client:info')
}

describe('utils/Callback', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })

  describe('standard flow', function () {
    it('response mode query', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&code=mycode&session_state=mysessionstate&state=teststate&other=testother#other=hash'
      const r = cb.parse(url)
      assert.deepStrictEqual(r, {
        code: 'mycode',
        state: 'teststate',
        session_state: 'mysessionstate',
        response_mode: 'query',
        newUrl: 'http://example.org/?other=testother#other=hash'
      })
    })

    it('shall return stored state', function () {
      const cb = new Callback({ log })
      cb.store({
        state: 'storedstate',
        redirectUri: 'http://example.org',
        nonce: 'nonce',
        prompt: 'none',
        pkceCodeVerifier: 'pkce'
      })
      const url =
        'http://example.org#response_mode=fragment&code=mycode&session_state=mysessionstate&state=storedstate&other=testother'
      const r = cb.parse(url)

      assert.deepStrictEqual(r, {
        code: 'mycode',
        state: 'storedstate',
        session_state: 'mysessionstate',
        response_mode: 'fragment',
        newUrl: 'http://example.org/#other=testother',
        valid: true,
        redirectUri: 'http://example.org',
        storedNonce: 'nonce',
        prompt: 'none',
        pkceCodeVerifier: 'pkce'
      })
    })

    it('shall not return stored state if not found', function () {
      const cb = new Callback({ log })
      cb.store({
        state: 'teststate1',
        redirectUri: 'http://example.org',
        nonce: 'nonce',
        prompt: 'none',
        pkceCodeVerifier: 'pkce'
      })
      const url =
        'http://example.org#response_mode=fragment&code=mycode&session_state=mysessionstate&state=teststate&other=testother'
      const r = cb.parse(url)

      assert.deepStrictEqual(r, {
        code: 'mycode',
        state: 'teststate',
        session_state: 'mysessionstate',
        response_mode: 'fragment',
        newUrl: 'http://example.org/#other=testother'
      })
    })

    it('response mode query with wrong response', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: QUERY })
      const url =
        'http://example.org?other=query#response_mode=fragment&code=mycode&session_state=mysessionstate&state=teststate&other=testother'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('response mode fragment', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: FRAGMENT })
      const url =
        'http://example.org?other=query#response_mode=query&code=mycode&session_state=mysessionstate&state=teststate&other=testother'
      const r = cb.parse(url)
      assert.deepStrictEqual(r, {
        code: 'mycode',
        state: 'teststate',
        session_state: 'mysessionstate',
        response_mode: 'query',
        newUrl: 'http://example.org/?other=query#other=testother'
      })
    })

    it('response mode fragment with wrong response', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: QUERY })
      const url =
        'http://example.org?other=query#response_mode=fragment&code=mycode&session_state=mysessionstate&state=teststate&other=testother'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('requires code', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&session_state=mysessionstate&state=teststate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('requires state', function () {
      const cb = new Callback({ log, flow: STANDARD, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&code=mycode&session_state=mysessionstate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })
  })

  describe('hybrid flow', function () {
    it('response mode query', function () {
      const cb = new Callback({ log, flow: HYBRID, responseMode: QUERY })
      const url =
        'http://example.org?access_token=token&response_mode=query&code=mycode&session_state=mysessionstate&state=teststate&other=testother#other=hash'
      const r = cb.parse(url)
      assert.deepStrictEqual(r, {
        access_token: 'token',
        code: 'mycode',
        response_mode: 'query',
        session_state: 'mysessionstate',
        state: 'teststate',
        newUrl: 'http://example.org/?other=testother#other=hash'
      })
    })

    it('requires code', function () {
      const cb = new Callback({ log, flow: HYBRID, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&session_state=mysessionstate&state=teststate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('requires state', function () {
      const cb = new Callback({ log, flow: HYBRID, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&code=mycode&session_state=mysessionstate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })
  })

  describe('implicit flow', function () {
    it('response mode query', function () {
      const cb = new Callback({ log, flow: IMPLICIT, responseMode: QUERY })
      const url =
        'http://example.org?access_token=token&response_mode=query&code=mycode&session_state=mysessionstate&state=teststate&other=testother#other=hash'
      const r = cb.parse(url)
      assert.deepStrictEqual(r, {
        access_token: 'token',
        response_mode: 'query',
        session_state: 'mysessionstate',
        state: 'teststate',
        code: 'mycode',
        newUrl: 'http://example.org/?other=testother#other=hash'
      })
    })

    it('requires access_token', function () {
      const cb = new Callback({ log, flow: IMPLICIT, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&session_state=mysessionstate&state=teststate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('requires state', function () {
      const cb = new Callback({ log, flow: IMPLICIT, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&access_token=token&session_state=mysessionstate'
      const r = cb.parse(url)
      assert.strictEqual(r, undefined)
    })

    it('returns error', function () {
      const cb = new Callback({ log, flow: IMPLICIT, responseMode: QUERY })
      const url =
        'http://example.org?response_mode=query&error=invalid+token&state=mystate'
      const r = cb.parse(url)
      assert.deepStrictEqual(r, {
        error: 'invalid token',
        newUrl: 'http://example.org/',
        response_mode: 'query',
        state: 'mystate'
      })
    })
  })
})
