export function createPromise () {
  let _resolve
  let _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  promise.resolve = _resolve
  promise.reject = _reject
  return promise
}

export function debouncePromises () {
  const queue = []

  const push = (promise) => {
    queue.push(promise)
    return queue.length === 1
  }
  const resolveAll = (result) => {
    while (queue.length) {
      queue.pop().resolve(result)
    }
  }
  const rejectAll = (err) => {
    while (queue.length) {
      queue.pop().reject(err)
    }
  }

  return {
    push,
    resolveAll,
    rejectAll
  }
}
