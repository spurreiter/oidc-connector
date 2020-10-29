import 'regenerator-runtime'
import { Client } from '../../src/index.js'

;(function () {
  const port = 3000

  const token = document.getElementById('token')
  const nav = document.getElementById('nav')

  const client = new Client({
    log: console,
    url: `http://localhost:${port}/oidc`,
    clientId: 'my-app',
    silentCheckSsoRedirectUri: '/silent-check-sso.html'
  })

  client.on('token', tokens => {
    console.log(tokens)
    token.textContent = JSON.stringify(tokens, null, 2)
  })
  client.on('logout', () => {
    token.textContent = 'logged out'
  })
  client.on('error', err => {
    console.log(err)
    token.textContent = JSON.stringify(err, null, 2)
  })

  client.init().catch(() => {})

  window.__login = () => client.login().catch(() => {})
  window.__silentLogin = () => {
    client.silentLogin()
      .catch(() => {})
  }
  window.__logout = () => client.logout().catch(() => {})

  nav.innerHTML = `
    <a href="#" onclick="__login()">login</a>
    <a href="#" onclick="__logout()">logout</a>
    <a href="#" onclick="__silentLogin()">silentlogin</a>
  `
})()
