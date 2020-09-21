import { clearUrl } from './clearUrl.js'

/**
 * @type {object} Config
 * @prop {string} [url] - URL to the server, for example: http://keycloak-server/auth
 * @prop {string} [realm] - Name of the realm, for example: 'myrealm'
 * @prop {string} [clientId] - Client identifier, example: 'myapp'
 * @prop {string|object} [oidcProvider] - oidc provider url or object
 */

/**
 * @type {object} ConfigLoaded
 * @prop {string} authServerUrl - server URL
 * @prop {string} [relam] - realm
 * @prop {string} clientId - Client identifier
 * @prop {object} oidcProvider - oidc provider configuration
 */

/**
 * @param  {Config|string|undefined} config
 * @return {Promise<ConfigLoaded>}
 */
export async function loadConfig (config) {
  const configUrl = !config
    ? 'keycloak.json'
    : typeof config === 'string' && config

  if (configUrl) {
    return fetch(configUrl, {
      headers: { Accept: 'application/json' }
    }).then(res => (res.status === 200)
      ? res.json()
      : Promise.reject(new Error(new Error(`error loading config ${configUrl}`)))
    ).then(config => ({
      authServerUrl: config['auth-server-url'],
      realm: config.realm,
      clientId: config.resource
    }))
  }

  if (!config.url) {
    return Promise.reject(new Error('url missing'))
  }
  if (!config.clientId) {
    return Promise.reject(new Error('clientId missing'))
  }

  const configLoaded = {
    authServerUrl: config.url,
    realm: config.realm,
    clientId: config.clientId
  }

  const { oidcProvider } = config

  if (!oidcProvider) {
    return Promise.resolve(configLoaded)
  }

  if (typeof oidcProvider === 'string') {
    const oidcProviderConfigUrl = clearUrl(`${oidcProvider}/.well-known/openid-configuration`)

    return fetch(oidcProviderConfigUrl, {
      headers: { Accept: 'application/json' }
    }).then(res => (res.status === 200)
      ? res.json()
      : Promise.reject(new Error(`error loading oidcProvider ${oidcProviderConfigUrl}`))
    ).then(oidcProvider => ({
      ...configLoaded,
      oidcProvider
    }))
  }

  return Promise.resolve({ ...configLoaded, oidcProvider })
}
