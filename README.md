[![Build Status](https://github.com/spurreiter/oidc-connector/workflows/CI/badge.svg?branch=main&event=push)](https://github.com/spurreiter/oidc-connector/actions/workflows/ci.yml?query=branch%3Amain)
[![npm version](https://badge.fury.io/js/oidc-connector.svg)](https://www.npmjs.com/package/oidc-connector)
[![Downloads per month](https://img.shields.io/npm/dm/oidc-connector)](https://www.npmjs.com/package/oidc-connector)


# oidc-connector

- [OpenID Connect][] connector/ client for modern browsers.
- Configuration uses `./well-known/oidc-configuration` provided by OIDC servers.
- Extensive test-set
- Easy configuration
- Event based API

Features

- Minified ~23kB in size
- No external dependencies
- Supports standard, hybrid and implicit authentication flow.
- Native Promise based
- Session management
- Optional PKCE authorization flow
- Silent login
- Tokens are refreshed automatically; No need to take care on expiry timestamps.
- Support for custom adapters (default is browser, package comes bundled with
  cordova and cordova-native adapter)
- Supports multiple tokens from different client-ids in the frontend

Verified to work with following OIDC servers/ services

- [Auth0](https://auth0.com)
- [authentik](https://goauthentik.io/)
- [fusionauth](https://fusionauth.io)
- [keycloak][]
- [oidc-provider](https://github.com/panva/node-oidc-provider)
- [okta](https://okta.com)
- [OpenAM](https://www.openidentityplatform.org/openam)
- [ory/hydra](https://www.ory.sh/hydra/)

<small>*) If you have successfully used this client with other OIDC Servers
please let us know through a PR or Issue.</small>

See example application for testing at `./example`. Start with `npm run example`.


## Usage

```js
import Client from 'oidc-connector'

const client = new Client({
  url: 'http://localhost:8080/auth',
  clientId: 'my-app'
})

// subscribe to events
client.on('token', ({token, tokenParsed}) => {
  if (!token) {
    startSilentLogin()
    // alternatively you may use
    // startLogin()
  } else {
    // do sth. with the tokens
  }
})
client.on('logout', () => {
  // option `forceLogout` is set to true by default; No need to react here
})
client.on('error', (err) => {
  // get notified on errors
})
client.on('action', ({status}) => {
  // subscribe to actions
  // see https://github.com/keycloak/keycloak-community/blob/main/design/application-initiated-actions.md
})

// always initialize on page load!!!
await client.init().catch(err => {
  // react here on initialisation errors; error is also emitted as event
  startLogin()
})

/**
 * Starts login procedure
 * User will always be prompted for credentials.
 */
const startLogin = () => {
  client.login().catch(err => {
    // react here on login errors; error is also emitted as event
  })
}

/**
 * Silent login checks via iframe if auth session exists.
 * Requires option `silentLoginRedirectUri` with server side redirect page.
 * May be blocked if 3rd party cookies are rejected by browser.
 * The below snippet tries to login a user silently (assuming user is
 * already logged-in) at first to later redirect to the auth server for final login.
 */
const startSilentLogin = () => {
  client.silentLogin({prompt: 'none'}).catch(err => {
    if (err.message === 'login_required') {
      startLogin ()
    }
  })
}
```

for later using the token in communications (e.g. RESTful)

```js
const token = await client.accessToken()
const res = await fetch('http://example.org', {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
})
const body = await res.json()
if (res.status === 200) {
  // handle response
} else {
  // handle error response
}
```

For an example using a React/ Preact Application see `./example/src/OidcConnector.jsx`


## Configuration

<details>
  <summary>Client Configuration Options</summary>

_from [./src/client.d.ts](./src/client.d.ts)_

<!-- include (./src/client.d.ts lang=ts) -->
```ts
export interface Options {
  /**
   * URL to the OIDC server.
   * This URL is used to locate the OIDC discovery document (typically found
   * at /.well-known/openid-configuration), which specifies the provider's
   * OAuth endpoints and public keys.
   */
  url: string;
  /**
   * Name of the realm (applies only to keycloak servers)
   */
  realm?: string;
  /**
   * Client identifier example: 'my-app'
   */
  clientId: string;
  /**
   * Client Secret (for servers which require basic-auth)
   * token_endpoint_auth_methods_supported: ['client_secret_basic']
   */
  clientSecret?: string;
  /**
   * Send Client Secret in POST body. 
   * token_endpoint_auth_methods_supported: ['client_secret_post']
   */
  clientSecretPost?: boolean;
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
   * Replaces the settings which are usually loaded from
   * `.well-known/openid-configuration`.
   * Needs to follow the conventions defined in the standard.
   * https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
   * If type is string than configuration is loaded from this url.
   */
  oidcConfig?: OidcConfig | string;
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
   * storage used to store received tokens.
   * @default 'session'
   */
  storage?: 'session'|'local'|'cookie'|'memory'|'none';
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
   * external function which implements the PKCE challenge.
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
   * Specifies an uri to redirect to after silent login was triggered.
   * Silent login will only happen, when this redirect uri is given and the
   * specified uri is available within the application.
   * The url must deliver a page with the following content.
   * ```
   * <html><body><script>
   *   parent.postMessage(location.href, location.origin);
   * </script></body></html>
   * ```
   */
  silentLoginRedirectUri?: string;
  /**
   * Seconds to wait for the silent login redirect iframe to load
   * @default 5
   */
  silentLoginWait?: number;
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
  /**
   * additional authorization paramaters added on authorization request
   */
  authorizationParams?: object;
  /**
   * registration endpoint for users
   */
  userRegistrationEndpoint?: Url;
  /**
   * account endpoint for users
   */
  userAccountEndpoint?: Url;
}

/**
 * Standard data is taken from `.well-known/oidc-configuration` endpoint
 * non-standard settings can be named here.
 * @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
 */
export interface OidcConfig {
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
}

/**
 * logger with log levels. Uses '%s' microformat options
 * Either use with `console` or [debug](https://www.npmjs.com/package/debug)
 */
export interface Logger {
  /** logs info messages */
  info?: (...args: any) => void;
  /** logs error messages */
  error?: (...args: any) => void;
}

export interface Tokens {
  /**
   * raw access token
   */
  token?: string;
  /**
   * payload of access token (only if JWT)
   */
  tokenParsed?: object;
  /**
   * raw id token
   */
  idToken?: string;
  /**
   * payload of id token
   */
  idTokenParsed?: object;
  /**
   * raw refresh token
   */
  refreshToken?: string;
  /**
   * payload of refresh token (only if JWT)
   */
  refreshTokenParsed?: object;
  /**
   * obtain claim by claim name. E.g. `sub` returns subject
   * First id token payload is checked. If not available then access token
   * payload is queried.
   */
  claim: (claimName: string) => string | number | undefined;
}

export type eventName = 'token'|'error'|'logout'|'action'

export class Client extends EventEmitter {
  constructor (options: Options);
  /**
   * initialize the client. Needs to be called on page load.
   */
  init () : Promise<any>;
  /**
   * adds listener to eventName
   */
  on (eventName: eventName, listener: Function) : this;
  /**
   * removes listener to eventName
   */
  off (eventName: eventName, listener: Function) : this;
  /**
   * return all available tokens and its parsed payload
   */
  getTokens(): Tokens;
  /**
   * asynchonously return access token
   */
  accessToken(): Promise<Tokens["token"]>
  /**
   * Starts login procedure
   * User will always be prompted for credentials.
   * Set prompt='none' if login shall not prompt for credentials.
   */
  login(opts?: {prompt?: 'none'}): Promise<undefined>;
  /**
   * Silent login checks via iframe if auth session exists.
   * Requires option `silentLoginRedirectUri` with server side redirect page.
   * May be blocked if 3rd party cookies are rejected by browser.
   * If opts.prompt is set then `login()` will be started.
   * For `{prompt: 'login'}` user is prompted for credentials.
   * With `{prompt: 'none'}` user is not prompted for credentials (has same effect
   * as with `silentLoginRedirectUri` but with page redirects)
   */
  silentLogin (opts?: {prompt?: 'none'|'login'}): Promise<undefined>;
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
```
<!-- /include -->

</details>

## Testing

Utility functions and client are tested with jsdom.

```bash
npm t
```

The Client can be tested with client and server running in different terminals.

```bash
# starts app on localhost:8000
npm run dev
# starts oidc server on localhost:3000
npm run dev:server
```

## License

[Apache 2.0](./LICENSE)

## References

<!-- !ref -->

* [keycloak][keycloak]
* [OpenID Connect][OpenID Connect]

<!-- ref! -->

[keycloak]: https://keycloak.org
[OpenID Connect]: https://openid.net/developers/specs/
