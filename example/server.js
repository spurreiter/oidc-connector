/* eslint no-console: off */

import { fork } from 'child_process'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as  createViteServer } from 'vite'

const isDevMode = process.env.npm_lifecycle_event === 'dev' || process.env.MODE === 'dev'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const viewSilentLoginCheck = `<html><body><script>
  parent.postMessage(location.href, location.origin);
</script></body></html>
`

async function setup () {
  const app = express()

  app.get('/favicon.ico', (req, res) => {
    res.end()
  })

  app.get('/silent-login-check.html', (req, res) => {
    res.end(viewSilentLoginCheck)
  })

  if (isDevMode) {
    const vite = await createViteServer({
      server: { middlewareMode: true }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')))
  }

  return app
}

const main = async () => {
  const port = process.env.PORT || 8000

  // starts the vite dev server
  const app = await setup({ port })
  const server = app.listen(port, () => {
    console.log(`open http://localhost:${port} in the browser.`)
  })

  // starts the oidc test server on :3000
  fork(path.resolve(__dirname, '../test/support/server.js'))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => console.error(err))
}
