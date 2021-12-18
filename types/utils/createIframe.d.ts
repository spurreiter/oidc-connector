export function createIframe(opts: any): CreateIframe;
declare class CreateIframe {
    constructor(opts: any);
    _opts: any;
    _iframe: HTMLIFrameElement | null;
    _handleMsg: ((ev: any) => void) | undefined;
    create(origin: any, onLoad: any, nextOrigin: any): Promise<void>;
    origin: any;
    addListener(handleMessage: any): void;
    postMessage(msg: any): void;
    removeListener(): void;
}
export {};
