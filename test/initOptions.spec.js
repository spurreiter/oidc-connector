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
    const { log: _log, pkce, ...opts } = initOptions()
    log(opts)

    testLog(_log)

    assert.deepStrictEqual(opts, {
      forceLogin: false,
      forceLogout: true,
      useNonce: true,
      useLocalStorage: true,
      useStatusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15,
      expiryInterval: 5,
      scope: 'openid'
    })
  })

  it('shall fallback to default options', function () {
    const { log: _log, pkce, ...opts } = initOptions({
      useNonce: '##',
      useStatusIframe: '##',
      statusIframeInterval: '##',
      responseMode: '##',
      responseType: '##',
      flow: '##',
      prompt: '##',
      minValidity: '##',
      foo: 'bar',
      log: '##',
      scope: 'email'
    })
    log(opts)

    testLog(_log)

    assert.deepStrictEqual(opts, {
      forceLogin: false,
      forceLogout: true,
      useNonce: true,
      useLocalStorage: true,
      useStatusIframe: true,
      statusIframeInterval: 5,
      responseMode: 'fragment',
      responseType: 'code',
      flow: 'standard',
      prompt: 'none',
      minValidity: 15,
      expiryInterval: 5,
      foo: 'bar',
      scope: 'openid email'
    })
  })
})
