import assert from 'assert'
import request from 'supertest'
import { setup } from './support/server.js'
import { URL } from 'url'

// const log = console.log
const log = () => {}

describe('test/support/server', function () {
  const port = 3000
  const cache = {}

  before(function () {
    this.app = setup({ port })
  })

  it('shall obtain .well-known/openid-configuration', async function () {
    const res = await request(this.app)
      .get('/oidc/.well-known/openid-configuration')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200)
    log(res.body)
    assert.strictEqual(
      res.body.authorization_endpoint,
      `http://localhost:${port}/oidc/auth`
    )
    assert.strictEqual(
      res.body.token_endpoint,
      `http://localhost:${port}/oidc/token`
    )
  })

  it('shall obtain jwks certs', async function () {
    const res = await request(this.app)
      .get('/oidc/certs')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200)
    log(res.body)
    assert.ok(Array.isArray(res.body.keys))
    assert.strictEqual(res.body.keys[0].kty, 'RSA')
  })

  it('shall request authorization code', async function () {
    const url = '/oidc/auth?response_type=code&client_id=test&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&state=1234'
    const res = await request(this.app).get(url)
      .redirects(0)
      .expect(302)
    log(res.headers)
    assert.strictEqual(res.headers['set-cookie'][0], 'SESSION_STATE=1234; Path=/oidc/auth')
    const u = new URL(res.headers.location)
    log(u)
    assert.strictEqual(u.origin, 'http://localhost:8000')
    assert.strictEqual(u.searchParams.has('code'), true)
    cache.code = u.searchParams.get('code')
  })

  it('shall request authorization code as fragment', async function () {
    const url = '/oidc/auth?response_type=code&response_mode=fragment&client_id=test&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&state=1234'
    const res = await request(this.app).get(url)
      .redirects(0)
      .expect(302)
    log(res.headers)
    assert.strictEqual(res.headers['set-cookie'][0], 'SESSION_STATE=1234; Path=/oidc/auth')
    const u = new URL(res.headers.location)
    log(u)
    assert.strictEqual(u.origin, 'http://localhost:8000')
    assert.strictEqual(u.searchParams.has('code'), false)
    assert.strictEqual(u.hash.substring(0, 6), '#code=')
  })

  it('shall get error on unknown response_type', async function () {
    const url = '/oidc/auth?response_type=unknown&client_id=test&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&state=1234'
    const res = await request(this.app).get(url)
      .redirects(0)
      .expect(302)
    log(res.headers)
    assert.strictEqual(res.headers['set-cookie'][0], 'SESSION_STATE=; Path=/oidc/auth; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
    const u = new URL(res.headers.location)
    log(u)
    assert.strictEqual(u.origin, 'http://localhost:8000')
    assert.strictEqual(u.searchParams.get('error'), 'unsupported_response_type')
  })

  it('shall get tokens', async function () {
    const url = '/oidc/token'
    const res = await request(this.app).post(url)
      .send({
        grant_type: 'authorization_code',
        code: cache.code,
        client_id: 'test',
        state: '1234',
        nonce: '5678'
      })
      .expect(200)
    log(res.body)
    assert.strictEqual(typeof res.body.access_token, 'string')
    assert.strictEqual(typeof res.body.refresh_token, 'string')
    assert.strictEqual(typeof res.body.id_token, 'string')
    cache.token = res.body.access_token
  })

  it('shall obtain userinfo', async function () {
    const url = '/oidc/userinfo'
    const res = await request(this.app)
      .get(url)
      .set({ Authorization: 'Bearer ' + cache.token })
    log(res)
    assert.deepStrictEqual(res.body, { name: 'Alice', email: 'alice@wonder.land' })
  })
})
