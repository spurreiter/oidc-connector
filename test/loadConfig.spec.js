import assert from 'assert'
import http from 'http'
import { loadConfig } from '../src/utils/index.js'
import { wellKnownOidcKeycloak, wellKnownOidcGoogle } from './fixtures/index.js'
import debug from 'debug'
import { jsdom } from './support/shims.js'

const log = debug('test')

const port = 3003

describe('utils/loadConfig', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: `http://localhost:${port}`,
      referrer: `http://localhost:${port}`,
      contentType: 'text/html'
    })
  })
  before(function () {
    this.server = http
      .createServer((req, res) => {
        const { method, url } = req
        if (url === '/auth/realms/my/.well-known/openid-configuration') {
          res.body = JSON.stringify(wellKnownOidcKeycloak)
        } else if (url === '/auth/.well-known/openid-configuration') {
          res.body = JSON.stringify(wellKnownOidcKeycloak)
        } else if (url === '/other/.well-known/openid-configuration') {
          res.body = JSON.stringify(wellKnownOidcGoogle)
        } else {
          res.statusCode = 404
        }
        log(res.statusCode, method, url)
        res.end(res.body)
      })
      .listen(3003)
  })
  after(function () {
    this.server.close()
  })

  it('shall take config from object', async function () {
    const config = await loadConfig({
      url: `http://localhost:${port}/auth`,
      realm: 'my',
      clientId: 'local-server'
    })
    assert.deepStrictEqual(config, {
      serverUrl: `http://localhost:${port}/auth/realms/my`,
      clientId: 'local-server',
      oidcConfig: {
        ...wellKnownOidcKeycloak,
        userRegistrationEndpoint: undefined,
        userAccountEndpoint: undefined
      }
    })
  })

  it('shall throw if url is missing', async function () {
    await loadConfig({}).catch((err) => {
      assert.strictEqual(err.message, 'url missing')
    })
  })

  it('shall throw if clientId is missing', async function () {
    await loadConfig({ url: 'http://localhost:8080/auth' }).catch((err) => {
      assert.strictEqual(err.message, 'clientId missing')
    })
  })

  it('shall use oidcConfig from object', async function () {
    const config = await loadConfig({
      url: `http://localhost:${port}/auth`,
      clientId: 'local-server',
      oidcConfig: wellKnownOidcKeycloak
    })
    assert.deepStrictEqual(config, {
      serverUrl: `http://localhost:${port}/auth`,
      clientId: 'local-server',
      oidcConfig: {
        ...wellKnownOidcKeycloak,
        userRegistrationEndpoint: undefined,
        userAccountEndpoint: undefined
      }
    })
  })

  it('shall load oidcConfig from string', async function () {
    const config = await loadConfig({
      url: `http://localhost:${port}/auth`,
      clientId: 'local-server',
      oidcConfig: `http://localhost:${port}/other/.well-known/openid-configuration`
    })
    assert.deepStrictEqual(config, {
      serverUrl: `http://localhost:${port}/auth`,
      clientId: 'local-server',
      oidcConfig: {
        ...wellKnownOidcGoogle,
        userRegistrationEndpoint: undefined,
        userAccountEndpoint: undefined
      }
    })
  })

  it('shall throw if oidcConfig could not be loaded', async function () {
    await loadConfig({
      url: `http://localhost:${port}/not-there`,
      clientId: 'local-server'
    }).catch((err) => {
      assert.strictEqual(
        err.message,
        `error loading oidcConfig http://localhost:${port}/not-there/.well-known/openid-configuration`
      )
    })
  })
})
