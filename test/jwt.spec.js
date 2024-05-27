import assert from 'assert'
import { generateKeypair, toJwks, jwtSign, jwtVerify } from './support/jwt.js'

// eslint-disable-next-line no-unused-vars
const log = console

describe('test/support/jsr', function () {
  let keypair
  let token

  before(function () {
    keypair = generateKeypair('RSA', 1024)
  })

  it('shall generate a new keypair', function () {
    assert.deepEqual(Object.keys(keypair).sort(), ['privateKey', 'publicKey'])
  })

  it('shall export publicKey as jwks', function () {
    const actual = toJwks(keypair.publicKey)
    assert.deepEqual(Object.keys(actual).sort(), ['e', 'kty', 'n'])
  })

  it('shall sign JWT', function () {
    token = jwtSign(
      { alg: 'RS256' },
      { subject: 'hi' },
      { privateKey: keypair.privateKey }
    )
    // log.debug(token)
    assert.equal(typeof token, 'string')
  })

  it('shall verify JWT', function () {
    const { payload } = jwtVerify(token, { publicKey: keypair.publicKey }) || {}
    // log.debug(payload)
    assert.notEqual(payload, null)
    assert.equal(payload.subject, 'hi')
  })
})
