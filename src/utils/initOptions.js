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

/**
 * @param {{
 *  flow?: string
 *  responseType?: import('../client').ResponseType|''
 * }} param0
 * @returns {import('../client').ResponseType}
 */
const setResponseType = ({ flow = '', responseType = '' } = {}) => {
  const allowed = [NONE, CODE, TOKEN, ID_TOKEN]
  const types = responseType.split(' ').reduce((types, type) => {
    if (allowed.indexOf(type) !== -1) {
      types.push(type)
    }
    return types
  }, flow === IMPLICIT ? [] : [CODE])
  // @ts-expect-error
  return [...new Set(types)].join(' ')
}

/**
 * @typedef {import('../client').Options} Options
 * @typedef {import('../client').Logger} Logger
 *
 * @typedef {object} OptionsExt
 * @property {Logger} log
 */

/**
 * @param {Options} options
 * @returns {Options & OptionsExt}
 */
export function initOptions (options) {
  const _opts = options || {}

  const log = {
    info: set(func(get(_opts, 'log.info', get(_opts, 'log.log'))), function () {}),
    error: set(func(get(_opts, 'log.error')), function () {})
  }

  const opts = {
    ..._opts,
    forceLogin: set(_opts.forceLogin, false),
    forceLogout: set(_opts.forceLogout, true),
    useNonce: set(_opts.useNonce, true),
    storage: set(_opts.storage, [S_SESSION, S_LOCAL, S_COOKIE, S_MEMORY]),
    minValidity: set(number(_opts.minValidity), 15),
    expiryInterval: set(number(_opts.expiryInterval), 5),
    responseMode: set(_opts.responseMode, [FRAGMENT, QUERY]),
    responseType: setResponseType(_opts),
    flow: set(_opts.flow, [STANDARD, IMPLICIT, HYBRID]),
    pkce: set(func(_opts.pkce), pkce),
    useStatusIframe: set(_opts.useStatusIframe, true),
    statusIframeInterval: set(number(_opts.statusIframeInterval), 5),
    prompt: set(_opts.prompt, [NONE, LOGIN]),
    silentLoginWait: set(number(_opts.silentLoginWait), 5),
    log
  }

  // sanitize scope
  const scope_ = _opts.scope
  const scope = (
    !scope_
      ? []
      : typeof scope_ === 'string'
        ? scope_.split(' ')
        : scope_
  ).filter(Boolean)
  if (!scope.includes(OPENID) && !_opts.noOpenidInScope) {
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
