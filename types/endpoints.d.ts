export class Endpoints {
    constructor(serverUrl: any, oidcConfig: any, callback: any);
    serverUrl: any;
    oidcConfig: any;
    callback: any;
    _maybeKeycloak(): any;
    createLoginUrl(options: any): Promise<string>;
    createRegisterUrl(options: any): Promise<string>;
    createLogoutUrl(options: any, { idToken }: {
        idToken: any;
    }): Promise<string>;
    createAccountUrl(options: any): Promise<string>;
    createTokenUrl(query: any): string;
    authorize(): any;
    token(): any;
    logout(): any;
    checkSessionIframe(): any;
    userinfo(): any;
    register(): any;
    account(): any;
}
export function endpoints(serverUrl: any, oidcConfig: any, callback: any): Endpoints;
