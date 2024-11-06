/**
 * @typedef {import('../client').Options} Options
 * @typedef {import('../client').Logger} Logger
 *
 * @typedef {object} OptionsExt
 * @property {Logger} log
 */
/**
 * @param {Options} options
 * @returns {Options & OptionsExt}
 */
export function initOptions(options: Options): Options & OptionsExt;
export type Options = import("../client").Options;
export type Logger = import("../client").Logger;
export type OptionsExt = {
    log: Logger;
};
