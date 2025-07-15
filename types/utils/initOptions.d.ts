/**
 * @typedef {import('../client-types.js').Options} Options
 * @typedef {import('../client-types.js').Logger} Logger
 *
 * @typedef {object} OptionsExt
 * @property {Logger} log
 */
/**
 * @param {Options} options
 * @returns {Options & OptionsExt}
 */
export function initOptions(options: Options): Options & OptionsExt;
export type Options = import("../client-types.js").Options;
export type Logger = import("../client-types.js").Logger;
export type OptionsExt = {
    log: Logger;
};
