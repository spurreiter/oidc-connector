export class Callback {
    constructor(options: any);
    _flow: any;
    _responseMode: any;
    _store: CallbackStorage;
    log: any;
    store(state: any): void;
    parse(url: any): {
        newUrl: string;
    } | undefined;
    _parseUrl(url: any): {
        newUrl: string;
    } | undefined;
}
import { CallbackStorage } from './storage.js';
