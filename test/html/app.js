/* eslint no-console: off */

import 'regenerator-runtime'
import Client from '../../src/index.js'

;(function () {
  const port = 3000
  const LSKEY = 'my-app'

  const id = {
    settings: document.getElementById('settings'),
    token: document.getElementById('token'),
    nav: document.getElementById('nav')
  }

  const options = {
    log: console,
    url: `http://localhost:${port}/oidc`,
    realm: '',
    clientId: 'my-app',
    clientSecret: '',
    clientSecretPost: false,
    forceLogin: false,
    forceLogout: true,
    scope: 'openid',
    useNonce: true,
    storage: 'local',
    minValidity: 15,
    expiryInterval: 5,
    responseMode: 'fragment',
    responseType: 'code',
    flow: 'standard',
    pkceMethod: '',
    prompt: 'none',
    useStatusIframe: true,
    statusIframeInterval: 5,
    silentLoginRedirectUri: '/silent-login-check.html',
    redirectUri: '',
    postLogoutRedirectUri: '',
    authorizationParams: {}
    // oidcConfig: {
    //   authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
    //   token_endpoint: 'https://localhost:9443/oauth2/token'
    // }
  }

  // --- rendering ---

  const load = () =>
    JSON.parse(localStorage.getItem(LSKEY) || '{}')
  const store = ({ log, ...opts }) =>
    localStorage.setItem(LSKEY, JSON.stringify(opts))

  function renderSettings (_options) {
    const options = { ..._options }
    const formMeta = {
      url: { type: 'text' },
      realm: { type: 'text' },
      clientId: { type: 'text' },
      clientSecret: { type: 'text' },
      clientSecretPost: { type: 'checkbox' },
      forceLogin: { type: 'checkbox' },
      forceLogout: { type: 'checkbox' },
      scope: { type: 'text' },
      useNonce: { type: 'checkbox' },
      storage: {
        options: [
          'local',
          'session',
          'memory',
          'none'
        ]
      },
      minValidity: { type: 'text' },
      expiryInterval: { type: 'text' },
      responseMode: { options: ['fragment', 'query'] },
      responseType: {
        options: [
          'code',
          'none',
          'id_token',
          'token',
          'id_token token',
          'code id_token',
          'code token',
          'code id_token token'
        ]
      },
      flow: { options: ['standard', 'hybrid', 'implicit'] },
      prompt: { options: ['none', 'login'] },
      pkceMethod: { options: ['', 'S256'] },
      useStatusIframe: { type: 'checkbox' },
      statusIframeInterval: { type: 'text' },
      silentLoginRedirectUri: { type: 'text' },
      redirectUri: { type: 'text' },
      postLogoutRedirectUri: { type: 'text' },
      authorizationParams: { type: 'text' }
    }
    const input = ({ name, value }) => `
      <div>
        <label for="${name}">${name}:</label>
        <input type="text" name="${name}" value="${value}">
      </div>
    `
    const checkbox = ({ name, value }) => `
      <div>
        <label for="${name}">${name}:</label>
        <input type="checkbox" name="${name}" ${value ? 'checked' : ''}>
      </div>
    `
    const select = ({ name, value, options }) => `
      <div>
        <label for="${name}">${name}:</label>
        <select name="${name}">
          ${options.map(option => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`)}
        </select>
      </div>
    `

    if (options.authorizationParams) {
      options.authorizationParams = JSON.stringify(options.authorizationParams)
    }

    const html = `
    <form onsubmit="return false">
      ${Object.entries(formMeta).map(([name, meta]) => {
        let value = options[name]
        if (typeof value === 'string') {
          value = value.replace(/"/g, '&quot;')
        }
        if (meta.options) {
          return select({ name, value, options: meta.options })
        } else if (meta.type === 'checkbox') {
          return checkbox({ name, value })
        } else {
          return input({ name, value })
        }
      })
        .join('\n')
      }
      <button onclick="window.__settings()">submit</button>
      <button onclick="window.__settingsReset()">reset</button>
    </form>`
    id.settings.innerHTML = html
  }

  const getSettings = () => {
    const form = new FormData(id.settings.querySelector('form'))
    const opts = Array.from(form).reduce((o, [key, value]) => {
      const type = typeof options[key]
      if (type === 'boolean') {
        o[key] = (value === 'on' || value === true)
      } else if (key === 'authorizationParams') {
        try {
          o[key] = JSON.parse(value)
        } catch (e) {
          console.error(value)
          console.error(e)
        }
      } else {
        o[key] = value === '' ? undefined : value
      }
      return o
    }, { ...options })
    store(opts)
    // console.log(localStorage.getItem('my-app'))
    opts.log = console
    if (options.oidcConfig) {
      opts.oidcConfig = options.oidcConfig
    }
    return opts
  }

  function renderNav () {
    id.nav.innerHTML = `
      <a href="/">home</a>
      <a href="#" onclick="__login()">login</a>
      <a href="#" onclick="__silentLogin()">silentlogin</a>
      <a href="#" onclick="__logout()">logout</a>
      <a href="#" onclick="__register()">register</a>
      <a href="#" onclick="__account()">account</a>
      <a href="#" onclick="__userinfo()">userinfo</a>
      <a href="#" onclick="__wellknownConfig()">well-known</a>
    `
  }

  function renderContent (content) {
    if (typeof content === 'object') {
      content = JSON.stringify(content, null, 2)
    }
    id.token.textContent = content
  }

  let client
  function setupClient () {
    const opts = getSettings()
    // console.log(opts)
    client = new Client(opts)

    client.on('token', tokens => {
      console.log(tokens)
      renderContent(tokens)
    })
    client.on('logout', () => {
      renderContent('logged out')
    })
    client.on('error', err => {
      console.log(err)
      const { message, description, stack } = err
      renderContent({ message, description, stack })
    })

    return client.init()
      .catch(() => {})
      .then(() => client)
  }

  // ---

  renderNav()
  // console.log(load())
  renderSettings({ ...options, ...load() })
  setupClient().catch(() => {})

  window.__settings = () => {
    setupClient().catch(() => {})
  }
  window.__settingsReset = () => {
    localStorage.removeItem(LSKEY)
    renderSettings({ ...options, ...load() })
    setupClient().catch(() => {})
  }

  window.__login = () =>
    client.login().catch(console.error)
  window.__silentLogin = () =>
    client.silentLogin().catch(console.error)
  window.__logout = () =>
    client.logout().catch(console.error)
  window.__register = () =>
    client.register().catch(console.error)
  window.__account = () =>
    client.account().catch(console.error)
  window.__userinfo = () =>
    client.userinfo().then(info => renderContent(info)).catch(console.error)
  window.__wellknownConfig = () => {
    const opts = getSettings()
    const url = `${opts.url}${opts.realm ? `/realms/${opts.realm}` : ''}/.well-known/openid-configuration`
    window.open(url, '_blanc')
  }
})()
