import { h, createContext } from 'preact'
import { useMemo, useState } from 'preact/hooks'

// import OidcClient from 'oidc-connector'
import OidcClient from '../../src/index.js'

export const OidcContext = createContext()

export const OidcConnector = ({ options, children }) => {
  const [isAuthenticated, _setAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [error, _setError] = useState(null)
  const client = useMemo(() => {
    const client = new OidcClient(options)
    client.init().catch(err => { setError(err) })
    return client
  }, [options])

  const setError = (err) => {
    setLoading(false)
    _setError(err)
  }
  const setAuthenticated = (val) => {
    setLoading(false)
    _setAuthenticated(val)
  }

  client.on('token', ({ token }) => {
    setAuthenticated(!token ? false : true)
  })
  client.on('error', (err) => {
    setError(err)
  })
  client.on('logout', () => {
    setAuthenticated(false)
  })

  /**
   * initialize login
   */
  const handleLogin = useMemo(() => () => {
    setLoading(true)
    return client.login()
  })

  /**
   * initialize logout
   */
  const handleLogout = useMemo(() => ()=> {
    setLoading(true)
    return client.logout()
  })

  const value = { isLoading, isAuthenticated, error, handleLogin, handleLogout, client }

  return h(OidcContext.Provider, { value }, children)
}
