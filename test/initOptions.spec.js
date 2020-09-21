import assert from 'assert'
import { initOptions } from '../src/utils/index.js'
import debug from 'debug'

const log = debug('test')

describe('utils/initOptions', function () {
  it('shall apply default options', function () {
    const opts = initOptions()
    log(opts)
    assert.deepStrictEqual(opts, {
      useNonce: true,
      statusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15
    })
  })

  it('shall fallback to default options', function () {
    const opts = initOptions({
      useNonce: '##',
      statusIframe: '##',
      statusIframeInterval: '##',
      responseMode: '##',
      responseType: '##',
      flow: '##',
      prompt: '##',
      minValidity: '##',
      foo: 'bar'
    })
    log(opts)
    assert.deepStrictEqual(opts, {
      useNonce: true,
      statusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15,
      foo: 'bar'
    })
  })
})
