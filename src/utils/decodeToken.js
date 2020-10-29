
const map = {
  '-': '+',
  _: '/'
}
const RE_MAP = /[_-]/g

/**
 * decode a JWT
 * @throws
 * @param {string} [token='']
 * @return {object} payload of decoded token
 */
export function decodeToken (token = '') {
  const payload = token.split('.')[1]
  let b64 = payload.replace(RE_MAP, m => map[m])

  switch (b64.length % 4) {
    case 0:
      break
    case 2:
      b64 += '=='
      break
    case 3:
      b64 += '='
      break
    default:
      throw new Error('Invalid token')
  }

  const str = decodeURIComponent(escape(atob(b64)))
  return JSON.parse(str)
}
