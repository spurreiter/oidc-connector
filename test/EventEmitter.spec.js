import assert from 'assert'
import { EventEmitter } from '../src/utils/index.js'

describe('node/EventEmitter', () => {
  let ee
  beforeEach(() => {
    ee = new EventEmitter()
  })
  it('should emit event', (done) => {
    ee.on('listen', () => {
      done()
    })
    ee.emit('listen')
  })
  it('should emit with arguments', (done) => {
    const payload = { data: 1 }
    ee.on('listen', (_payload, _payload1) => {
      assert.deepStrictEqual(_payload, payload)
      assert.deepStrictEqual(_payload1, payload)
      done()
    })
    ee.emit('listen', payload, payload)
  })
  it('should ignore unregistered event', () => {
    ee.emit('unknown')
  })
  it('should ignore unregistered event', () => {
    ee.emit('unknown')
  })
  it('should add a large number of events', (done) => {
    let count = 0

    for (let i = 0; i <= 10000; i++) {
      ee.on('listen', () => {
        count += i
      })
    }
    ee.on('listen', () => {
      assert.ok(count === 50005000)
      done()
    })
    ee.emit('listen')
  })
  it('should remove all listener of eventName', (done) => {
    let count = 0

    for (let i = 0; i <= 10; i++) {
      ee.on('listen', () => {
        count += i
      })
      ee.on('plus1', () => {
        count += i + 1
      })
    }
    ee.emit('listen')
    ee.emit('plus1')
    assert.ok(count === 121, count)
    ee.off('plus1')
    count = 0
    ee.emit('listen')
    setTimeout(() => {
      assert.ok(count === 55, count)
      done()
    })
  })
})
