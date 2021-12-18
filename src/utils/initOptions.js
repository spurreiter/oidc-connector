import { get } from './get.js'
import { absoluteUrl } from './urls.js'
import { pkce } from './pkce.js'

import {
  FRAGMENT,
  QUERY,
  TOKEN,
  CODE,
  ID_TOKEN,
  STANDARD,
  IMPLICIT,
  HYBRID,
  NONE,
  LOGIN,
  OPENID,
  S_SESSION,
  S_LOCAL,
  S_COOKIE,
  S_MEMORY
} from '../constants.js'

const set = (val, def) => Array.isArray(def)
  ? def.includes(val)
    ? val
    : def[0]
  : val !== undefined
    ? typeof def === 'boolean'
      ? !!val
      : val
    : def

const number = val => isNaN(val) ? undefined : val

const func = val => typeof val === 'function' ? val : undefined

const setResponseType = ({ flow = '', responseType = '' } = {}) => {
  const allowed = [NONE, CODE, TOKEN, ID_TOKEN]
  const types = responseType.split(' ').reduce((types, type) => {
    if (allowed.indexOf(type) !== -1) {
      types.push(type)
    }
    return types
  }, flow === IMPLICIT ? [] : [CODE])
  return [...new Set(types)].join(' ')
}

export function initOptions (options = {}) {
  const log = {
    info: set(func(get(options, 'log.info', get(options, 'log.log'))), function () {}),
    error: set(func(get(options, 'log.error')), function () {})
  }

  const opts = {
    url: undefined,
    realm: undefined,
    clientId: undefined,
    clientSecret: undefined,
    clientSecretPost: undefined,
    redirectUri: undefined,
    postLogoutRedirectUri: undefined,
    scope: undefined,
    pkceMethod: undefined,
    token: undefined,
    refreshToken: undefined,
    idToken: undefined,
    silentLoginRedirectUri: undefined,
    maxAge: undefined,
    loginHint: undefined,
    idpHint: undefined,
    locale: undefined,
    authorizationParams: undefined,
    userRegistrationEndpoint: undefined,
    userAccountEndpoint: undefined,
    ...options,
    forceLogin: set(options.forceLogin, false),
    forceLogout: set(options.forceLogout, true),
    useNonce: set(options.useNonce, true),
    storage: set(options.storage, [S_LOCAL, S_SESSION, S_COOKIE, S_MEMORY]),
    minValidity: set(number(options.minValidity), 15),
    expiryInterval: set(number(options.expiryInterval), 5),
    responseMode: set(options.responseMode, [FRAGMENT, QUERY]),
    responseType: setResponseType(options),
    flow: set(options.flow, [STANDARD, IMPLICIT, HYBRID]),
    pkce: set(func(options.pkce), pkce),
    useStatusIframe: set(options.useStatusIframe, true),
    statusIframeInterval: set(number(options.statusIframeInterval), 5),
    prompt: set(options.prompt, [NONE, LOGIN]),
    silentLoginWait: set(number(options.silentLoginWait), 5),
    log
  }

  // sanitize scope
  const scope_ = options.scope
  const scope = (
    !scope_
      ? []
      : typeof scope_ === 'string'
        ? scope_.split(' ')
        : scope_
  ).filter(Boolean)
  if (!scope.includes(OPENID) && !options.noOpenidInScope) {
    scope.unshift(OPENID)
  }
  opts.scope = scope.join(' ')

  // make url point to a real host
  const s = 'silentLoginRedirectUri'
  if (opts[s]) {
    opts[s] = absoluteUrl(opts[s])
  }

  // test if pkceMethod is supported
  if (opts.pkce && opts.pkceMethod) {
    try {
      opts.pkce(opts.pkceMethod)
    } catch (e) {
      opts.log.error('pkceMethod %s not supported', opts.pkceMethod)
      opts.pkceMethod = undefined
    }
  }

  return opts
}
