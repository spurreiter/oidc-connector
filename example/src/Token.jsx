import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { OidcContext } from './OidcConnector.jsx'

export const Token = () => {
  const { isAuthenticated, getClient } = useContext(OidcContext)

  const tokenParsed = isAuthenticated
    ? getClient()?.tokens?.tokenParsed || getClient()?.tokens?.idTokenParsed
    : undefined

  return tokenParsed 
    ? <pre>{JSON.stringify(tokenParsed, null, 2)}</pre>
    : null
}
