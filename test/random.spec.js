import jsdom from 'jsdom-global'
import assert from 'assert'
import { uuid4 } from '../src/utils/index.js'

describe('utils/random', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })
  after(function () {
    this.jsdom()
  })
  describe('uuid4', function () {
    it('shall create a uuid', function () {
      const uuid = uuid4()
      const a = '00000000-0000-4000-0000-000000000000'
      a.split('').forEach((char, i) => {
        if (char === '0') {
          assert.ok(/[0-9a-f]/.test(uuid[i]))
        } else {
          assert.ok(char === uuid[i])
        }
      })
    })

    it('each uuid shall be unique', function () {
      const uuid1 = uuid4()
      const uuid2 = uuid4()
      assert.ok(uuid1 !== uuid2)
    })
  })
})
