import assert from 'assert'
import { initOptions } from '../src/utils/index.js'
import debug from 'debug'

const log = debug('test')

const testLog = (_log) => {
  assert.strictEqual(typeof _log, 'object')
  assert.strictEqual(typeof _log.error, 'function')
  assert.strictEqual(typeof _log.info, 'function')
  assert.strictEqual(_log.error(), undefined)
}

describe('utils/initOptions', function () {
  it('shall apply default options', function () {
    const { log: _log, ...opts } = initOptions()
    log(opts)

    testLog(_log)

    assert.deepStrictEqual(opts, {
      useNonce: true,
      statusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15,
      expiryInterval: 5,
      loginRequired: false
    })
  })

  it('shall fallback to default options', function () {
    const { log: _log, ...opts } = initOptions({
      useNonce: '##',
      statusIframe: '##',
      statusIframeInterval: '##',
      responseMode: '##',
      responseType: '##',
      flow: '##',
      prompt: '##',
      minValidity: '##',
      foo: 'bar',
      log: '##'
    })
    log(opts)

    testLog(_log)

    assert.deepStrictEqual(opts, {
      useNonce: true,
      statusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15,
      expiryInterval: 5,
      loginRequired: false,
      foo: 'bar'
    })
  })
})
