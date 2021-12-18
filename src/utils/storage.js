import { getCookie, getCookies, setCookie, min2ms } from './cookie.js'
import { _globalThis } from './globalThis.js'
import { S_SESSION, S_COOKIE, S_MEMORY } from '../constants.js'

export class MemoryStorage {
  constructor () {
    this.items = {}
  }

  keys () {
    return this.items
  }

  getItem (key) {
    const value = this.items[key]
    return (value !== undefined)
      ? value
      : null
  }

  setItem (key, value) {
    this.items[key] = value
  }

  removeItem (key) {
    delete this.items[key]
  }

  clear () {
    this.items = {}
  }
}

export class CookieStorage {
  keys () {
    return getCookies()
  }

  getItem (key) {
    const value = getCookie(key) || 'null'
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
   * @param {object} [store] - window.sessionStorage
   */
  constructor (store) {
    const test = '##-test'
    // @ts-ignore
    this._store = store || _globalThis.localStorage
    this._store.setItem(test, test)
    this._store.removeItem(test)
  }

  keys () {
    return typeof this._store.keys === 'function'
      ? this._store.keys()
      : this._store
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

/**
 * Obtain token storage. Fallback is type='cookie'
 * @param {string} [type='local'] 'cookie|local|session|memory'
 * @param {string} [fallbackType] 'cookie|local|session|memory'
 * @returns {Storage|MemoryStorage|CookieStorage}
 */
export function storage (type, fallbackType) {
  if (type === S_MEMORY) {
    return new MemoryStorage()
  }
  if (type === S_COOKIE) {
    return new CookieStorage()
  }
  try {
    if (type === S_SESSION) {
      // @ts-ignore
      return new LocalStorage(_globalThis.sessionStorage)
    }
    return new LocalStorage()
  } catch (e) {
    if (fallbackType === S_MEMORY) {
      return new MemoryStorage()
    }
    return new CookieStorage()
  }
}

export class CallbackStorage {
  /**
   * Obtain token storage. Fallback is type='cookie'
   * @param {string} [type='local'] - 'local|session|cookie|memory'
   */
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
