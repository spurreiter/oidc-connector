import assert from 'assert'
import { clearUrl } from '../src/utils/index.js'

describe('utils/cleanUrl', function () {
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
