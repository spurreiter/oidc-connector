
export class Adapter {
  constructor (options) {
    this.options = options
  }

  initialize (client) {
    this.endpoints = client.endpoints
  }

  redirectUri () {
    return this.options.redirectUri || location.href
  }

  async login () {
    const url = this.endpoints.createLoginUrl(this.options)
    window.location.replace(url)
  }

  async logout () {
    const url = this.endpoints.createLogoutUrl(this.options)
    window.location.replace(url)
  }

  async register () {
    const url = this.endpoints.createRegisterUrl(this.options)
    window.location.replace(url)
  }

  async accountManagement () {
    var url = this.endpoints.createAccountUrl()
    if (url) {
      window.location.href = url
    } else {
      throw new Error('Not supported by the OIDC server')
    }
  }
}
