import { uuid4, createUrl } from './utils/index.js'

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
      scope,
      useNonce,
      maxAge,
      loginHint,
      idpHint,
      action,
      locale,
      pkceMethod,
      authorizationParams
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

    const query = {
      ...authorizationParams,
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      response_mode: responseMode,
      response_type: responseType,
      scope,
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

    return createUrl(baseUrl, query)
  }

  async createRegisterUrl (options) {
    return this.createLoginUrl({ ...options, action: 'register' })
  }

  async createLogoutUrl (options, { idToken }) {
    const { redirectUri, postLogoutRedirectUri } = options
    const url = this.logout()
    if (!url) throw new Error('no end_session_endpoint')
    const query = {
      post_logout_redirect_uri: postLogoutRedirectUri || redirectUri,
      id_token_hint: idToken
    }
    return createUrl(url, query)
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
    const url = this.oidcConfig.end_session_endpoint
    return url
  }

  checkSessionIframe () {
    // may be undefined
    return this.oidcConfig.check_session_iframe
  }

  userinfo () {
    // may be undefined
    const url = this.oidcConfig.userinfo_endpoint
    if (!url) throw new Error('no userinfo_endpoint')
    return url
  }

  register () {
    let url = this.oidcConfig.userRegistrationEndpoint
    if (!url && this._maybeKeycloak()) {
      url = this.authorize().replace(/\/[^/]+$/, '/registrations')
    }
    if (!url) throw new Error('no register endpoint')
    return url
  }

  account () {
    let url = this.oidcConfig.userAccountEndpoint
    if (!url && this._maybeKeycloak()) {
      url = `${this.serverUrl}/account`
    }
    if (!url) throw new Error('no account endpoint')
    return url
  }
}

export const endpoints = (serverUrl, oidcConfig, callback) =>
  new Endpoints(serverUrl, oidcConfig, callback)
