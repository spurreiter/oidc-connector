import { CallbackStorage } from './storage.js'

import {
  // responseMode
  FRAGMENT,
  QUERY,
  // flow
  STANDARD,
  IMPLICIT,
  HYBRID,
  // params
  CODE,
  STATE,
  SESSION_STATE,
  RESPONSE_MODE,
  ACCESS_TOKEN,
  ID_TOKEN,
  EXPIRES_IN,
  KC_ACTION_STATUS,
  TOKEN_TYPE,
  ERROR,
  ERROR_DESCRIPTION,
  ERROR_URI
} from '../constants.js'

// const PARAMS = {
//   [STANDARD]: [CODE, STATE, SESSION_STATE, KC_ACTION_STATUS],
//   [IMPLICIT]: [CODE, ACCESS_TOKEN, TOKEN_TYPE, ID_TOKEN, STATE, SESSION_STATE, EXPIRES_IN, KC_ACTION_STATUS],
//   [HYBRID]: [CODE, ACCESS_TOKEN, ID_TOKEN, STATE, SESSION_STATE, KC_ACTION_STATUS]
// }

const PARAMS = [CODE, ACCESS_TOKEN, TOKEN_TYPE, ID_TOKEN, STATE, SESSION_STATE, EXPIRES_IN, KC_ACTION_STATUS]

export class Callback {
  constructor (options) {
    const { flow, responseMode, log } = options || {}
    this._flow = flow || STANDARD
    this._responseMode = responseMode || FRAGMENT
    this._store = new CallbackStorage()
    this.log = log
  }

  store (state) {
    this._store.add(state)
  }

  parse (url) {
    const oauth = this._parseUrl(url)
    if (!oauth) {
      return
    }

    this.log.info('callback parsed to %o', oauth)

    const oauthState = this._store.get(oauth.state)

    if (oauthState) {
      oauth.valid = true
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier
      oauth.prompt = oauthState.prompt
      oauth.redirectUri = oauthState.redirectUri
      oauth.storedNonce = oauthState.nonce
    }

    return oauth
  }

  _parseUrl (url) {
    // let supportedParams = PARAMS[this._flow] || []
    let supportedParams = PARAMS
    supportedParams = supportedParams.concat([
      RESPONSE_MODE,
      ERROR,
      ERROR_DESCRIPTION,
      ERROR_URI
    ])

    let oauth
    const uri = new URL(url)

    const reduce = (search) => supportedParams.reduce((oauth, param) => {
      const val = search.get(param)
      if (val) {
        search.delete(param)
        oauth[param] = val
      }
      return oauth
    }, {})

    if (this._responseMode === QUERY) {
      oauth = reduce(uri.searchParams)
      oauth.newUrl = uri.toString()
    } else if (this._responseMode === FRAGMENT) {
      const search = new URLSearchParams(uri.hash.substring(1))
      oauth = reduce(search)
      uri.hash = `#${search.toString()}`
      oauth.newUrl = uri.toString()
    }

    if (oauth && oauth.state) {
      if ((this._flow === STANDARD || this._flow === HYBRID) && (oauth.code || oauth.error)) {
        return oauth
      } else if (this._flow === IMPLICIT && (oauth.access_token || oauth.error)) {
        return oauth
      }
    }

    this.log.error('bad params %o for %s flow', oauth, this._flow)
  }
}
