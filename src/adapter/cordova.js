import { createPromise } from '../utils/createPromise.js'

function openUrl (url, options, target = '_blank') {
  // Use inappbrowser for IOS and Android if available
  const hasInAppBrowser = window.cordova && window.cordova.InAppBrowser
  const open = hasInAppBrowser
    ? window.cordova.InAppBrowser.open
    : window.open
  return open(url, target, options)
}

function createCordovaOptions (opts = {}) {
  const cordovaOptions = { hidden: 'yes', ...opts }
  cordovaOptions.location = 'no'
  const formatted = Object.entries(cordovaOptions).map(a => a.join('=')).join(',')
  return formatted
}

export class AdapterCordova {
  constructor (opts) {
    this.cordovaOpts = createCordovaOptions(opts)
  }

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
    const ref = openUrl(url, this.cordovaOpts)
    let completed = false

    let closed = false
    const closeBrowser = () => {
      closed = true
      ref.close()
    }

    const loadStart = (ev) => {
      if (ev.url.indexOf('http://localhost') === 0) {
        const oauth = client.callback.parse(ev.url)
        client._processCallback(oauth)
          .then(res => promise.resolve(res))
          .catch(err => promise.reject(err))
        closeBrowser()
        completed = true
        return true
      }
    }

    ref.addEventListener('loadstart', (ev) => {
      loadStart(ev)
    })

    ref.addEventListener('loaderror', (ev) => {
      if (!completed && !loadStart(ev)) {
        promise.reject()
        closeBrowser()
      }
    })

    ref.addEventListener('exit', (/* ev */) => {
      if (!closed) {
        promise.reject(new Error('closed by user'))
      }
    })

    return promise
  }

  async register () {
    this._isInitialized()
    const promise = createPromise()
    const { client } = this
    const url = await this.endpoints.createRegisterUrl(this.options)
    const ref = openUrl(url, this.cordovaOptions)

    ref.addEventListener('loadstart', function (ev) {
      if (ev.url.indexOf('http://localhost') === 0) {
        ref.close()
        const oauth = client.callback.parse(ev.url)
        client._processCallback(oauth)
          .then(res => promise.resolve(res))
          .catch(err => promise.reject(err))
      }
    })

    return promise
  }

  async logout ({ idToken }) {
    this._isInitialized()
    const promise = createPromise()
    const url = await this.endpoints.createLogoutUrl(this.options, { idToken })
    const ref = openUrl(url, 'location=no,hidden=yes')

    let loaderror

    const loadStart = (ev) => {
      if (ev.url.indexOf('http://localhost') === 0) {
        ref.close()
        return true
      }
    }

    ref.addEventListener('loadstart', (ev) => {
      loadStart(ev)
    })

    ref.addEventListener('loaderror', (ev) => {
      if (!loadStart(ev)) {
        loaderror = true
        ref.close()
      }
    })

    ref.addEventListener('exit', (/* ev */) => {
      if (loaderror) {
        promise.reject()
      } else {
        this.client.tokens.clearTokens()
        promise.resolve()
      }
    })

    return promise
  }

  async account () {
    this._isInitialized()
    const url = await this.endpoints.createAccountUrl(this.options)
    if (typeof url !== 'undefined') {
      const ref = openUrl(url, 'location=no')
      ref.addEventListener('loadstart', function (ev) {
        if (ev.url.indexOf('http://localhost') === 0) {
          ref.close()
        }
      })
    } else {
      throw new Error('Not supported by the OIDC server')
    }
  }
}
