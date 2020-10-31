import jsdom from 'jsdom-global'
import assert from 'assert'
import { pkce } from '../src/utils/pkce.js'
import './support/shims.js'

describe('pkce', function () {
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

  it('shall generate challenge', async function () {
    const test = 'MtY8kxZz7FGKBECS3wGrRr81IsUbCbBR8RNuD6E8LOX7sX71o1NsmGM6y5WWboZpwNEjuQtYS1iwVKTa6LIZdGyw5Z6YtA88'
    const pkceMethod = 'S256'
    const { challenge } = await pkce(pkceMethod, test)
    assert.strictEqual(challenge, 'bEWE7zzahbN4nzLN6BaVl9bkwj3fNJqyy_tkb5TlRR4')
  })
})
