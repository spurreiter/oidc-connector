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
      expiryInterval: 5,
      flow: 'standard',
      forceLogin: false,
      forceLogout: true,
      minValidity: 15,
      prompt: undefined,
      responseMode: 'fragment',
      responseType: 'code',
      scope: 'openid',
      silentLoginWait: 5,
      statusIframeInterval: 5,
      storage: 'session',
      useNonce: true,
      useStatusIframe: true
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
      scope: 'email',
      silentLoginWait: 5
    })
    log(opts)

    testLog(_log)

    assert.deepStrictEqual(opts, {
      expiryInterval: 5,
      flow: 'standard',
      foo: 'bar',
      forceLogin: false,
      forceLogout: true,
      minValidity: 15,
      prompt: undefined,
      responseMode: 'fragment',
      responseType: 'code',
      scope: 'openid email',
      silentLoginWait: 5,
      statusIframeInterval: 5,
      storage: 'session',
      useNonce: true,
      useStatusIframe: true
    })
  })
})
