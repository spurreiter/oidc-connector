type ResponseMode = 'query'|'fragment';
type ResponseType = 'code'|'id_token token'|'code id_token token';
type PkceMethod = 'S256';

type Url = string;

/**
 * Standard data is taken from `.well-known/oidc-configuration` endpoint
 * non-standard settings can be named here.
 */
interface OidcConfig {
  /** issuer url shall be the same as `url` */
  issuer?: Url;
  /** certificates endpoint */
  jwks_uri?: Url;
  /** authorization endpoint */
  authorization_endpoint?: Url;
  /** token endpoint */
  token_endpoint?: Url;
  /** userinfo endpoint */
  userinfo_endpoint?: Url;
  /** logout endpoint */
  end_session_endpoint?: Url;
  /** session management endpoint */
  check_session_iframe?: Url;
  // --- non standard extensions ---
  /** non-standard registration endpoint */
  register_endpoint?: Url;
  /** non-standard account endpoint */
  account_endpoint?: Url;
}

interface Options {
  /**
   * URL to the OIDC server
   */
  url: string;
  /**
   * Name of the realm
   * @example 'myrealm'
   */
  realm?: string;
  /**
   * Client identifier example: 'my-app'
   */
  clientId: string;
  /**
   * Specifies a default uri to redirect to after login or logout.
   */
  redirectUri?: Url;
  /**
   * Specifies a default uri to redirect to after logout.
   * if not specified than value from `redirectUri` is used.
   */
  postLogoutRedirectUri?: Url;
  /**
   * calls login on client initialization if no valid tokens are present
   * @default false
   */
  forceLogin?: boolean;
  /**
   * calls logout if event 'logout' was emitted.
   * @default true
   */
  forceLogout?: boolean;
  /**
   * OpenID Connect scopes.
   * Scope `openid` is always added per default.
   */
  scope?: string|string[];
  /**
   * Adds a [cryptographic nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)
   * to verify that the authentication response matches the request.
   * @default true
   */
  useNonce?: boolean;
  /**
   * Uses localStorage to store received tokens.
   * @default true
   */
  useLocalStorage: boolean;
  /**
   * minimum validity of an access_token before expiry.
   * If expiry is less than minValidity new access_token is requested using a
   * refresh_token.
   * @default 15
   */
  minValidity?: number;
  /**
   * timer interval (in seconds) to check if token needs update
   * @default 5
   */
  expiryInterval?: number;
  /**
   * Set the OpenID Connect response mode upon login.
   * @default fragment After successful authentication the OIDC server will
   *                   redirect to JavaScript application with OpenID Connect
   *                   parameters added in URL fragment. This is generally safer
   *                   and recommended over 'query'.
   */
  responseMode?: ResponseMode;
  /**
   * Set the OpenID Connect response type upon login
   * @default code
   */
  responseType?: ResponseType;
  /**
   * Set the OpenID Connect flow.
   * @default standard
   */
  flow?: 'standard'|'implicit'|'hybrid';
  /**
   * Configures the Proof Key for Code Exchange (PKCE) method to use.
   * The currently allowed method is 'S256'.
   * If not configured, PKCE will not be used.
   */
  pkceMethod?: PkceMethod;
  /**
   * external function which implements the PKCE
   * If not configured, PKCE will not be used.
   */
  pkce?: (pkceMethod: PkceMethod) => { codeVerifier: string, challenge: string };
  /**
   * Set to enable/disable session monitoring login state.
   * @default true
   */
  useStatusIframe?: boolean;
  /**
   * Set the interval to check login state (in seconds).
   * @default 5
   */
  statusIframeInterval?: number;
  /**
   * define a custom adapter e.g. for use with cordova
   * @default as defined in adapters/default.js
   */
  adapter?: Adapter;
  /**
   * Set an initial value for the token.
   */
  token?: string;
  /**
   * Set an initial value for the refresh token.
   */
  refreshToken?: string;
  /**
   * Set an initial value for the id token
   */
  idToken?: string;
  /**
   * Specifies an uri to redirect to after silent check-sso.
   * Silent check-sso will only happen, when this redirect uri is given and
   * the specified uri is available whithin the application.
   */
  silentCheckSsoRedirectUri?: string;
  /**
   * Specifies whether the silent check-sso should fallback to "non-silent"
   * check-sso when 3rd party cookies are blocked by the browser. Defaults
   * to true.
   */
  silentCheckSsoFallback?: boolean;
  /**
   * log output using `log.info` and `log.error`
   * example: {log: console, ...}
   */
  log?: Logger;
  /**
   * By default the login screen is displayed if the user is not logged in.
   * To only authenticate to the application if the user is already
   * logged in and not display the login page if the user is not logged in, set
   * this option to `'none'`. To always require re-authentication and ignore
   * SSO, set this option to `'login'`.
   */
  prompt?: 'none'|'login';
  /**
   * Used just if user is already authenticated. Specifies maximum time since
   * the authentication of user happened. If user is already authenticated for
   * longer time than `'maxAge'`, the SSO is ignored and he will need to
   * authenticate again.
   */
  maxAge?: number;
  /**
   * Used to pre-fill the username/email field on the login form.
   */
  loginHint?: string;
  /**
   * Used to tell then OIDC server which Identity Provider (IDP) the user wants
   * to authenticate with. Needs to be supported by OIDC server
   */
  idpHint?: string;
  /**
   * Sets the 'ui_locales' query param in compliance with section 3.1.2.1
   * of the OIDC 1.0 specification.
   */
  locale?: string;
}

/**
 * logger with log levels. Uses '%s' microformat options
 * Either use with `console` or [debug](https://www.npmjs.com/package/debug)
 */
interface Logger {
  /** logs info messages */
  info?: (...args: any) => void;
  /** logs error messages */
  error?: (...args: any) => void;
}

export class Adapter {
  constructor (opts?: object);
  initialize(client: Client): any;
  /**
   * return default redirect uri
   */
  redirectUri(): string;
  /**
   * start login
   */
  login(): Promise<undefined>;
  /**
   * start logout
   */
  logout(): Promise<undefined>;
  /**
   * Start login with register
   * May not be supported on all OIDC servers.
   * Uses `/registrations` endpoint which needs to be accessible on same level as
   * authorization endpoint.
   * E.g. authorization_endpoint is https://oidcserver/auth/authorize then
   * https://oidcserver/auth/registrations is used
   * May be overwritten in client options using oidcConfig.register_endpoint
   */
  register(): Promise<undefined>;
  /**
   * access account information
   * May not be supported on all OIDC servers.
   * Uses `./account` endpoint relative to `url`
   * E.g. url = https://oidcserver/auth then https://oidcserver/auth/account is
   * used.
   * May be overwritten in client options using oidcConfig.account_endpoint
   */
  account(): Promise<undefined>;
}

type eventName = 'token'|'error'|'logout'|'action'

export class Client {
  constructor (options: Options);
  /**
   * initialize the client. Needs to be called on page load.
   */
  init () : Promise<any>;
  /**
   * adds listener to eventName
   */
  on (eventName: eventName, listener: Function) : void;
  /**
   * removes listener to eventName
   */
  off (eventName: eventName, listener: Function) : void;
  /**
   * starts login
   */
  login () : Promise<any>;
  /**
   * starts silent login
   */
  silentLogin () : Promise<any>;
  /**
   * starts logout
   */
  logout (): Promise<any>;
  /**
   * starts registration
   */
  register (): Promise<any>;
  /**
   * redirects to account management
   */
  account (): Promise<any>;
}
