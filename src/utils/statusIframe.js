import { getOrigin } from './getOrigin.js'
import { createPromise } from './createPromise.js'
import { get } from './get.js'

const ERROR = 'error'
const CHANGED = 'changed'
const UNCHANGED = 'unchanged'

const TITLE = 'oidc-status-iframe'

export class StatusIframe {
  constructor (client) {
    this.client = client
    this.endpoints = client.endpoints
    this.iframe = null
    this.iframeOrigin = null
    this.callbackList = []
  }

  origin () {
    const authUrl = this.endpoints.authorize()
    return (authUrl.charAt(0) === '/')
      ? getOrigin()
      : authUrl.substring(0, authUrl.indexOf('/', 8))
  }

  async setup () {
    const promise = createPromise()
    const { statusIframe } = this.client.options

    if (this.iframe || !statusIframe) {
      return promise.resolve()
    }

    const iframe = this.iframe = document.createElement('iframe')

    const handleLoad = () => {
      this.iframeOrigin = this.origin()
      promise.resolve()
    }
    iframe.addEventListener('load', handleLoad)

    const src = this._endpoints.checkSessionIframe()
    iframe.setAttribute('src', src)
    iframe.setAttribute('title', TITLE)
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const messageCallback = (event) => {
      const { iframe, iframeOrigin, callbackList } = this

      if ((event.origin !== iframeOrigin) ||
          (iframe.contentWindow !== event.source)) {
        return
      }

      if (!(event.data === UNCHANGED ||
            event.data === CHANGED ||
            event.data === ERROR)
      ) {
        return
      }

      if (event.data !== UNCHANGED) {
        this.client.clearToken()
      }

      // copy and empty callbackList
      const callbacks = callbackList.splice(0, callbackList.length - 1)

      for (let i = callbackList.length - 1; i >= 0; --i) {
        const promise = callbacks[i]
        if (event.data === ERROR) {
          promise.reject(new Error('status iframe error'))
        } else {
          promise.resolve(event.data === UNCHANGED)
        }
      }
    }

    window.addEventListener('message', messageCallback, false)

    return promise
  }

  schedule () {
    const { statusIframe, statusIframeInterval } = this.client.options

    if (statusIframe && get(this.client, 'tokens.token')) {
      setTimeout(() => {
        this.check().then((unchanged) => {
          if (unchanged) {
            this.schedule()
          }
        })
      }, statusIframeInterval * 1000)
    }
  }

  async check () {
    const promise = createPromise()
    const { iframe, iframeOrigin, callbackList } = this
    const { clientId } = this.options
    const { sessionState } = get(this.client, 'tokens.tokenParsed.session_state', '')

    if (iframe && iframeOrigin) {
      const msg = `${clientId} ${sessionState}`
      callbackList.push(promise)
      if (callbackList.length === 1) {
        iframe.contentWindow.postMessage(msg, iframeOrigin)
      }
    } else {
      promise.resolve()
    }

    return promise
  }
}
