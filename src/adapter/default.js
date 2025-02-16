export class Adapter {
  initialize(client) {
    this.client = client
    this.endpoints = client.endpoints
    this.options = client.options
  }

  _isInitialized() {
    if (!this.options) throw new Error('adapter not initialized')
  }

  redirectUri() {
    const url = new URL(location.href)
    url.search = url.hash = ''
    return this.options.redirectUri || url.toString()
  }

  async login(opts) {
    this._isInitialized()
    const url = await this.endpoints.createLoginUrl({
      ...this.options,
      ...opts
    })
    window.location.replace(url)
  }

  async register() {
    this._isInitialized()
    const url = await this.endpoints.createRegisterUrl(this.options)
    window.location.replace(url)
  }

  async logout({ idToken }) {
    this._isInitialized()
    const url = await this.endpoints.createLogoutUrl(this.options, { idToken })
    window.location.replace(url)
  }

  async account() {
    this._isInitialized()
    const url = await this.endpoints.createAccountUrl(this.options)
    if (url) {
      window.location.href = url
    } else {
      throw new Error('Not supported by the OIDC server')
    }
  }
}
