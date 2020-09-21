import assert from 'assert'
import jsdom from 'jsdom-global'
import { decodeToken } from '../src/utils/index.js'

describe('utils/decodeToken', function () {
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

  it('shall decode', function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    assert.deepStrictEqual(decodeToken(token), {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022
    })
  })

  it('shall decode a token with url safe chars', function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM1U-WDkscS9ROnE_Rj8ya2ZMOSA9TmfCgcKBfjY3IDlMIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyfQ.THQcTL5-GReQrQhd0KjHmpSjR2ycihl7e86IoAUJDWQ'
    assert.deepStrictEqual(decodeToken(token), {
      name: '3U>X9,q/Q:q?F?2kfL9 =Ng\x81\x81~67 9L',
      sub: '1234567890',
      iat: 151623902
    })
  })

  it('shall throw with invalid token', function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM1U-WDkscS9ROnE_Rj8ya2ZMOSA9TmfCgcKBfjY3IDlMIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyfQAAA.THQcTL5-GReQrQhd0KjHmpSjR2ycihl7e86IoAUJDWQ'
    assert.throws(() => decodeToken(token), /Error: Invalid token/)
  })
})
