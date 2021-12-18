import { NONE } from '../constants.js'

const MESSAGE = 'message'

class CreateIframe {
  constructor (opts) {
    this._opts = opts
    this._iframe = null
    this._handleMsg = undefined
  }

  async create (origin, onLoad, nextOrigin) {
    this.origin = origin
    const { src, title } = this._opts
    const iframe = this._iframe = document.createElement('iframe')
    if (onLoad) {
      iframe.addEventListener('load', () => {
        this.origin = nextOrigin || origin
        onLoad()
      })
    }
    iframe.setAttribute('src', src)
    iframe.setAttribute('title', title)
    iframe.style.display = NONE
    document.body.appendChild(iframe)
  }

  addListener (handleMessage) {
    this._handleMsg = (ev) => {
      if ((ev.origin !== this.origin) ||
        (this._iframe && this._iframe.contentWindow !== ev.source)) {
        return
      }
      handleMessage(ev)
    }
    window.addEventListener(MESSAGE, this._handleMsg)
  }

  postMessage (msg) {
    if (!this._iframe || !this._iframe.contentWindow) return
    this._iframe.contentWindow.postMessage(msg, this.origin)
  }

  removeListener () {
    if (this._handleMsg) window.removeEventListener(MESSAGE, this._handleMsg)
    if (this._iframe) document.body.removeChild(this._iframe)
  }
}

export const createIframe = opts => new CreateIframe(opts)
