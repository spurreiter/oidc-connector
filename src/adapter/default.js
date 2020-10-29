
export class Adapter {
  initialize (client) {
    this.client = client
    this.endpoints = client.endpoints
    this.options = client.options
  }

  _isInitialized () {
    if (!this.options) throw new Error('adapter not initialized')
  }

  redirectUri () {
    return this.options.redirectUri || location.href
  }

  async login () {
    this._isInitialized()
    const url = await this.endpoints.createLoginUrl(this.options)
    window.location.replace(url)
  }

  async register () {
    this._isInitialized()
    const url = await this.endpoints.createRegisterUrl(this.options)
    window.location.replace(url)
  }

  async logout () {
    this._isInitialized()
    const url = await this.endpoints.createLogoutUrl(this.options)
    window.location.replace(url)
  }

  async account () {
    this._isInitialized()
    const url = await this.endpoints.createAccountUrl()
    if (url) {
      window.location.href = url
    } else {
      throw new Error('Not supported by the OIDC server')
    }
  }
}
