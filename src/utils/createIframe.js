const MESSAGE = 'message'

class CreateIframe {
  constructor (opts) {
    this._opts = opts
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
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
  }

  addListener (handleMessage) {
    this._handleMsg = (ev) => {
      if ((event.origin !== this.origin) ||
          (this._iframe.contentWindow !== event.source)) {
        return
      }
      handleMessage(ev)
    }
    window.addEventListener(MESSAGE, this._handleMsg)
  }

  postMessage (msg) {
    this._iframe.contentWindow.postMessage(msg, this.origin)
  }

  removeListener () {
    window.removeEventListener(MESSAGE, this._handleMsg)
    document.body.removeChild(this._iframe)
  }
}

export const createIframe = opts => new CreateIframe(opts)
