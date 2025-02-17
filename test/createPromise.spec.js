import assert from 'assert'
import { createPromise, debouncePromises } from '../src/utils/index.js'

describe('utils/createPromise', function () {
  describe('createPromise', function () {
    it('shall resolve', function (done) {
      const promise = createPromise()
      promise.then(() => {
        done()
      })
      promise.resolve()
    })
    it('shall reject', function (done) {
      const promise = createPromise()
      promise.catch(() => {
        done()
      })
      promise.reject()
    })
  })

  describe('debouncePromises', function () {
    it('shall resolve all', function (done) {
      const debounce = debouncePromises()
      const arr = []

      for (let i = 0; i < 10; i++) {
        const promise = createPromise()
        promise.then((r) => {
          assert.strictEqual(r, 2)
          if (i === 9) done()
        })
        arr.push(promise)
        if (debounce.push(promise)) {
          setTimeout(() => {
            debounce.resolveAll(2)
          }, 10)
        }
      }
    })

    it('shall reject', function (done) {
      const debounce = debouncePromises()
      const arr = []

      for (let i = 0; i < 10; i++) {
        const promise = createPromise()
        promise.catch((err) => {
          assert.strictEqual(err.message, 'error')
          if (i === 9) done()
        })
        arr.push(promise)
        if (debounce.push(promise)) {
          setTimeout(() => {
            debounce.rejectAll(new Error('error'))
          })
        }
      }
    })
  })
})
