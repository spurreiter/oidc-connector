/* eslint camelcase: 0 */

import crypto from 'crypto'
import { URL, URLSearchParams, fileURLToPath } from 'url'
import jsrsasign from 'jsrsasign'
import express from 'express'

const port = 3000

// --- utils

const uuid4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  )

const toSnakeCase = str => str.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)

function createUrl (url, query) {
  const u = new URL(url)
  u.search = new URLSearchParams(Object.entries(JSON.parse(JSON.stringify(query))))
  return u.toString()
}

class RsaKey {
  constructor () {
    this.rsaKey = jsrsasign.KEYUTIL.generateKeypair('RSA', 1024)
    this.e = jsrsasign.hextob64u(this.rsaKey.pubKeyObj.e.toString(16))
    this.n = jsrsasign.hextob64u(this.rsaKey.pubKeyObj.n.toString(16))
    this.kid = uuid4()
  }

  keys () {
    const { kid, e, n } = this
    return ({
      keys: [{ kty: 'RSA', use: 'sig', kid, e, n }]
    })
  }

  signToken (payload) {
    const { kid, rsaKey } = this
    return jsrsasign.jws.JWS.sign(null, { alg: 'RS256', kid }, payload, rsaKey.prvKeyObj)
  }

  verifyToken (token, { timeSkew = 15 } = {}) {
    try {
      const ok = jsrsasign.jws.JWS.verify(token, this.rsaKey.pubKeyObj, ['RS256'])
      const jws = new jsrsasign.jws.JWS()
      jws.parseJWS(token)
      const payload = JSON.parse(jws.parsedJWS.payloadS)
      const now = (Date.now() / 1000 | 0)
      if (ok && payload && payload.exp > (now - timeSkew) && payload.iat <= (now + timeSkew)) {
        return payload
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function hashAccessToken (token) {
  const hash = jsrsasign.crypto.Util.hashString(token, 'sha256')
  const left = hash.substr(0, hash.length / 2)
  return jsrsasign.hextob64u(left)
}

// --- server related stuff

const getPaths = ({ baseUrl }) => ({
  issuer: baseUrl,
  oidcUri: baseUrl + '/.well-known/openid-configuration',
  jwksUri: baseUrl + '/certs',
  authorizationEndpoint: baseUrl + '/auth',
  tokenEndpoint: baseUrl + '/token',
  userinfoEndpoint: baseUrl + '/userinfo',
  endSessionEndpoint: baseUrl + '/logout',
  checkSessionIframe: baseUrl + '/login-status-iframe.html'
})

const getWellKnownConfig = (paths, { protocol = 'http:', hostname, port }) => {
  const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`
  const { oidcUri, ...rest } = paths
  return Object.entries(rest).reduce((o, [key, val]) => {
    o[toSnakeCase(key)] = url + val
    return o
  }, {})
}

const createToken = ({ iss, aud, sub, nonce, state, at_hash, exp = 300, typ = 'Bearer', claims }) => {
  var now = (Date.now() / 1000 | 0)
  var payload = {
    exp: now + exp,
    iat: now,
    jti: uuid4(),
    iss,
    aud,
    acr: 1,
    typ,
    sub,
    nonce,
    session_state: state,
    at_hash,
    ...claims
  }
  return payload
}

// --- express middlewares

function bodyParser (req, res, next) {
  let text = ''
  req.on('data', c => {
    if (text.length < 1e6) {
      text += c.toString()
    } else if (!res.writableEnded) {
      res.status(413).end()
    }
  })
  req.on('end', () => {
    try {
      const type = req.headers['content-type']
      req.body = /\/json/.test(type)
        ? JSON.parse(text)
        : Array.from(new URLSearchParams(text)).reduce((o, [key, val]) => {
          o[key] = val
          return o
        }, {})
    } catch (err) {
      req.body = { text, err }
    }
    next()
  })
}

// --- server

// https://openid.net/specs/openid-connect-core-1_0.html
// https://tools.ietf.org/html/rfc6749
export function setup ({
  baseUrl = '/oidc',
  protocol = 'http:',
  hostname = 'localhost',
  port = 3000
} = {}) {
  const jwks = new RsaKey()
  const paths = getPaths({ baseUrl })
  const oidcConfig = getWellKnownConfig(paths, { protocol, hostname, port })
  const app = express()
  app._port = port

  app.get(paths.oidcUri, (req, res) => {
    res.type('json').json(oidcConfig)
  })

  app.get(paths.jwksUri, (req, res) => {
    res.type('json').json(jwks.keys())
  })

  app.get(paths.authorizationEndpoint, (req, res) => {
    const { response_type, /* scope, client_id, */ redirect_uri, state, response_mode, nonce } = req.query
    const fragmentize = url => response_mode === 'fragment'
      ? url.replace(/[?]/, '#')
      : url

    let url

    if (response_type === 'code') {
      const code = uuid4()
      url = fragmentize(createUrl(redirect_uri, { code, response_type, state, nonce }))
      res.cookie('SESSION_STATE', state, { path: paths.authorizationEndpoint })
    } else {
      url = fragmentize(createUrl(redirect_uri, { error: 'unsupported_response_type', state, nonce }))
      res.clearCookie('SESSION_STATE', { path: paths.authorizationEndpoint })
    }
    res.redirect(url)
  })

  app.post(paths.tokenEndpoint, bodyParser, (req, res) => {
    const iss = `http://localhost:${port}${baseUrl}`
    const {
      // grant_type,
      // code,
      client_id: aud,
      // redirect_uri,
      state,
      nonce
    } = req.body

    const exp = 300
    const claims = {
      name: 'Alice',
      email: 'alice@wonder.land'
    }

    const access_token = jwks.signToken(createToken({ iss, aud, state, nonce, exp, claims }))
    const at_hash = hashAccessToken(access_token)

    res.body = {
      access_token,
      expires_in: exp,
      token_type: 'Bearer',
      refresh_token: jwks.signToken(createToken({ typ: 'Refresh', iss, aud, state, nonce, exp: exp * 5 })),
      id_token: jwks.signToken(createToken({ typ: 'ID', iss, aud, at_hash, state, nonce, exp, claims }))
    }

    res.json(res.body)
  })

  app.get(paths.userinfoEndpoint, (req, res) => {
    const accessToken = (req.headers.authorization || '').substring(7)
    const payload = jwks.verifyToken(accessToken)
    if (!payload) {
      res.status(401).json({ error: 'invalid_token' })
    } else {
      const { sub, name, email } = payload
      res.type('json').json({ sub, name, email })
    }
  })

  return app
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  setup().listen(port)
}
