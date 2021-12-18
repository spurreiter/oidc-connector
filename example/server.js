/* eslint no-console: off */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const viewSilentLoginCheck = `<html><body><script>
  parent.postMessage(location.href, location.origin);
</script></body></html>
`

function setup () {
  const app = express()

  app.get('/favicon.ico', (req, res) => {
    res.end()
  })

  app.get('/silent-login-check.html', (req, res) => {
    res.end(viewSilentLoginCheck)
  })

  app.use(express.static(path.resolve(__dirname, 'dist')))

  return app
}

const port = 8000
const server = setup({ port }).listen(port, () => {
  console.log(server.address())
})
