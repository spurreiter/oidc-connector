import { uuid4, createUrl } from './utils/index.js'

const OPENID = 'openid'

export class Endpoints {
  constructor (serverUrl, oidcConfig, callback) {
    if (!oidcConfig ||
        !oidcConfig.authorization_endpoint ||
        !oidcConfig.token_endpoint) {
      throw new Error('oidcConfig required')
    }
    this.serverUrl = serverUrl
    this.oidcConfig = oidcConfig
    this.callback = callback
  }

  _maybeKeycloak () {
    return this.token().includes('/realms/')
  }

  async createLoginUrl (options) {
    const state = uuid4()
    const nonce = uuid4()

    const {
      clientId,
      responseMode,
      responseType,
      redirectUri,
      prompt,
      scope: scope_,
      useNonce,
      maxAge,
      loginHint,
      idpHint,
      action,
      locale,
      pkceMethod
    } = options

    const doRegister = action === 'register'

    const callbackState = {
      state,
      nonce,
      redirectUri,
      expires: new Date().getTime() + 60000
    }

    if (prompt) {
      callbackState.prompt = prompt
    }

    const baseUrl = doRegister
      ? this.register()
      : this.authorize()

    const scope = (
      !scope_
        ? []
        : typeof scope_ === 'string'
          ? scope_.split(' ')
          : scope_
    ).filter(Boolean)

    if (!scope.includes(OPENID)) {
      scope.unshift(OPENID)
    }

    const query = {
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state,
      response_mode: responseMode,
      response_type: responseType,
      scope: scope.join(' '),
      prompt,
      max_age: maxAge,
      login_hint: loginHint,
      kc_idp_hint: idpHint,
      ui_locales: locale
    }
    if (useNonce) {
      query.nonce = nonce
    }
    if (action && !doRegister) {
      query.action = action
    }
    if (pkceMethod && options.pkce) {
      const { codeVerifier, challenge } = await options.pkce(pkceMethod)
      callbackState.pkceCodeVerifier = codeVerifier
      query.code_challenge = challenge
      query.code_challenge_method = pkceMethod
    }

    this.callback.store(callbackState)
    console.log(baseUrl, query)
    return createUrl(baseUrl, query)
  }

  async createRegisterUrl (options) {
    return this.createLoginUrl({ ...options, action: 'register' })
  }

  async createLogoutUrl (options) {
    const { redirectUri, postLogoutRedirectUri } = options
    return createUrl(this.logout(), {
      redirect_uri: postLogoutRedirectUri || redirectUri
    })
  }

  async createAccountUrl (options) {
    const { clientId, redirectUri } = options
    const url = this.account()
    return createUrl(url, {
      referrer: clientId,
      referrer_uri: redirectUri
    })
  }

  createTokenUrl (query) {
    return createUrl(this.token(), query)
  }

  authorize () {
    return this.oidcConfig.authorization_endpoint
  }

  token () {
    return this.oidcConfig.token_endpoint
  }

  logout () {
    // may be undefined
    return this.oidcConfig.end_session_endpoint
  }

  checkSessionIframe () {
    // may be undefined
    return this.oidcConfig.check_session_iframe
  }

  /*
  checkThirdPartyCookiesIframe () {
    // not defined in standard OIDC mode
    let url = this.oidcConfig.check_3pcookies_iframe
    if (!url && this._maybeKeycloak()) {
      url = this.authorize().replace(/\/[^/]+$/, '/3p-cookies/step1.html')
    }
    return url
  }
  */

  register () {
    // not defined in standard OIDC mode
    let url = this.oidcConfig.register_endpoint
    if (!url && this._maybeKeycloak()) {
      url = this.authorize().replace(/\/[^/]+$/, '/registrations')
    }
    if (!url) throw new Error('no register_endpoint')
    return url
  }

  account () {
    // not defined in standard OIDC mode
    let url = this.oidcConfig.account_endpoint
    if (!url && this._maybeKeycloak()) {
      url = `${this.serverUrl}/account`
    }
    if (!url) throw new Error('no account_endpoint')
    return url
  }

  userinfo () {
    // may be undefined
    return this.oidcConfig.userinfo_endpoint
  }
}

export const endpoints = (serverUrl, oidcConfig, callback) =>
  new Endpoints(serverUrl, oidcConfig, callback)
