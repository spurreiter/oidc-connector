function min2ms (min) {
  return min * 60000
}

function getCookie (key) {
  const name = key + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trimStart()
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length))
    }
  }
  return ''
}

function getCookies () {
  const obj = {}
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trimStart()
    const [_, key, value] = /^([^=]+)=(.*)$/.exec(c) // eslint-disable-line no-unused-vars
    obj[key] = decodeURIComponent(value)
  }
  return obj
}

function cookieExpiration (minutes) {
  const exp = new Date()
  exp.setTime(exp.getTime() + min2ms(minutes))
  return exp
}

function setCookie (key, value, minutes) {
  const expirationDate = cookieExpiration(minutes)
  const cookie = `${key}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; `
  document.cookie = cookie
}

export class CookieStorage {
  keys () {
    return getCookies()
  }

  getItem (key) {
    const value = getCookie(key)
    return JSON.parse(value)
  }

  setItem (key, value) {
    setCookie(key, JSON.stringify(value), 60)
  }

  removeItem (key) {
    setCookie(key, '', -60)
  }

  clear () {
  }
}

export class LocalStorage {
  /**
   * [constructor description]
   * @param {object} [type] - window.sessionStorage
   */
  constructor (type) {
    const test = '##-test'
    this._store = type || window.localStorage
    this._store.setItem(test, test)
    this._store.removeItem(test)
  }

  keys () {
    return this._store
  }

  getItem (key) {
    const value = this._store.getItem(key)
    return JSON.parse(value)
  }

  setItem (key, value) {
    this._store.setItem(key, JSON.stringify(value))
  }

  removeItem (key) {
    this._store.removeItem(key)
  }

  clear () {
    this._store.clear()
  }
}

export function storage (type) {
  if (type === 'cookie') {
    return new CookieStorage()
  }
  try {
    return new LocalStorage(type)
  } catch (e) {
    return new CookieStorage()
  }
}

export class CallbackStorage {
  constructor (type) {
    this._callback = 'oidc-callback-'
    this._store = storage(type)
  }

  _clearExpired () {
    const time = new Date().getTime()
    const keys = Object.keys(this._store.keys())
    keys.forEach((key) => {
      if (key.indexOf(this._callback) === 0) {
        try {
          const { expires } = this._store.getItem(key)
          if (!expires || expires < time) {
            this._store.removeItem(key)
          }
        } catch (e) {
          this._store.removeItem(key)
        }
      }
    })
  }

  get (state) {
    if (!state) return
    this._clearExpired()
    const key = this._callback + state
    const value = this._store.getItem(key)
    if (value) {
      this._store.removeItem(key)
      return value
    }
  }

  add (state) {
    this._clearExpired()
    const key = this._callback + state.state
    state.expires = state.expires || (new Date().getTime() + min2ms(60))
    this._store.setItem(key, state)
  }
}
