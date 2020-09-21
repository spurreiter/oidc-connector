import { CallbackStorage } from './storage.js'

function parseCallbackParams (paramsString, supportedParams) {
  const p = paramsString.split('&')
  const result = {
    paramsString: '',
    oauthParams: {}
  }
  for (let i = 0; i < p.length; i++) {
    const split = p[i].indexOf('=')
    const key = p[i].slice(0, split)
    if (supportedParams.indexOf(key) !== -1) {
      result.oauthParams[key] = p[i].slice(split + 1)
    } else {
      if (result.paramsString !== '') {
        result.paramsString += '&'
      }
      result.paramsString += p[i]
    }
  }
  return result
}

export class Callback {
  constructor (options) {
    const { flow, responseMode } = options || {}
    this._flow = flow
    this._responseMode = responseMode
    this._store = new CallbackStorage()
  }

  store (state) {
    this._store.add(state)
  }

  parseCallback (url) {
    const oauth = this.parseCallbackUrl(url)
    if (!oauth) {
      return
    }

    const oauthState = this._store.get(oauth.state)

    if (oauthState) {
      oauth.valid = true
      oauth.redirectUri = oauthState.redirectUri
      oauth.storedNonce = oauthState.nonce
      oauth.prompt = oauthState.prompt
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier
    }

    return oauth
  }

  parseCallbackUrl (url) {
    let supportedParams
    switch (this._flow) {
      case 'standard':
        supportedParams = ['code', 'state', 'session_state', 'kc_action_status']
        break
      case 'implicit':
        supportedParams = ['access_token', 'token_type', 'id_token', 'state', 'session_state', 'expires_in', 'kc_action_status']
        break
      case 'hybrid':
        supportedParams = ['access_token', 'id_token', 'code', 'state', 'session_state', 'kc_action_status']
        break
    }

    supportedParams.push('error')
    supportedParams.push('error_description')
    supportedParams.push('error_uri')

    const queryIndex = url.indexOf('?')
    const fragmentIndex = url.indexOf('#')

    let newUrl
    let parsed

    if (this._responseMode === 'query' && queryIndex !== -1) {
      newUrl = url.substring(0, queryIndex)
      parsed = parseCallbackParams(url.substring(queryIndex + 1, fragmentIndex !== -1 ? fragmentIndex : url.length), supportedParams)
      if (parsed.paramsString !== '') {
        newUrl += '?' + parsed.paramsString
      }
      if (fragmentIndex !== -1) {
        newUrl += url.substring(fragmentIndex)
      }
    } else if (this._responseMode === 'fragment' && fragmentIndex !== -1) {
      newUrl = url.substring(0, fragmentIndex)
      parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams)
      if (parsed.paramsString !== '') {
        newUrl += '#' + parsed.paramsString
      }
    }

    if (parsed && parsed.oauthParams) {
      if (this._flow === 'standard' || this._flow === 'hybrid') {
        if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl
          return parsed.oauthParams
        }
      } else if (this._flow === 'implicit') {
        if ((parsed.oauthParams.access_token || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl
          return parsed.oauthParams
        }
      }
    }
  }
}
