export class Tokens {
    constructor({ log, useNonce, minValidity, clientId, storage }?: {
        log?: undefined;
        useNonce?: undefined;
        minValidity?: undefined;
        clientId?: undefined;
        storage?: string | undefined;
    });
    log: any;
    _useNonce: any;
    _authenticated: boolean;
    _timeSkew: number;
    _expiresAt: number;
    _store: Store;
    _minValidity: any;
    get authenticated(): boolean;
    /**
     * load tokens from localStorage
     */
    loadTokens(): Tokens;
    fromInitOptions({ token, refreshToken, idToken }?: {
        token?: undefined;
        refreshToken?: undefined;
        idToken?: undefined;
    }): Tokens;
    startTokenRequest(): void;
    _timeLocal: any;
    setTokens(tokenResponse?: {}): void;
    refreshToken: any;
    refreshTokenParsed: any;
    idToken: any;
    idTokenParsed: any;
    token: any;
    tokenParsed: any;
    getTokens(): TokenClaims;
    clearTokens(): void;
    sessionState(): any;
    /**
     * expiry in seconds
     * @return {number}
     */
    expiresIn(): number;
    isTokenExpired(minValidity?: any): boolean;
    /**
     * checks if storedNonce is different than nonce in tokens
     * requires `useNonce` in options.
     * if invalid tokens are cleared
     * @param {string} storedNonce
     * @return {boolean} true if storedNonce is different than nonce in tokens
     */
    isInvalidNonce(storedNonce: string): boolean;
}
export class TokenClaims {
    constructor(tokens: any);
    token: any;
    idToken: any;
    refreshToken: any;
    claim(claimName: any): any;
}
declare class Store {
    constructor(type: any, clientId: any);
    clientId: any;
    store: Storage | import("./utils/storage.js").MemoryStorage | import("./utils/storage.js").CookieStorage | undefined;
    _set(key: any, token: any): void;
    token(token: any, expiresAt: any): void;
    refreshToken(token: any): void;
    idToken(token: any): void;
    get(): {
        access_token: any;
        refresh_token: any;
        id_token: any;
        expiresAt: any;
    } | undefined;
}
export {};
