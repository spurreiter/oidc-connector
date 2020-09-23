export function createPromise () {
  const promise = new Promise((resolve, reject) => {
    promise.resolve = resolve
    promise.reject = reject
  })
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
