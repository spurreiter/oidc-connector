import jsdom from 'jsdom-global'
import assert from 'assert'
import http from 'http'
import fetchPoly from 'whatwg-fetch'
import { loadConfig } from '../src/utils/index.js'
import { keycloakJson, oidcProviderResponse } from './fixtures/index.js'
import debug from 'debug'

const log = debug('test')

const port = 3003

describe('utils/loadConfig', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: `http://localhost:${port}`,
      referrer: `http://localhost:${port}`,
      contentType: 'text/html'
    })
    if (!window.fetch) {
      window.fetch = fetchPoly
    }
  })
  after(function () {
    this.jsdom()
  })
  before(function () {
    this.server = http.createServer((req, res) => {
      const { method, url } = req
      if (url === '/keycloak.json') {
        res.body = JSON.stringify(keycloakJson)
      } else if (url === '/.well-known/openid-configuration') {
        res.body = JSON.stringify(oidcProviderResponse)
      } else {
        res.statusCode = 404
      }
      log(res.statusCode, method, url)
      res.end(res.body)
    }).listen(3003)
  })
  after(function () {
    this.server.close()
  })

  it('shall load config from keycloak.json', async function () {
    const config = await loadConfig()
    assert.deepStrictEqual(config, {
      authServerUrl: 'http://localhost:8080/auth/',
      realm: 'master',
      clientId: 'local-server'
    })
  })

  it('shall load config from string', async function () {
    const config = await loadConfig('/keycloak.json')
    assert.deepStrictEqual(config, {
      authServerUrl: 'http://localhost:8080/auth/',
      realm: 'master',
      clientId: 'local-server'
    })
  })

  it('shall take config from object', async function () {
    const config = await loadConfig({
      url: 'http://localhost:8080/auth/',
      realm: 'master',
      clientId: 'local-server'
    })
    assert.deepStrictEqual(config, {
      authServerUrl: 'http://localhost:8080/auth/',
      realm: 'master',
      clientId: 'local-server'
    })
  })

  it('shall throw if config could not be loaded is missing', async function () {
    await loadConfig(`http://localhost:${port}/config`).catch(err => {
      assert.strictEqual(err.message, `Error: error loading config http://localhost:${port}/config`)
    })
  })

  it('shall throw if url is missing', async function () {
    await loadConfig({}).catch(err => {
      assert.strictEqual(err.message, 'url missing')
    })
  })

  it('shall throw if clientId is missing', async function () {
    await loadConfig({ url: 'http://localhost:8080/auth/' }).catch(err => {
      assert.strictEqual(err.message, 'clientId missing')
    })
  })

  it('shall load oidcProvider from url', async function () {
    const config = await loadConfig({
      url: 'http://localhost:8080/auth/',
      clientId: 'local-server',
      oidcProvider: `http://localhost:${port}`
    })
    assert.deepStrictEqual(config, {
      authServerUrl: 'http://localhost:8080/auth/',
      clientId: 'local-server',
      realm: undefined,
      oidcProvider: oidcProviderResponse
    })
  })

  it('shall use oidcProvider from object', async function () {
    const config = await loadConfig({
      url: 'http://localhost:8080/auth/',
      clientId: 'local-server',
      oidcProvider: oidcProviderResponse
    })
    assert.deepStrictEqual(config, {
      authServerUrl: 'http://localhost:8080/auth/',
      clientId: 'local-server',
      realm: undefined,
      oidcProvider: oidcProviderResponse
    })
  })

  it('shall throw if oidcProvider could not be loaded is missing', async function () {
    await loadConfig({
      url: 'http://localhost:8080/auth/',
      clientId: 'local-server',
      oidcProvider: `http://localhost:${port}`
    }).catch(err => {
      assert.strictEqual(err.message, `Error: error loading oidcProvider http://localhost:${port}/.well-known/openid-configuration`)
    })
  })
})
