/**
 * @param {object} obj
 * @param {string[]|string} [keys]
 * @param {any} [def] default value
 * @returns {any}
 */
export const get = (obj, keys = [], def = undefined) => {
  let o = obj
  const _keys = typeof keys === 'string' ? keys.split('.') : keys
  for (const key of _keys) {
    if (o && o[key]) {
      o = o[key]
    } else {
      return def
    }
  }
  return o
}
