import jsdom from 'jsdom-global'
import assert from 'assert'
import { Callback } from '../src/utils/index.js'
import { endpoints } from '../src/endpoints.js'
import { pkce } from '../src/pkce.js'
import debug from 'debug'

import { oidcProviderResponse } from './fixtures/index.js'

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

  describe('oauth2 urls', function () {
    let realmUrl
    let ep

    before(function () {
      realmUrl = 'http://example.org/auth'
      ep = endpoints(realmUrl)
    })

    it('shall throw if realmUrl is missing', function () {
      assert.throws(() => {
        endpoints()
      }, /Error: realmUrl required/)
    })

    it('shall return authorize url', function () {
      assert.strictEqual(ep.authorize(), realmUrl + '/protocol/openid-connect/auth')
    })

    it('shall return register url', function () {
      assert.strictEqual(ep.register(), realmUrl + '/protocol/openid-connect/registrations')
    })

    it('shall return token url', function () {
      assert.strictEqual(ep.token(), realmUrl + '/protocol/openid-connect/token')
    })

    it('shall return logout url', function () {
      assert.strictEqual(ep.logout(), realmUrl + '/protocol/openid-connect/logout')
    })

    it('shall return session login url', function () {
      assert.strictEqual(ep.checkSessionIframe(), realmUrl + '/protocol/openid-connect/login-status-iframe.html')
    })

    it('shall return 3rd party cookies check url', function () {
      assert.strictEqual(ep.thirdPartyCookiesIframe(), realmUrl + '/protocol/openid-connect/3p-cookies/step1.html')
    })

    it('shall return userinfo url', function () {
      assert.strictEqual(ep.userinfo(), realmUrl + '/protocol/openid-connect/userinfo')
    })
  })

  describe('oicdprovider urls', function () {
    let realmUrl
    let ep

    before(function () {
      realmUrl = 'http://example.org/auth'
      ep = endpoints(realmUrl, oidcProviderResponse)
    })

    it('shall throw if realmUrl is missing', function () {
      assert.throws(() => {
        endpoints()
      }, /Error: realmUrl required/)
    })

    it('shall return authorize url', function () {
      assert.strictEqual(ep.authorize(), 'https://accounts.google.com/o/oauth2/v2/auth')
    })

    it('throws on register url', function () {
      assert.throws(() => {
        ep.register()
      }, /Error: Redirection to "Register user" page not supported in standard OIDC mode/)
    })

    it('shall return token url', function () {
      assert.strictEqual(ep.token(), 'https://oauth2.googleapis.com/token')
    })

    it('throws on logout url', function () {
      assert.throws(() => {
        ep.logout()
      }, /Error: Not supported by the OIDC server/)
    })

    it('throws on session login url', function () {
      assert.throws(() => {
        ep.checkSessionIframe()
      }, /Error: Not supported by the OIDC server/)
    })

    it('shall return 3rd party cookies check url', function () {
      assert.throws(() => {
        ep.thirdPartyCookiesIframe()
      }, /Error: Not supported by the OIDC server/)
    })

    it('shall return userinfo url', function () {
      assert.strictEqual(ep.userinfo(), 'https://openidconnect.googleapis.com/v1/userinfo')
    })
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

    it('shall return url with pkce challenge', async function () {
      const authServerUrl = 'https://example.com/auth'
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment',
        action: 'login',
        pkceMethod: 'S256',
        pkce
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
      query.code_challenge = query.code_challenge && '**'

      assert.deepStrictEqual(query, {
        action: 'login',
        redirect_uri: 'https://example.org/',
        response_mode: 'fragment',
        scope: 'openid',
        state: '**',
        code_challenge_method: 'S256',
        code_challenge: '**'
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
