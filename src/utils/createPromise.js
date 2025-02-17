/** @typedef {import('../types').Promised} Promised */

/**
 * creates a promise
 * @returns {Promised}
 */
export function createPromise() {
  let _resolve
  let _reject
  /** @type {Promised} */
  // @ts-ignore
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  // @ts-ignore
  promise.resolve = _resolve
  // @ts-ignore
  promise.reject = _reject
  return promise
}

export function debouncePromises() {
  const queue = []

  const push = (promise) => {
    queue.push(promise)
    return queue.length === 1
  }
  const resolveAll = (result) => {
    while (queue.length) {
      queue.shift().resolve(result)
    }
  }
  const rejectAll = (err) => {
    while (queue.length) {
      queue.shift().reject(err)
    }
  }

  return {
    push,
    resolveAll,
    rejectAll
  }
}
