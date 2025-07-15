/** @typedef {import('./client-types.js').Options} Options */
/** @typedef {import('./types.js').OidcError} OidcError */
export class Client extends EventEmitter {
    /**
     * @param {Options} [options]
     */
    constructor(options?: Options);
    options: import("./client-types.js").Options & import("./utils/initOptions.js").OptionsExt;
    adapter: Adapter | import("./client-types.js").Adapter;
    callback: Callback;
    tokens: Tokens;
    debounce: {
        push: (promise: any) => boolean;
        resolveAll: (result: any) => void;
        rejectAll: (err: any) => void;
    };
    endpoints: import("./endpoints.js").Endpoints | null;
    statusIframe: StatusIframe;
    checkSilentLogin: typeof checkSilentLogin;
    isInitialized: boolean;
    init(): Promise<import("./tokens.js").TokenClaims>;
    _processInit(): Promise<any>;
    _processWithTokens(): Promise<any>;
    _processCallback(oauth: any): Promise<undefined>;
    _authSuccess(tokenResponse: any, oauth: any): Promise<undefined>;
    _refresh(minValidity?: number | undefined): Promise<any>;
    _schedule(): void;
    _expiryTimerId: any;
    _handleToken(): import("./tokens.js").TokenClaims;
    _handleError(err: any): void;
    _handleLogout(): void;
    getTokens(): import("./tokens.js").TokenClaims;
    getParsedToken(): any;
    accessToken(): Promise<any>;
    /**
     * Starts login procedure
     * @param {Object} [opts={}]
     * @param {'login'|'none'} [opts.prompt='login'] - 'login'|'none' if set to
     * 'none' then login will not prompt for credentials.
     * @return {Promise}
     */
    login(opts?: {
        prompt?: "none" | "login" | undefined;
    }): Promise<any>;
    /**
     * Silent login checks via iframe if auth session exists.
     * Requires option `silentLoginRedirectUri` with server side redirect page.
     * May be blocked if rejecting 3rd party cookies.
     * If opts.prompt is set then `login()` will be started.
     * For `{prompt: 'login'}` user is prompted for credentials.
     * @return {Promise}
     */
    silentLogin(opts?: {}): Promise<any>;
    /**
     * Logout from auth session using end_session_endpoint.
     * No token revocation will be made.
     * @return {Promise}
     */
    logout(): Promise<any>;
    userinfo(): Promise<any>;
    register(): Promise<void>;
    account(): Promise<void>;
}
export type Options = import("./client-types.js").Options;
export type OidcError = import("./types.js").OidcError;
import { EventEmitter } from './utils/index.js';
import { Adapter } from './adapter/default.js';
import { Callback } from './utils/index.js';
import { Tokens } from './tokens.js';
import { StatusIframe } from './utils/index.js';
import { checkSilentLogin } from './utils/index.js';
