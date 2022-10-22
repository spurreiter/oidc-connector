import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { OidcContext } from './OidcConnector.jsx'
import style from './navigation.module.css'

const classDisabled = (disabled) => disabled ? style.disabled : ''

export const Navigation = ({ home = '/', dispatch }) => {
  const { isAuthenticated, client, error } = useContext(OidcContext)

  const handleNav = (action) => (ev) => {
    ev.preventDefault()
    ev.stopImmediatePropagation()
    ev.stopPropagation()

    switch (action) {
      case 'userinfo': {
        client
          .userinfo()
          .then(info => dispatch(info))
          .catch(err => dispatch(err))
        break
      }
      case 'well-known': {
        const opts = client.options
        const url = `${opts.url}${opts.realm ? `/realms/${opts.realm}` : ''}/.well-known/openid-configuration`
        fetch(url)
          .then(res => {
            if (res.status !== 200) throw new Error(res)
            return res.json()
          })
          .then(body => dispatch(body))
          .catch(err => {
            window.open(url, '_blank')
            dispatch(err)
          })
        break
      }
      case 'clear-storage': {
        client.tokens._store.store.clear()
        break
      }
      case 'refresh': {
        client.tokens._expiresAt = 0
        break
      }
      default: {
        client[action]()
          .catch(err => dispatch(err))
        break
      }
    }
  }

  if (error) { dispatch(error) }

  return (
    <nav className={style.navigation}>
      <a href={home}>home</a>
      <a href='#' className={classDisabled(isAuthenticated)} onClick={handleNav('login')}>login</a>
      <a href='#' className={classDisabled(isAuthenticated)} onClick={handleNav('silentLogin')}>silentlogin</a>
      <a href='#' className={classDisabled(!isAuthenticated)} onClick={handleNav('clear-storage')} title="Clear tokens from Storage">clear-tokens</a>
      <a href='#' className={classDisabled(!isAuthenticated)} onClick={handleNav('logout')}>logout</a>
      <a href='#' className={classDisabled(!isAuthenticated)} onClick={handleNav('register')}>register</a>
      <a href='#' className={classDisabled(!isAuthenticated)} onClick={handleNav('account')}>account</a>
      <a href='#' className={classDisabled(!isAuthenticated)} onClick={handleNav('userinfo')}>userinfo</a>
      <a href='#' onClick={handleNav('well-known')}>well-known</a>
    </nav>
  )
}
