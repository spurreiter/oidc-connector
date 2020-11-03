/* global globalThis */

export const _globalThis = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }

  /* c8 ignore next 3 */
  if (typeof window !== 'undefined') {
    return window
  }

  /* c8 ignore next 3 */
  if (typeof global !== 'undefined') {
    return global
  }
})()
