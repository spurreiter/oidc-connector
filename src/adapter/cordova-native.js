/* global universalLinks */

import { createPromise } from '../utils/createPromise.js'

const SUBKEY = 'oidc'

function openUrl (url, eventFn) {
  if (eventFn) {
    universalLinks.subscribe(SUBKEY, (event) => {
      universalLinks.unsubscribe(SUBKEY)
      window.cordova.plugins.browsertab.close()
      eventFn(event)
    })
  }
  window.cordova.plugins.browsertab.openUrl(url)
}

export class AdapterCordovaNative {
  initialize (client) {
    client.statusIframe.disable()
    this.client = client
    this.options = client.options
    this.endpoints = client.endpoints
  }

  _isInitialized () {
    if (!this.options) throw new Error('adapter not initialized')
  }

  redirectUri () {
    return 'http://localhost'
  }

  async login (opts) {
    this._isInitialized()
    const promise = createPromise()
    const { client } = this

    const url = await this.endpoints.createLoginUrl({ ...this.options, ...opts })
    openUrl(url, (event) => {
      const oauth = client.callback.parse(event.url)
      client._processCallback(oauth)
        .then(res => promise.resolve(res))
        .catch(err => promise.reject(err))
    })

    return promise
  }

  async register () {
    this._isInitialized()
    const promise = createPromise()
    const { client } = this
    const url = await this.endpoints.createRegisterUrl(this.options)
    openUrl(url, (event) => {
      const oauth = client.callback.parse(event.url)
      client._processCallback(oauth)
        .then(res => promise.resolve(res))
        .catch(err => promise.reject(err))
    })

    return promise
  }

  async logout ({ idToken }) {
    this._isInitialized()
    const promise = createPromise()
    const url = await this.endpoints.createLogoutUrl(this.options, { idToken })

    openUrl(url, (/* event */) => {
      this.client.tokens.clearTokens()
      promise.resolve()
    })

    return promise
  }

  async account () {
    this._isInitialized()
    const url = await this.endpoints.createAccountUrl(this.options)
    if (typeof url !== 'undefined') {
      openUrl(url)
    } else {
      throw new Error('Not supported by the OIDC server')
    }
  }
}
