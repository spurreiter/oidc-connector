import request from 'superagent'

class MockStatusCreateIframe {
  constructor (opts) {
    this._opts = opts
    this.pos = -1
    this.count = 0
  }

  async create (origin, onLoad, nextOrigin) {
    if (onLoad) {
      this.origin = nextOrigin || origin
      onLoad()
    }
  }

  addListener (handleMessage) {
    this._handleMsg = (ev) => {
      this.count++
      handleMessage(ev)
    }
  }

  postMessage (msg) {
    setTimeout(() => {
      const { status } = this._opts
      this.pos = Math.min(this.pos + 1, status.length - 1)
      const data = status[this.pos]
      this._handleMsg({ data })
      if (data === 'ignore') {
        this.postMessage(msg)
      }
    })
  }

  removeListener () {
  }
}
export const mockStatusCreateIframe = opts => new MockStatusCreateIframe(opts)

class MockSilentLoginCreateIframe {
  constructor (opts) {
    this._opts = opts
  }

  async create (origin) {
    const { error, src } = this._opts
    if (error) {
      this._ev = { data: `${origin}#error=${error}&state='000-000-000'` }
      return
    }
    return await request.get(src)
      .redirects(0)
      .catch(err => {
        const res = err.response
        this._ev = { data: res.headers.location }
      })
  }

  load (url) {
    throw new Error('not used')
  }

  addListener (handleMessage) {
    handleMessage(this._ev)
  }

  postMessage (msg) {
    throw new Error('not used')
  }

  removeListener () {
  }
}
export const mockSilentLoginCreateIframe = opts => new MockSilentLoginCreateIframe(opts)
