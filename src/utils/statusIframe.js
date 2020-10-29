import { createPromise, debouncePromises } from './createPromise.js'
import { createIframe } from './createIframe.js'

const ERROR = 'error'
const CHANGED = 'changed'
const UNCHANGED = 'unchanged'

const TITLE = 'oidc-status-iframe'

// https://openid.net/specs/openid-connect-session-1_0.html
export class StatusIframe {
  constructor (client) {
    const { useStatusIframe, statusIframeInterval, log } = client.options
    this.client = client
    this.iframe = null
    this.iframeOrigin = null
    this.debounce = debouncePromises()
    this.enabled = useStatusIframe
    this.interval = statusIframeInterval * 1000
    this.log = log
  }

  origin () {
    const authUrl = this.client.endpoints.authorize()
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

    const src = this.client.endpoints.checkSessionIframe()
    if (!src) {
      this.log.info('no check_session_iframe')
      this.disable()
      promise.resolve()
      return
    }
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

      this.log.info('statusIframe "%s"', event.data)

      if (![UNCHANGED, CHANGED, ERROR].includes(event.data)) {
        return
      }

      if (event.data === ERROR) {
        this.disable()
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
        try {
          const unchanged = await this.check()
          if (unchanged) {
            this.schedule()
          } else {
            this.client._handleLogout()
          }
        } catch (e) {}
      }, this.interval)
    }
  }

  async check () {
    if (!this.enabled || !this.iframe || !this.iframeOrigin) {
      return
    }
    const promise = createPromise()
    const { clientId } = this.client.options
    const sessionState = this.client.tokens.sessionState()

    const msg = `${clientId} ${sessionState}`
    if (this.debounce.push(promise)) {
      this.iframe.contentWindow.postMessage(msg, this.iframeOrigin)
    }
    return promise
  }
}
