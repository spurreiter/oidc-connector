import { createPromise, debouncePromises } from './createPromise.js'
import { createIframe } from './createIframe.js'

const ERROR = 'error'
const CHANGED = 'changed'
const UNCHANGED = 'unchanged'

const TITLE = 'oidc-status-iframe'

export class StatusIframe {
  constructor (client) {
    const { statusIframe, statusIframeInterval } = client.options
    this.client = client
    this.endpoints = client.endpoints
    this.iframe = null
    this.iframeOrigin = null
    this.debounce = debouncePromises()
    this.enabled = statusIframe
    this.interval = statusIframeInterval * 1000
  }

  origin () {
    const authUrl = this.endpoints.authorize()
    return (authUrl.charAt(0) === '/')
      ? window.location.origin
      : authUrl.substring(0, authUrl.indexOf('/', 8))
  }

  disable () {
    this.enabled = false
  }

  async setup () {
    if (this.iframe || !this.enabled) {
      return
    }
    const promise = createPromise()

    const src = this.endpoints.checkSessionIframe()
    const iframe = this.iframe = createIframe({ src, title: TITLE })

    const handleLoad = () => {
      this.iframeOrigin = this.origin()
      promise.resolve()
    }
    iframe.addEventListener('load', handleLoad)

    const messageCallback = (event) => {
      if ((event.origin !== this.iframeOrigin) ||
          (this.iframe.contentWindow !== event.source)) {
        return
      }

      if (![UNCHANGED, CHANGED, ERROR].includes(event.data)) {
        return
      }

      if (event.data === ERROR) {
        this.debounce.rejectAll(new Error('status iframe'))
      } else {
        this.debounce.resolveAll(event.data === UNCHANGED)
      }
    }

    window.addEventListener('message', messageCallback, false)
    return promise
  }

  schedule () {
    if (this.enabled && this.client.tokens.authenticated) {
      setTimeout(async () => {
        const unchanged = await this.check()
        if (unchanged) {
          this.schedule()
        }
      }, this.interval)
    }
  }

  async check () {
    if (!this.enabled || !this.iframe || !this.iframeOrigin) {
      return
    }
    const promise = createPromise()
    const { clientId } = this.options
    const sessionState = this.client.tokens.sessionState()

    const msg = `${clientId} ${sessionState}`
    if (this.debounce.push(promise)) {
      this.iframe.contentWindow.postMessage(msg, this.iframeOrigin)
    }
    return promise
  }
}
