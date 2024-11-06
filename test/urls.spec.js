import assert from 'assert'
import { jsdom } from './support/shims.js'
import { clearUrl, absoluteUrl } from '../src/utils/index.js'

describe('utils/urls', function () {
  before(function () {
    this.jsdom = jsdom('', {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html'
    })
  })

  describe('clearUrl', function () {
    it('shall clear a url from doubled slashes', function () {
      assert.strictEqual(
        clearUrl('https://foo.bar//double/the/paths/'),
        'https://foo.bar/double/the/paths'
      )
    })

    it('shall clear a path from doubled slashes', function () {
      assert.strictEqual(
        clearUrl('/foo.bar//double/the/paths/'),
        '/foo.bar/double/the/paths'
      )
    })
  })

  describe('absoluteUrl', function () {
    it('shall add origin', function () {
      assert.strictEqual(
        absoluteUrl('/foo/bar'),
        'https://example.org/foo/bar'
      )
    })

    it('shall use url', function () {
      assert.strictEqual(
        absoluteUrl('https://localhost/foo/bar', 'https://example.org'),
        'https://localhost/foo/bar'
      )
    })
  })
})
