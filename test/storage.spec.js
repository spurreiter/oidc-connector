import assert from 'assert'
import { jsdom } from './support/shims.js'
import {
  storage,
  LocalStorage,
  CookieStorage,
  CallbackStorage
} from '../src/utils/storage.js'

describe('utils/storage', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })

  describe('storage', function () {
    before(function () {
      storage().clear()
    })

    it('lifecycle localStorage', function () {
      const ls = storage()
      assert.ok(ls instanceof LocalStorage)
      ls.setItem('a', 1)
      ls.setItem('b', { b: 2 })
      assert.strictEqual(ls.getItem('a'), 1)
      assert.deepStrictEqual(ls.getItem('b'), { b: 2 })
      assert.deepStrictEqual(Object.keys(ls.keys()), ['a', 'b'])
      ls.removeItem('a')
      assert.strictEqual(ls.getItem('a'), null)
    })

    it('lifecycle cookieStorage', function () {
      const ls = storage('cookie')
      assert.ok(ls instanceof CookieStorage)
      ls.setItem('a', 1)
      ls.setItem('b', { b: 2 })
      assert.strictEqual(ls.getItem('a'), 1)
      assert.deepStrictEqual(ls.getItem('b'), { b: 2 })
      assert.deepStrictEqual(Object.keys(ls.keys()), ['a', 'b'])
      ls.removeItem('a')
      assert.deepStrictEqual(Object.keys(ls.keys()), ['b'])
    })
  })

  describe('CallbackStorage', function () {
    it('shall set state', function () {
      const store = new CallbackStorage()
      const state = { state: 'a', expires: new Date() + 1000 }
      store.add(state)
      assert.strictEqual(store.get(state.state).state, 'a')
    })
    it('shall set state and cleanup expired', function () {
      const store = new CallbackStorage()
      store.add({ state: 'a', expires: new Date() - 1000 })
      assert.strictEqual(typeof store.get('a'), 'undefined')
      store.add({ state: 'b', expires: new Date() - 1000 })
      assert.strictEqual(typeof store.get('a'), 'undefined')
      store.add({ state: 'c', expires: new Date() - 1000 })
      assert.strictEqual(typeof store.get('b'), 'undefined')
      store.add({ state: 'd', expires: new Date() + 1000 })
      assert.strictEqual(typeof store.get('c'), 'undefined')
      assert.strictEqual(store.get('d').state, 'd')
    })
  })
})
