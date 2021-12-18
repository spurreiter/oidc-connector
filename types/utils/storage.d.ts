/**
 * Obtain token storage. Fallback is type='cookie'
 * @param {string} [type='local'] 'cookie|local|session|memory'
 * @param {string} [fallbackType] 'cookie|local|session|memory'
 * @returns {Storage|MemoryStorage|CookieStorage}
 */
export function storage(type?: string | undefined, fallbackType?: string | undefined): Storage | MemoryStorage | CookieStorage;
export class MemoryStorage {
    items: {};
    keys(): {};
    getItem(key: any): any;
    setItem(key: any, value: any): void;
    removeItem(key: any): void;
    clear(): void;
}
export class CookieStorage {
    keys(): {};
    getItem(key: any): any;
    setItem(key: any, value: any): void;
    removeItem(key: any): void;
    clear(): void;
}
export class LocalStorage {
    /**
     * [constructor description]
     * @param {object} [store] - window.sessionStorage
     */
    constructor(store?: object);
    _store: any;
    keys(): any;
    getItem(key: any): any;
    setItem(key: any, value: any): void;
    removeItem(key: any): void;
    clear(): void;
}
export class CallbackStorage {
    /**
     * Obtain token storage. Fallback is type='cookie'
     * @param {string} [type='local'] - 'local|session|cookie|memory'
     */
    constructor(type?: string | undefined);
    _callback: string;
    _store: Storage | MemoryStorage | CookieStorage;
    _clearExpired(): void;
    get(state: any): any;
    add(state: any): void;
}
