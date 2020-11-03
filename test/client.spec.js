import assert from 'assert'
import jsdom from 'jsdom-global'
import Client from '../src/index.js'
import {
  CHANGED,
  UNCHANGED,
  ERROR
} from '../src/constants.js'
import { setup, mockStatusCreateIframe, mockSilentLoginCreateIframe, MockAdapter } from './support/index.js'

function injectMocks (client, mockopts) {
  client.statusIframe.mock = opts => mockStatusCreateIframe({ ...opts, ...mockopts })
  client.checkSilentLogin.mock = opts => mockSilentLoginCreateIframe({ ...opts, ...mockopts })
}

function params (url) {
  const reduce = (sp) => Array.from(sp).reduce((o, [key, val]) => {
    o[key] = val
    return o
  }, {})
  const u = new URL(url)
  const h = new URLSearchParams(u.hash.replace(/^#/, ''))
  return {
    search: reduce(u.searchParams),
    hash: reduce(h)
  }
}

describe('Client', function () {
  const port = 3001
  const origin = 'http://example.org/'

  before(function () {
    this.jsdom = jsdom('', {
      url: origin,
      contentType: 'text/html'
    })
  })
  after(function () {
    this.jsdom()
  })
  before(function () {
    this.server = setup({ port, silent: true }).listen(port)
  })
  after(function () {
    this.server.close()
  })
  beforeEach(function () {
    window.location.href = origin
  })

  const clientOpts = {
    url: `http://localhost:${port}/oidc`,
    clientId: 'test',
    useStatusIframe: false,
    useLocalStorage: false,
    adapter: new MockAdapter()
  }

  describe('init', function () {
    it('shall initialize the client', async function () {
      const client = new Client({ ...clientOpts })
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'undefined')
    })
  })

  describe('login', function () {
    it('shall obtain tokens in standard flow', async function () {
      const opts = { ...clientOpts }
      const client0 = new Client(opts)
      await client0.init()
      const newUrl = await client0.login()
      // console.log(params(newUrl))
      assert.deepStrictEqual(
        Object.keys(params(newUrl).hash).sort(),
        ['code', 'session_state', 'state'],
        'shall return code, session_state and state hash params'
      )

      // return from authentication with the code
      window.location.href = newUrl
      const client = new Client(opts)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens.idToken, 'string', 'shall return id token')
      assert.strictEqual(typeof tokens.refreshToken, 'string', 'shall return refresh token')

      const token = await client.accessToken()
      assert.strictEqual(token, tokens.token, 'shall get access token')
    })

    it('shall obtain tokens in standard flow with pkce', async function () {
      const opts = { ...clientOpts, pkceMethod: 'S256' }
      const client0 = new Client(opts)
      await client0.init()
      const newUrl = await client0.login()
      // console.log(params(newUrl))
      assert.deepStrictEqual(
        Object.keys(params(newUrl).hash).sort(),
        ['code', 'session_state', 'state'],
        'shall return code, session_state and state hash params'
      )

      // return from authentication with the code
      window.location.href = newUrl
      const client = new Client(opts)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens.idToken, 'string', 'shall return id token')
      assert.strictEqual(typeof tokens.refreshToken, 'string', 'shall return refresh token')

      const token = await client.accessToken()
      assert.strictEqual(token, tokens.token, 'shall get access token')
    })

    it('shall reinitialize with valid tokens', async function () {
      const opts = { ...clientOpts }
      const client0 = new Client(opts)
      await client0.init()
      const newUrl = await client0.login()

      // return from authentication with the code
      window.location.href = newUrl
      const client1 = new Client(opts)
      const tokens1 = await client1.init()
      // console.log(tokens1)
      assert.strictEqual(typeof tokens1.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens1.refreshToken, 'string', 'shall return refresh token')

      // refresh page
      window.location.href = origin
      const client = new Client({ ...opts, ...tokens1 })
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens.refreshToken, 'string', 'shall return refresh token')
      assert.ok(tokens.token !== tokens1.token, 'obtained token shall differ')
      assert.ok(tokens.refreshToken !== tokens1.refreshToken, 'obtained refresh token shall differ')
    })

    it('shall obtain tokens in implicit flow', async function () {
      const opts = {
        ...clientOpts,
        flow: 'implicit',
        responseType: 'token id_token'
      }
      const client0 = new Client(opts)
      await client0.init()
      const newUrl = await client0.login()
      // console.log(params(newUrl))
      assert.deepStrictEqual(
        Object.keys(params(newUrl).hash).sort(),
        [
          'access_token',
          'expires_in',
          'id_token',
          'scope',
          'session_state',
          'state',
          'token_type'
        ],
        'shall return implicit flow hash params'
      )

      // return from authentication with the code
      window.location.href = newUrl
      const client = new Client(opts)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens.idToken, 'string', 'shall return id token')
      assert.strictEqual(typeof tokens.refreshToken, 'undefined', 'shall not return a refresh token')

      const token = await client.accessToken()
      assert.strictEqual(token, tokens.token, 'shall get access token')
    })

    it('shall obtain tokens in hybrid flow', async function () {
      const opts = { ...clientOpts, flow: 'hybrid', responseType: 'code id_token' }
      const client0 = new Client(opts)
      await client0.init()
      const newUrl = await client0.login()
      // console.log(params(newUrl))
      assert.deepStrictEqual(
        Object.keys(params(newUrl).hash).sort(),
        [
          'code',
          'id_token',
          'session_state',
          'state'
        ],
        'shall return hybrid flow hash params'
      )

      // return from authentication with the code
      window.location.href = newUrl
      const client = new Client(opts)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall not return token')
      assert.strictEqual(typeof tokens.idToken, 'string', 'shall return id token')
      assert.strictEqual(typeof tokens.refreshToken, 'string', 'shall return a refresh token')
    })
  })

  describe('silentLogin', function () {
    it('shall obtain tokens in standard flow', async function () {
      const opts = { ...clientOpts, silentLoginRedirectUri: '/silent-login-check.html' }
      const client = new Client(opts)
      injectMocks(client)
      await client.init()
      const tokens = await client.silentLogin()
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      assert.strictEqual(typeof tokens.idToken, 'string', 'shall return id token')
      assert.strictEqual(typeof tokens.refreshToken, 'string', 'shall return refresh token')
    })

    it('shall fail if login is required', async function () {
      const opts = {
        ...clientOpts,
        // log: console,
        silentLoginRedirectUri: '/silent-login-check.html'
      }
      const client = new Client(opts)
      injectMocks(client, { error: 'login_required' })
      await client.init()
      await client.silentLogin().catch(err => {
        assert.strictEqual(err.message, 'login_required')
      })
    })
  })

  const timeout = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))

  describe('status iframe', function () {
    beforeEach(async function () {
      window.location.href = origin
      const client0 = new Client({ ...clientOpts })
      await client0.init()
      const newUrl = await client0.login()
      // return from authentication with the code
      window.location.href = newUrl
    })

    const opts = {
      ...clientOpts,
      // log: console, // DEBUG
      useStatusIframe: true,
      statusIframeInterval: 0.05
    }

    const createStats = (client) => {
      const stats = {
        logout: 0,
        error: [],
        ok: () => stats.logout === 0 && stats.error.length === 0
      }
      client.on('logout', () => stats.logout++)
      client.on('err', err => stats.error.push(err))
      return stats
    }

    it('shall not logout with unchanged status iframe', async function () {
      const client = new Client(opts)
      injectMocks(client, { status: [UNCHANGED, 'ignore', UNCHANGED] })
      const stats = createStats(client)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      await timeout(200)
      await client.logout()
      assert.ok(stats.ok())
      assert.ok(client.statusIframe.iframe.count > 2, 'shall call status iframe more than 2x')
    })

    it('shall not logout on 1st error', async function () {
      const client = new Client(opts)
      injectMocks(client, { status: [ERROR] })
      const stats = createStats(client)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      await timeout(200)
      await client.logout()
      assert.ok(stats.ok())
      assert.ok(client.statusIframe.iframe.count === 1, 'shall disable status iframe')
    })

    it('shall not logout on 1st changed', async function () {
      const client = new Client(opts)
      injectMocks(client, { status: [CHANGED] })
      const stats = createStats(client)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      await timeout(200)
      await client.logout()
      assert.ok(stats.ok())
      assert.ok(client.statusIframe.iframe.count === 1, 'shall disable status iframe')
    })

    it('shall logout if 2nd status is changed', async function () {
      const client = new Client(opts)
      injectMocks(client, { status: [UNCHANGED, CHANGED] })
      const stats = createStats(client)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      await timeout(200)
      // console.log(stats, client.statusIframe.iframe.count)
      assert.strictEqual(stats.logout, 1)
      assert.strictEqual(client.statusIframe.iframe.count, 2)
    })

    it('shall logout if 2nd status is error', async function () {
      const client = new Client(opts)
      injectMocks(client, { status: [UNCHANGED, ERROR, UNCHANGED] })
      const stats = createStats(client)
      const tokens = await client.init()
      // console.log(tokens)
      assert.strictEqual(typeof tokens.token, 'string', 'shall return token')
      await timeout(200)
      // await client.logout()
      // console.log(stats, client.statusIframe.iframe.count)
      assert.strictEqual(stats.logout, 1)
      assert.strictEqual(client.statusIframe.iframe.count, 2)
    })
  })
})
