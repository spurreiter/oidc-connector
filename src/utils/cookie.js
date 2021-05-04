export function min2ms (minutes) {
  return minutes * 60000
}

export function getCookie (key) {
  const name = key + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trimStart()
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length))
    }
  }
  return null
}

export function getCookies () {
  const obj = {}
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trimStart()
    const [_, key, value] = /^([^=]+)=(.*)$/.exec(c) // eslint-disable-line no-unused-vars
    obj[key] = decodeURIComponent(value)
  }
  return obj
}

export function cookieExpiration (minutes = 15) {
  const exp = new Date()
  exp.setTime(exp.getTime() + min2ms(minutes))
  return exp
}

export function setCookie (key, value, minutes) {
  const expirationDate = cookieExpiration(minutes)
  const cookie = `${key}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; `
  document.cookie = cookie
}
