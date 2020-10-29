/* eslint camelcase: 0 */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { URL, URLSearchParams, fileURLToPath } from 'url'
import jsrsasign from 'jsrsasign'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const getPaths = ({ baseUrl, noCheckSession }) => ({
  issuer: baseUrl,
  oidcUri: baseUrl + '/.well-known/openid-configuration',
  jwksUri: baseUrl + '/certs',
  authorizationEndpoint: baseUrl + '/auth',
  tokenEndpoint: baseUrl + '/token',
  userinfoEndpoint: baseUrl + '/userinfo',
  endSessionEndpoint: baseUrl + '/logout',
  checkSessionIframe: !noCheckSession ? baseUrl + '/login-status-iframe.html' : undefined
})

const getWellKnownConfig = (paths, { origin = '' }) => {
  const { oidcUri, ...rest } = paths
  return Object.entries(rest).reduce((o, [key, val]) => {
    o[toSnakeCase(key)] = origin + val
    return o
  }, {})
}

const createToken = ({
  issuer,
  aud,
  sub,
  nonce,
  state,
  at_hash,
  exp = 300,
  typ = 'Bearer',
  now = (Date.now() / 1000 | 0),
  claims
}) => {
  const payload = {
    exp: now + exp,
    iat: now,
    jti: uuid4(),
    iss: issuer,
    aud,
    acr: 1,
    typ,
    sub,
    nonce,
    session_state: state,
    sid: state, // TODO verify
    at_hash,
    ...claims
  }
  return payload
}

const getTokens = (jwks, {
  issuer,
  aud,
  state,
  nonce,
  exp,
  claims
}) => {
  const access_token = jwks.signToken(createToken({ issuer, aud, state, nonce, exp, claims }))
  const at_hash = hashAccessToken(access_token)
  const id_token = jwks.signToken(createToken({ typ: 'ID', issuer, aud, at_hash, state, nonce, exp, claims }))
  const refresh_token = jwks.signToken(createToken({ typ: 'Refresh', issuer, aud, state, nonce, exp: exp * 5 }))
  return {
    access_token,
    id_token,
    refresh_token
  }
}

const viewSessionIframe = `<html>
<body>
<script>
${fs.readFileSync(`${__dirname}/view-session-iframe.js`)}
</script>
</body>
</html>
`

// --- express middlewares

function logger (req, res, next) {
  const start = Date.now()
  res.once('finish', () => {
    const ms = Date.now() - start
    const { method, url } = req
    const status = res.statusCode
    console.log('%j', { status, method, url, ms })
  })
  next()
}

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
      next()
    } catch (err) {
      req.body = { text, err }
      next(err)
    }
  })
  res.on('error', (err) => next(err))
}

// --- server

// https://openid.net/specs/openid-connect-core-1_0.html
// https://tools.ietf.org/html/rfc6749
export function setup ({
  baseUrl = '/oidc',
  protocol = 'http:',
  hostname = 'localhost',
  port = 3000,
  noCheckSession = false
} = {}) {
  const jwks = new RsaKey()
  const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`
  const issuer = `${origin}${baseUrl}`
  const paths = getPaths({ baseUrl, noCheckSession })
  const oidcConfig = getWellKnownConfig(paths, { origin, noCheckSession })
  const app = express()
  const nonces = new Map()

  const conf = {
    exp: 30,
    claims: {
      name: 'Alice',
      email: 'alice@wonder.land'
    }
  }

  app.use(logger, cors({ origin: true, credentials: true }))

  app.get(paths.oidcUri, (req, res) => {
    res.type('json').json(oidcConfig)
  })

  app.get(paths.jwksUri, (req, res) => {
    res.type('json').json(jwks.keys())
  })

  app.get(paths.authorizationEndpoint, (req, res) => {
    const { response_type = '', /* scope, */ client_id: aud, redirect_uri, state, response_mode, nonce } = req.query
    const fragmentize = url => {
      if (response_mode === 'fragment') {
        const u = new URL(url)
        u.hash = u.search.substring(1)
        u.search = ''
        return u.toString()
      }
      return url
    }

    state && nonces.set(state, nonce)

    let isValidResponseType = false
    let url
    const params = { state }

    const { access_token, id_token } = getTokens(jwks, { issuer, aud, state, nonce, ...conf })
    if (response_type.includes('code')) {
      params.code = uuid4()
      isValidResponseType = true
    }
    if (response_type.includes('token')) {
      params.access_token = access_token
      params.token_type = 'Bearer'
      isValidResponseType = true
    }
    if (response_type.includes('id_token')) {
      params.id_token = id_token
      isValidResponseType = true
    }

    if (isValidResponseType) {
      url = fragmentize(createUrl(redirect_uri, params))
      res.cookie('SESSION_STATE', `${aud}/${state}`)
    } else {
      url = fragmentize(createUrl(redirect_uri, { error: 'unsupported_response_type', state, nonce }))
      res.clearCookie('SESSION_STATE')
    }
    res.redirect(url)
  })

  app.post(paths.tokenEndpoint, bodyParser, cookieParser(), (req, res) => {
    const {
      grant_type,
      client_id: aud
      // code,
      // redirect_uri,
    } = req.body

    // eslint-disable-next-line
    const [_, state] = (req.cookies.SESSION_STATE || '').split('/')
    const nonce = state && nonces.get(state)
    nonces.delete(state)

    if (!['authorization_code', 'refresh_token'].includes(grant_type)) {
      res.status(400).type('json').json({ error: 'invalid_request' })
      return
    }

    res.body = {
      expires_in: conf.exp,
      token_type: 'Bearer',
      ...(getTokens(jwks, { issuer, aud, state, nonce, ...conf }))
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

  app.get(paths.endSessionEndpoint, (req, res) => {
    const { redirect_uri } = req.query
    res.clearCookie('SESSION_STATE')
    res.redirect(redirect_uri)
  })

  if (paths.checkSessionIframe) {
    app.get(paths.checkSessionIframe, (req, res) => {
      res.type('html').end(viewSessionIframe)
    })
  }

  return app
}

if (__filename === process.argv[1]) {
// if (module === require.main) {
  setup().listen(port)
}
