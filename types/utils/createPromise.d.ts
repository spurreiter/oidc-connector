/** @typedef {import('../types').Promised} Promised */
/**
 * creates a promise
 * @returns {Promised}
 */
export function createPromise(): Promised;
export function debouncePromises(): {
    push: (promise: any) => boolean;
    resolveAll: (result: any) => void;
    rejectAll: (err: any) => void;
};
export type Promised = import("../types").Promised;
