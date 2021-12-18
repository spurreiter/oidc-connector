export class StatusIframe {
    constructor(client: any);
    client: any;
    iframe: any;
    iframeOrigin: any;
    debounce: {
        push: (promise: any) => boolean;
        resolveAll: (result: any) => void;
        rejectAll: (err: any) => void;
    };
    enabled: any;
    interval: number;
    log: any;
    mock: any;
    disable(): void;
    setup(): Promise<any>;
    check(): Promise<any>;
    _schedule(): void;
    timerId: any;
    schedule(): Promise<void>;
    clearSchedule(): void;
}
