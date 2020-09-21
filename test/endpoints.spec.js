import jsdom from 'jsdom-global'
import assert from 'assert'
import { Callback } from '../src/utils/index.js'
import { endpoints } from '../src/endpoints.js'
import debug from 'debug'

const log = debug('test')

const searchParams = u => Array.from(u.searchParams).reduce((o, [key, val]) => { o[key] = val; return o }, {})

describe('endpoints', function () {
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

  describe('createLoginUrl', function () {
    it('shall return default url', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment'
      }
      const ep = endpoints(authServerUrl)
      const cb = new Callback(options)
      const url = await ep.createLoginUrl(options, cb)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      assert.ok(cb._store.get(state), 'should get state from callback store')

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/protocol/openid-connect/auth')

      const query = searchParams(u)
      query.state = query.state && '**'

      assert.deepStrictEqual(query, {
        redirect_uri: 'https://example.org/',
        response_mode: 'fragment',
        scope: 'openid',
        state: '**'
      })
    })

    it('shall return login url with all parameters set', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        clientId: 'my-client',
        redirectUri: location.href,
        responseMode: 'fragment',
        responseType: 'code',
        prompt: 'none',
        scope: 'email test',
        useNonce: true,
        maxAge: 12,
        loginHint: 'myself',
        idpHint: '1234',
        action: 'register',
        locale: 'de'
      }
      const ep = endpoints(authServerUrl)
      const cb = new Callback(options)
      const url = await ep.createLoginUrl(options, cb)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      const cbState = cb._store.get(state)
      log(cbState)
      assert.ok(cbState, 'should get state from callback store')

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/protocol/openid-connect/registrations')

      const query = searchParams(u)
      log(query)
      query.state = query.state && '**'
      query.nonce = query.nonce && '**'

      assert.deepStrictEqual(query, {
        client_id: 'my-client',
        redirect_uri: 'https://example.org/',
        state: '**',
        response_mode: 'fragment',
        response_type: 'code',
        scope: 'openid email test',
        prompt: 'none',
        max_age: '12',
        login_hint: 'myself',
        kc_idp_hint: '1234',
        ui_locales: 'de',
        nonce: '**'
      })
    })
  })

  describe('createRegisterUrl', function () {
    it('shall return default url', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment'
      }
      const ep = endpoints(authServerUrl)
      const cb = new Callback(options)
      const url = await ep.createRegisterUrl(options, cb)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      assert.ok(cb._store.get(state), 'should get state from callback store')

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/protocol/openid-connect/registrations')

      const query = searchParams(u)
      query.state = query.state && '**'

      assert.deepStrictEqual(query, {
        redirect_uri: 'https://example.org/',
        response_mode: 'fragment',
        scope: 'openid',
        state: '**'
      })
    })
  })

  describe('createLogoutUrl', function () {
    it('shall return url', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        redirectUri: location.href
      }
      const ep = endpoints(authServerUrl)
      const url = await ep.createLogoutUrl(options)

      log(url)
      const u = new URL(url)

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/protocol/openid-connect/logout')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        redirect_uri: 'https://example.org/'
      })
    })

    it('shall use post logout redirect uri', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        redirectUri: location.href,
        postLogoutRedirectUri: location.href + 'logged-out'
      }
      const ep = endpoints(authServerUrl)
      const url = await ep.createLogoutUrl(options)

      log(url)
      const u = new URL(url)

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/protocol/openid-connect/logout')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        redirect_uri: 'https://example.org/logged-out'
      })
    })
  })

  describe('createAccountUrl', function () {
    it('shall return default url', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        clientId: 'my-client',
        redirectUri: location.href
      }
      const ep = endpoints(authServerUrl)
      const url = await ep.createAccountUrl(options)

      const u = new URL(url)

      assert.strictEqual(u.host, 'example.com')
      assert.strictEqual(u.pathname, '/auth/account')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        referrer: 'my-client',
        referrer_uri: 'https://example.org/'
      })
    })
  })
})
