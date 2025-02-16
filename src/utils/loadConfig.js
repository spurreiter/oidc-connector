import { clearUrl } from './urls.js'

export async function loadConfig(config) {
  if (!config.url) {
    return Promise.reject(new Error('url missing'))
  }
  if (!config.clientId) {
    return Promise.reject(new Error('clientId missing'))
  }

  const {
    url,
    realm,
    userRegistrationEndpoint,
    userAccountEndpoint,
    ..._config
  } = config
  _config.serverUrl = clearUrl(realm ? `${url}/realms/${realm}` : url)

  let oidcConfigUrl = `${_config.serverUrl}/.well-known/openid-configuration`
  if (typeof _config.oidcConfig === 'string') {
    oidcConfigUrl = _config.oidcConfig
    _config.oidcConfig = null
  }

  const mergeC = (c) => ({
    ...c,
    userRegistrationEndpoint,
    userAccountEndpoint
  })

  if (!_config.oidcConfig) {
    const res = await fetch(oidcConfigUrl, {
      headers: { Accept: 'application/json' }
    })
    if (res.status !== 200) {
      return Promise.reject(
        new Error(`error loading oidcConfig ${oidcConfigUrl}`)
      )
    }
    const oidcConfig = await res.json()
    return {
      ..._config,
      oidcConfig: mergeC(oidcConfig)
    }
  } else {
    _config.oidcConfig = mergeC(config.oidcConfig)
  }

  return _config
}
