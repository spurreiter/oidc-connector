import { createPromise, debouncePromises } from './createPromise.js'
import { createIframe } from './createIframe.js'
import {
  CHANGED,
  UNCHANGED,
  ERROR
} from '../constants.js'

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
    const promise = createPromise()

    if (this.iframe || !this.enabled) {
      promise.resolve()
      return promise
    }

    const src = this.client.endpoints.checkSessionIframe()
    if (!src) {
      this.log.info('no check_session_iframe')
      this.disable()
      promise.resolve()
      return promise
    }

    const iframe = this.iframe = createIframe({ src, title: TITLE })

    const handleLoad = () => {
      this.iframeOrigin = this.origin()
      promise.resolve()
    }
    iframe.addEventListener('load', handleLoad)

    const handleMessage = (event) => {
      if ((event.origin !== this.iframeOrigin) ||
          (this.iframe.contentWindow !== event.source)) {
        return
      }

      if (![UNCHANGED, CHANGED, ERROR].includes(event.data)) {
        return
      }

      this.log.info('statusIframe "%s"', event.data)
      if (event.data === ERROR) {
        this.disable()
      }

      this.debounce.resolveAll(event.data)
    }

    window.addEventListener('message', handleMessage, false)

    return promise
  }

  async check () {
    const promise = createPromise()

    const { enabled, iframe, iframeOrigin } = this
    const { clientId } = this.client.options
    const sessionState = this.client.tokens.sessionState()

    if (enabled && iframe && iframeOrigin && clientId && sessionState) {
      if (this.debounce.push(promise)) {
        this.log.info('statusIframe check "%s" "%s"', clientId, sessionState)
        const msg = `${clientId} ${sessionState}`
        this.iframe.contentWindow.postMessage(msg, this.iframeOrigin)
      }
    } else {
      this.log.info('statusIframe disabled %o', {
        enabled,
        iframe,
        iframeOrigin,
        clientId,
        sessionState
      })
      this.disable()
      promise.resolve(ERROR)
    }

    return promise
  }

  _schedule () {
    if (this.enabled && !this.timerId) {
      this.timerId = setTimeout(async () => {
        this.timerId = null
        try {
          const status = await this.check()
          if (status === UNCHANGED) {
            this._schedule()
            return
          }
        } catch (e) {}
        // start logout if ERROR or CHANGED
        this.client._handleLogout()
      }, this.interval)
    }
  }

  async schedule () {
    const needsFirstCheck = !this.iframe

    await this.setup()
    if (!this.enabled) return

    if (needsFirstCheck) {
    // first check - ignore first error as this might be due to blocked 3rd party cookies
      const status = await this.check()
      if (status === UNCHANGED) {
        this._schedule()
      } else {
        if (status === CHANGED) {
          this.client._handleLogout()
        }
        // silently disable for 1st time if status == ERROR
        this.disable()
      }
    } else {
      this._schedule()
    }
  }

  clearSchedule () {
    clearTimeout(this.timerId)
    this.timerId = null
  }
}
