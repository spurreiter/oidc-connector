const set = (val, def, allowed) => Array.isArray(def)
  ? def.includes(val)
    ? val
    : def[0]
  : val !== undefined
    ? typeof def === 'boolean'
      ? !!val
      : val
    : def

const number = val => isNaN(val) ? undefined : val

export function initOptions (options = {}) {
  const opts = {
    ...options,
    useNonce: set(options.useNonce, true),
    statusIframe: set(options.statusIframe, true),
    statusIframeInterval: set(number(options.statusIframeInterval), 5),
    responseMode: set(options.responseMode, ['fragment', 'query']),
    responseType: set(options.flow, ['code', 'id_token token', 'code id_token token']),
    flow: set(options.flow, ['standard', 'implicit', 'hybrid']),
    prompt: set(options.prompt, ['none', 'login']),
    minValidity: set(number(options.minValidity), 15)
  }

  return opts
}
