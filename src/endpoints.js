import { uuid4, clearUrl, createUrl } from './utils/index.js'

const OPENID = 'openid'

class EndpointsBase {
  constructor (realmUrl) {
    if (!realmUrl) throw new Error('realmUrl required')
    this.realmUrl = clearUrl(realmUrl)
  }

  getRealmUrl () {
    return this.realmUrl
  }

  async createLoginUrl (options, callback) {
    var state = uuid4()
    var nonce = uuid4()

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

    const callbackState = {
      state,
      nonce,
      redirectUri: encodeURIComponent(redirectUri),
      expires: new Date().getTime() + 60000
    }

    if (prompt) {
      callbackState.prompt = prompt
    }

    const baseUrl = action === 'register'
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
    if (action && action !== 'register') {
      query.action = action
    }
    if (pkceMethod && options.pkce) {
      const { codeVerifier, challenge } = await options.pkce(pkceMethod)
      callbackState.pkceCodeVerifier = codeVerifier
      query.code_challenge = challenge
      query.code_challenge_method = pkceMethod
    }

    callback.store(callbackState)

    return createUrl(baseUrl, query)
  }

  async createRegisterUrl (options, callback) {
    const options_ = { ...options, action: 'register' }
    return this.createLoginUrl(options_, callback)
  }

  async createLogoutUrl (options) {
    const { redirectUri, postLogoutRedirectUri } = options
    return createUrl(this.logout(), {
      redirect_uri: postLogoutRedirectUri || redirectUri
    })
  }

  async createAccountUrl (options) {
    const { clientId, redirectUri } = options
    var realmUrl = this.getRealmUrl()
    return createUrl(`${realmUrl}/account`, {
      referrer: clientId,
      referrer_uri: redirectUri
    })
  }

  createTokenUrl (query) {
    return createUrl(this.token(), query)
  }
}

export class EndpointsRealm extends EndpointsBase {
  constructor (realmUrl) {
    super(realmUrl)
    this.baseUrl = `${this.realmUrl}/protocol/openid-connect`
  }

  authorize () {
    return `${this.baseUrl}/auth`
  }

  token () {
    return `${this.baseUrl}/token`
  }

  logout () {
    return `${this.baseUrl}/logout`
  }

  checkSessionIframe () {
    return `${this.baseUrl}/login-status-iframe.html`
  }

  thirdPartyCookiesIframe () {
    return `${this.baseUrl}/3p-cookies/step1.html`
  }

  register () {
    return `${this.baseUrl}/registrations`
  }

  userinfo () {
    return `${this.baseUrl}/userinfo`
  }
}

export class EndpointsOicd extends EndpointsBase {
  constructor (realmUrl, oidcConfig) {
    super(realmUrl)
    if (!oidcConfig) throw new Error('oidcConfig required')
    this.oidcConfig = oidcConfig
  }

  authorize () {
    return this.oidcConfig.authorization_endpoint
  }

  token () {
    return this.oidcConfig.token_endpoint
  }

  logout () {
    if (!this.oidcConfig.end_session_endpoint) {
      throw new Error('Not supported by the OIDC server')
    }
    return this.oidcConfig.end_session_endpoint
  }

  checkSessionIframe () {
    if (!this.oidcConfig.check_session_iframe) {
      throw new Error('Not supported by the OIDC server')
    }
    return this.oidcConfig.check_session_iframe
  }

  thirdPartyCookiesIframe () {
    throw new Error('Not supported by the OIDC server')
  }

  register () {
    throw new Error('Redirection to "Register user" page not supported in standard OIDC mode')
  }

  userinfo () {
    if (!this.oidcConfig.userinfo_endpoint) {
      throw new Error('Not supported by the OIDC server')
    }
    return this.oidcConfig.userinfo_endpoint
  }
}

export function endpoints (realmUrl, oidcConfig) {
  return (typeof oidcConfig === 'object' && oidcConfig.token_endpoint)
    ? new EndpointsOicd(realmUrl, oidcConfig)
    : new EndpointsRealm(realmUrl)
}
