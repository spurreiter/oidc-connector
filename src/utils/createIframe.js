const MESSAGE = 'message'

class CreateIframe {
  constructor (opts) {
    this._opts = opts
  }

  async create (origin) {
    this.origin = origin
    const { src, title } = this._opts
    const iframe = this._iframe = document.createElement('iframe')
    iframe.setAttribute('src', src)
    iframe.setAttribute('title', title)
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
  }

  load (url) {
    return new Promise(resolve => {
      const origin = (url.charAt(0) === '/')
        ? window.location.origin
        : url.substring(0, url.indexOf('/', 8))

      this._iframe.addEventListener('load', () => {
        this.origin = origin
        resolve()
      })
    })
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
