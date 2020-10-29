import { clearUrl } from './urls.js'

export async function loadConfig (config) {
  if (!config.url) {
    return Promise.reject(new Error('url missing'))
  }
  if (!config.clientId) {
    return Promise.reject(new Error('clientId missing'))
  }

  const { url, realm, ..._config } = config
  _config.serverUrl = clearUrl(
    realm
      ? `${url}/realms/${realm}`
      : url
  )

  if (!_config.oidcConfig) {
    const oidcConfigUrl = `${_config.serverUrl}/.well-known/openid-configuration`

    return fetch(oidcConfigUrl, {
      headers: { Accept: 'application/json' }
    }).then(res => (res.status === 200)
      ? res.json()
      : Promise.reject(new Error(`error loading oidcConfig ${oidcConfigUrl}`))
    ).then(oidcConfig => ({
      ..._config,
      oidcConfig
    }))
  }

  return Promise.resolve(_config)
}
