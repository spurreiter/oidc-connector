import { get } from './get.js'
import { absoluteUrl } from './urls.js'

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
  LOGIN
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

export function initOptions (options = {}) {
  const log = {
    info: set(func(get(options, 'log.info', get(options, 'log.log'))), function () {}),
    error: set(func(get(options, 'log.error')), function () {})
  }

  const opts = {
    ...options,
    forceLogin: set(options.forceLogin, false),
    forceLogout: set(options.forceLogout, true),
    useNonce: set(options.useNonce, true),
    useLocalStorage: set(options.useLocalStorage, true),
    useStatusIframe: set(options.useStatusIframe, true),
    statusIframeInterval: set(number(options.statusIframeInterval), 5),
    responseMode: set(options.responseMode, [FRAGMENT, QUERY]),
    responseType: set(options.responseType, (
      [[CODE], [ID_TOKEN, TOKEN], [CODE, ID_TOKEN, TOKEN]].map(a => a.join(' '))
    )),
    flow: set(options.flow, [STANDARD, IMPLICIT, HYBRID]),
    prompt: set(options.prompt, [NONE, LOGIN]),
    minValidity: set(number(options.minValidity), 15),
    expiryInterval: set(number(options.expiryInterval), 5),
    log
  }

  return opts
}
