/* global globalThis */

export const _globalThis = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }

  /* istanbul ignore next */
  if (typeof window !== 'undefined') {
    return window
  }

  /* istanbul ignore next */
  if (typeof global !== 'undefined') {
    return global
  }
})()
