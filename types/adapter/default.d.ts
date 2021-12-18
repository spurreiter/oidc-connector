export class Adapter {
    initialize(client: any): void;
    client: any;
    endpoints: any;
    options: any;
    _isInitialized(): void;
    redirectUri(): any;
    login(opts: any): Promise<void>;
    register(): Promise<void>;
    logout({ idToken }: {
        idToken: any;
    }): Promise<void>;
    account(): Promise<void>;
}
