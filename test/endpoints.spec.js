import assert from 'assert'
import { Callback, pkce } from '../src/utils/index.js'
import { endpoints } from '../src/endpoints.js'
import debug from 'debug'
import { jsdom } from './support/shims.js'

import { wellKnownOidcKeycloak } from './fixtures/index.js'

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

  describe('oauth2 urls', function () {
    const serverUrl = 'http://localhost:8080/auth/realms/my'
    let ep

    before(function () {
      ep = endpoints(serverUrl, wellKnownOidcKeycloak)
    })

    it('shall throw if serverUrl is missing', function () {
      assert.throws(() => {
        endpoints()
      }, /Error: oidcConfig required/)
    })

    it('shall return authorize url', function () {
      assert.strictEqual(ep.authorize(), serverUrl + '/protocol/openid-connect/auth')
    })

    it('shall return register url', function () {
      assert.strictEqual(ep.register(), serverUrl + '/protocol/openid-connect/registrations')
    })

    it('shall return token url', function () {
      assert.strictEqual(ep.token(), serverUrl + '/protocol/openid-connect/token')
    })

    it('shall return logout url', function () {
      assert.strictEqual(ep.logout(), serverUrl + '/protocol/openid-connect/logout')
    })

    it('shall return session login url', function () {
      assert.strictEqual(ep.checkSessionIframe(), serverUrl + '/protocol/openid-connect/login-status-iframe.html')
    })

    it('shall return userinfo url', function () {
      assert.strictEqual(ep.userinfo(), serverUrl + '/protocol/openid-connect/userinfo')
    })
  })

  describe('createLoginUrl', function () {
    let ep

    before(function () {
      const serverUrl = 'http://localhost:8080/auth/realms/my'
      ep = endpoints(serverUrl, wellKnownOidcKeycloak)
    })

    it('shall return default url', async function () {
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment',
        scope: 'openid'
      }
      const cb = new Callback(options)
      ep.callback = cb
      const url = await ep.createLoginUrl(options)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      assert.ok(cb._store.get(state), 'should get state from callback store')

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/auth')

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
      const options = {
        clientId: 'my-client',
        redirectUri: location.href,
        responseMode: 'fragment',
        responseType: 'code',
        prompt: 'none',
        scope: 'openid email test',
        useNonce: true,
        maxAge: 12,
        loginHint: 'myself',
        idpHint: '1234',
        action: 'register',
        locale: 'de'
      }
      const cb = new Callback(options)
      ep.callback = cb
      const url = await ep.createLoginUrl(options)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      const cbState = cb._store.get(state)
      log(cbState)
      assert.ok(cbState, 'should get state from callback store')

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/registrations')

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
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment',
        action: 'login',
        scope: 'openid',
        pkceMethod: 'S256',
        pkce
      }
      const cb = new Callback(options)
      ep.callback = cb
      const url = await ep.createLoginUrl(options, cb)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      assert.ok(cb._store.get(state), 'should get state from callback store')

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/auth')

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
    let ep

    before(function () {
      const serverUrl = 'http://localhost:8080/auth/realms/my'
      ep = endpoints(serverUrl, wellKnownOidcKeycloak)
    })

    it('shall return default url', async function () {
      const options = {
        redirectUri: location.href,
        responseMode: 'fragment',
        scope: 'openid'
      }
      const cb = new Callback(options)
      ep.callback = cb
      const url = await ep.createRegisterUrl(options)

      const u = new URL(url)
      const state = u.searchParams.get('state')

      assert.ok(state, 'shall have state param')
      assert.ok(cb._store.get(state), 'should get state from callback store')

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/registrations')

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
    let ep

    before(function () {
      const serverUrl = 'http://localhost:8080/auth/realms/my'
      ep = endpoints(serverUrl, wellKnownOidcKeycloak)
    })

    it('shall return url', async function () {
      const options = {
        redirectUri: location.href
      }
      const url = await ep.createLogoutUrl(options, { idToken: 'idtoken' })

      log(url)
      const u = new URL(url)

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/logout')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        id_token_hint: 'idtoken',
        post_logout_redirect_uri: 'https://example.org/'
      })
    })

    it('shall use post logout redirect uri', async function () {
      const options = {
        redirectUri: location.href,
        postLogoutRedirectUri: location.href + 'logged-out'
      }
      const url = await ep.createLogoutUrl(options, { idToken: 'idtoken' })

      log(url)
      const u = new URL(url)

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/protocol/openid-connect/logout')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        id_token_hint: 'idtoken',
        post_logout_redirect_uri: 'https://example.org/logged-out'
      })
    })
  })

  describe('createAccountUrl', function () {
    let ep

    before(function () {
      const serverUrl = 'http://localhost:8080/auth/realms/my'
      ep = endpoints(serverUrl, wellKnownOidcKeycloak)
    })

    it('shall return default url', async function () {
      const options = {
        clientId: 'my-client',
        redirectUri: location.href
      }
      const url = await ep.createAccountUrl(options)

      const u = new URL(url)

      assert.strictEqual(u.host, 'localhost:8080')
      assert.strictEqual(u.pathname, '/auth/realms/my/account')

      const query = searchParams(u)

      assert.deepStrictEqual(query, {
        referrer: 'my-client',
        referrer_uri: 'https://example.org/'
      })
    })
  })
})
