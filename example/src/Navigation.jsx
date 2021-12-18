import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { OidcContext } from './OidcConnector.jsx'
import style from './navigation.module.css'

export const Navigation = ({ home = '/', dispatch }) => {
  const { isAuthenticated, getClient, error } = useContext(OidcContext)

  const handleNav = (action) => {
    switch (action) {
      case 'userinfo': {
        getClient()
          .userinfo()
          .then(info => dispatch(info))
          .catch(err => dispatch(err))
        break
      }
      case 'well-known': {
        const client = getClient()
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
        getClient().tokens._store.store.clear()
        break
      }
      default: {
        getClient()[action]()
          .catch(err => dispatch(err))
        break
      }
    }
  }

  if (error) { dispatch(error) }

  return (
    <nav className={style.navigation}>
      <a href={home}>home</a>
      <a href='#' onClick={() => handleNav('login')}>login</a>
      <a href='#' onClick={() => handleNav('silentLogin')}>silentlogin</a>
      <a href='#' onClick={() => handleNav('clear-storage')} title="Clear tokens from Storage">clear</a>
      <a href='#' onClick={() => handleNav('logout')}>logout</a>
      <a href='#' onClick={() => handleNav('register')}>register</a>
      <a href='#' onClick={() => handleNav('account')}>account</a>
      <a href='#' onClick={() => handleNav('userinfo')}>userinfo</a>
      <a href='#' onClick={() => handleNav('well-known')}>well-known</a>
    </nav>
  )
}
