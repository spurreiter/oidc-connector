import { h } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { OidcContext } from './OidcConnector.jsx'

export const Token = () => {
  const { isAuthenticated, client } = useContext(OidcContext)

  const [rerender, setRerender] = useState(false)

  client.on('token', () => {
    setRerender(!rerender)
  })

  const tokenParsed = isAuthenticated
    ? client?.tokens?.tokenParsed || client()?.tokens?.idTokenParsed
    : undefined

  return tokenParsed
    ? <pre>{JSON.stringify(tokenParsed, null, 2)}</pre>
    : null
}
