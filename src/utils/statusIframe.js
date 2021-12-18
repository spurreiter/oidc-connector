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
    this.mock = undefined
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

    const url = this.client.endpoints.authorize()
    const nextOrigin = (url.charAt(0) === '/')
      ? window.location.origin
      : url.substring(0, url.indexOf('/', 8))

    this.iframe = (this.mock || createIframe)({ src, title: TITLE })
    await this.iframe.create(null, () => promise.resolve(), nextOrigin)

    const handleMessage = (ev) => {
      if (![UNCHANGED, CHANGED, ERROR].includes(ev.data)) {
        return
      }

      this.log.info('statusIframe "%s"', ev.data)
      if (ev.data === ERROR) {
        this.disable()
      }

      this.debounce.resolveAll(ev.data)
    }

    this.iframe.addListener(handleMessage)

    return promise
  }

  async check () {
    const promise = createPromise()

    const { enabled, iframe } = this
    const { clientId } = this.client.options
    const sessionState = this.client.tokens.sessionState()

    if (enabled && iframe && iframe.origin && clientId && sessionState) {
      if (this.debounce.push(promise)) {
        this.log.info('statusIframe check "%s" "%s"', clientId, sessionState)
        const msg = `${clientId} ${sessionState}`
        this.iframe.postMessage(msg)
      }
    } else {
      this.log.info('statusIframe disabled %o', {
        enabled,
        iframe,
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
      const status = await this.check()
      if (status === UNCHANGED) {
        this._schedule()
      } else {
        // if checking for first time it is assumed that 3rd party
        // cookies are blocked and the session check may result in an CHANGED
        // or ERROR event dependent of the choosen implementation.
        // Logout shall be handled by forced token refresh in such cases.
        // Such session status management is silenty disabled at 1st time
        // if status == ERROR or CHANGED
        this.log.info('statusIframe disables at 1st check "%s"', status)
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
