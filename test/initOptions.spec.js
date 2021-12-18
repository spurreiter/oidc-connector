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
      authorizationParams: undefined,
      clientId: undefined,
      clientSecret: undefined,
      clientSecretPost: undefined,
      expiryInterval: 5,
      flow: 'standard',
      forceLogin: false,
      forceLogout: true,
      idpHint: undefined,
      idToken: undefined,
      locale: undefined,
      loginHint: undefined,
      maxAge: undefined,
      minValidity: 15,
      pkceMethod: undefined,
      postLogoutRedirectUri: undefined,
      prompt: 'none',
      realm: undefined,
      redirectUri: undefined,
      refreshToken: undefined,
      responseMode: 'fragment',
      responseType: 'code',
      scope: 'openid',
      silentLoginRedirectUri: undefined,
      silentLoginWait: 5,
      statusIframeInterval: 5,
      storage: 'local',
      token: undefined,
      url: undefined,
      useNonce: true,
      userAccountEndpoint: undefined,
      userRegistrationEndpoint: undefined,
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
      authorizationParams: undefined,
      clientId: undefined,
      clientSecret: undefined,
      clientSecretPost: undefined,
      expiryInterval: 5,
      flow: 'standard',
      foo: 'bar',
      forceLogin: false,
      forceLogout: true,
      idpHint: undefined,
      idToken: undefined,
      locale: undefined,
      loginHint: undefined,
      maxAge: undefined,
      minValidity: 15,
      pkceMethod: undefined,
      postLogoutRedirectUri: undefined,
      prompt: 'none',
      realm: undefined,
      redirectUri: undefined,
      refreshToken: undefined,
      responseMode: 'fragment',
      responseType: 'code',
      scope: 'openid email',
      silentLoginRedirectUri: undefined,
      silentLoginWait: 5,
      statusIframeInterval: 5,
      storage: 'local',
      token: undefined,
      url: undefined,
      useNonce: true,
      userAccountEndpoint: undefined,
      userRegistrationEndpoint: undefined,
      useStatusIframe: true
    })
  })
})
