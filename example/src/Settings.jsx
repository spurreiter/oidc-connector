import { h } from 'preact'
import { useState } from 'preact/hooks'
import style from './settings.module.css'

const STORAGE_KEY = 'oidc-connector-example'

const DEFAULT_OPTIONS = {
  log: console,
  url: `http://localhost:3000/oidc`,
  realm: '',
  clientId: 'my-app',
  clientSecret: '',
  clientSecretPost: false,
  forceLogin: false,
  forceLogout: true,
  scope: 'openid',
  useNonce: true,
  storage: 'session',
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
  authorizationParams: {},
  oidcConfig: null
}

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
      'session',
      'local',
      'cookie',
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
  authorizationParams: { type: 'text' },
  oidcConfig: { type: 'text' }
}

export const getInitialSettings = () => Object.assign({}, 
  DEFAULT_OPTIONS, loadSettings())

const loadSettings = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

const storeSettings = ({ log, ...opts }) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(opts))

const stringifyProps = ['authorizationParams', 'oidcConfig']

const Input = ({ name, value }) => (
  <div>
    <label for={name}>{name}:</label>
    <input type="text" name={name} value={value} />
  </div>
)

const Checkbox = ({ name, value }) => (
  <div>
    <label for={name}>{name}:</label>
    <input type="checkbox" name={name} checked={!!value}/>
  </div>
)

const Select = ({ name, value, options }) => (
  <div>
    <label for={name}>{name}:</label>
    <select name={name} value={value}>
      {options.map(
        (option, key) => h('option', { key, value: option }, option))
      }
    </select>
  </div>
)

export const Settings = ({ handleSave }) => {
  let formId
  const [options, setOptions] = useState({ 
    ...DEFAULT_OPTIONS,
    ...loadSettings()
  })

  const onReset = (ev) => {
    ev.preventDefault()
    localStorage.removeItem(STORAGE_KEY)
    const opts = { ...DEFAULT_OPTIONS }
    setOptions(opts)
    handleSave && handleSave(opts)
  }

  const onSave = (ev) => {
    ev.preventDefault()
    const formObj = Object.fromEntries(new FormData(formId))
    const opts = Object.keys(DEFAULT_OPTIONS).reduce((o, key) => {
      const value = formObj[key]
      const type = formMeta[key]?.type
      if (type === 'checkbox') {
        o[key] = (value === 'on' || value === true)
      } else if (stringifyProps.includes(key)) {
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
    }, { ...DEFAULT_OPTIONS })
    
    storeSettings(opts)
    setOptions(opts)
    handleSave && handleSave(opts)
  }

  stringifyProps.forEach(prop => {
    if (typeof options[prop] === 'object') {
      options[prop] = JSON.stringify(options[prop])
    }
  })

  const formData = Object.entries(formMeta)
    .map(([name, meta]) => {
      const key = name
      let value = options[name]
      if (meta.options) {
        return h(Select, { key, name, value, options: meta.options })
      } else if (meta.type === 'checkbox') {
        return h(Checkbox, { key, name, value })
      } else {
        return h(Input, { key, name, value })
      }
    })

  return (
    <section className={style.settings} >
      <form ref={(ref) => {formId = ref}} onSubmit={onSave}>
      {formData}
      <div>
        <button type="submit" onClick={onSave}>save</button>
        <button onClick={onReset}>reset</button>
      </div>
      </form>
    </section>
  )
}
