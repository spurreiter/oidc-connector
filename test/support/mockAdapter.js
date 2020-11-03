import request from 'superagent'

export class MockAdapter {
  _isInitialized () {
    if (!this.options) throw new Error('adapter not initialized')
  }

  initialize (client) {
    this.client = client
    this.endpoints = client.endpoints
    this.options = client.options
  }

  redirectUri () {
    const url = new URL(location.href)
    url.search = url.hash = ''
    return this.options.redirectUri || url.toString()
  }

  async login (opts) {
    this._isInitialized()
    const url = await this.endpoints.createLoginUrl({ ...this.options, ...opts })
    return request.get(url)
      .redirects(0)
      .catch(err => {
        const res = err.response
        return res.headers.location
      })
  }

  async logout () {
    console.log('logout', new Error())
  }
}
