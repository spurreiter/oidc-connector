/* eslint camelcase: off, no-console: off */

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

// --- setup

const port = 3000
const expiry = 30 // token expiry in seconds
const maxRefresh = 2 // max number of refresh token exchanges

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
      console.error(e)
    }
  }
}

function hashAccessToken (token) {
  const hash = jsrsasign.crypto.Util.hashString(token, 'sha256')
  const left = hash.substr(0, hash.length / 2)
  return jsrsasign.hextob64u(left)
}

function timingSafeEqual (_a, _b) {
  const a = _a.split('')
  const b = _b.split('')
  let diff = (a.length !== b.length)
  for (let i = 0; i < b.length; i++) {
    diff |= (a[i] !== b[i])
  }
  return (diff === 0)
}

// https://tools.ietf.org/html/rfc7636
function verifyPkce (method, challenge, verifier) {
  if (!method && !challenge && !verifier) {
    // not in pkce mode
    return true
  }

  const methods = { S256: 'sha256' }
  const algo = methods[method]
  if (!algo) return false

  const map = {
    '+': '-',
    '/': '_',
    '=': ''
  }
  const RE_MAP = /[+/=]/g

  const hash = crypto.createHash(algo)
  hash.update(Buffer.from(verifier))
  const comp = hash.digest().toString('base64').replace(RE_MAP, m => map[m])

  return timingSafeEqual(challenge, comp)
}

// --- server related stuff

const getPaths = ({ host, baseUrl, noCheckSession }) => ({
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

const originF = ({ protocol, hostname, port }) => ({ host } = {}) => {
  // ignore supertest test cases
  host = host.indexOf('127.0.0.1:') === 0 ? undefined : host
  return host
    ? `${protocol}//${host}`
    : `${protocol}//${hostname}${port ? `:${port}` : ''}`
}

const _now = () => (Date.now() / 1000 | 0)

const createToken = ({
  issuer,
  aud,
  sub,
  nonce,
  session_state,
  at_hash,
  exp = expiry,
  typ = 'Bearer',
  now = _now(),
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
    session_state,
    at_hash,
    ...claims
  }
  return payload
}

const getTokens = (jwks, {
  issuer,
  aud,
  session_state,
  nonce,
  exp = expiry,
  expRefresh,
  claims
}) => {
  const access_token = jwks.signToken(createToken({ issuer, aud, session_state, nonce, exp, claims }))
  const at_hash = hashAccessToken(access_token)
  const id_token = jwks.signToken(createToken({ typ: 'ID', issuer, aud, at_hash, session_state, nonce, exp, claims }))
  const refresh_token = jwks.signToken(
    createToken({ typ: 'Refresh', issuer, aud, session_state, nonce, exp: expRefresh || (exp * maxRefresh) })
  )
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

function logger ({ silent = false } = {}) {
  return function logger (req, res, next) {
    const start = Date.now()
    res.once('finish', () => {
      const ms = Date.now() - start
      const { method, url, body } = req
      const status = res.statusCode
      const location = res.getHeader('location')
      if (!silent) {
        console.log('%s', JSON.stringify({ status, method, url, body, location, ms }))
      }
    })
    next()
  }
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
  noCheckSession = false,
  silent = false
} = {}) {
  const jwks = new RsaKey()
  const getOrigin = originF({ protocol, hostname, port })
  const paths = getPaths({ baseUrl, noCheckSession })
  const app = express()
  const codes = new Map()

  const conf = {
    claims: {
      name: 'Alice',
      email: 'alice@wonder.land'
    }
  }

  app.use(logger({ silent }), cors({ origin: true, credentials: true }))

  app.get('/favicon.ico', (req, res) => {
    res.end()
  })

  app.get(paths.oidcUri, (req, res) => {
    const oidcConfig = getWellKnownConfig(paths, { origin: getOrigin(req.headers), noCheckSession })
    res.type('json').json(oidcConfig)
  })

  app.get(paths.jwksUri, (req, res) => {
    res.type('json').json(jwks.keys())
  })

  app.get(paths.authorizationEndpoint, (req, res) => {
    const {
      response_type = '',
      scope,
      client_id: aud,
      redirect_uri,
      state,
      response_mode,
      nonce,
      code_challenge,
      code_challenge_method
    } = req.query
    const fragmentize = url => {
      if (response_mode === 'fragment') {
        const u = new URL(url)
        u.hash = u.search.substring(1)
        u.search = ''
        return u.toString()
      }
      return url
    }

    const session_state = uuid4()

    let isValidResponseType = false
    let url
    const responseType = response_type.split(' ')
    const params = { state, session_state } // we simplify session_state here
    const issuer = `${getOrigin(req.headers)}${baseUrl}`

    const { access_token, id_token } = getTokens(jwks, { ...conf, issuer, aud, session_state, nonce })
    if (responseType.includes('code')) {
      params.code = uuid4()
      codes.set(params.code, { session_state, nonce, code_challenge, code_challenge_method })
      isValidResponseType = true
    }
    if (responseType.includes('token')) {
      params.access_token = access_token
      params.token_type = 'Bearer'
      params.expires_in = expiry
      params.scope = scope
      isValidResponseType = true
    }
    if (responseType.includes('id_token')) {
      params.id_token = id_token
      isValidResponseType = true
    }

    if (isValidResponseType) {
      url = fragmentize(createUrl(redirect_uri, params))
      res.cookie('SESSION_STATE', `${aud}/${session_state}`, { sameSite: 'strict' })
    } else {
      url = fragmentize(createUrl(redirect_uri, { error: 'unsupported_response_type', state, nonce }))
      res.clearCookie('SESSION_STATE')
    }
    res.redirect(url)
  })

  app.post(paths.tokenEndpoint, bodyParser, (req, res) => {
    const {
      grant_type,
      client_id: aud,
      refresh_token: refreshToken,
      code,
      code_verifier
    } = req.body

    let body

    const tokenResponse = (foundSession) => {
      const issuer = `${getOrigin(req.headers)}${baseUrl}`
      return {
        expires_in: conf.exp,
        token_type: 'Bearer',
        ...(getTokens(jwks, { ...conf, issuer, aud, ...foundSession }))
      }
    }

    if (grant_type === 'authorization_code' && code) {
      const foundSession = codes.get(code)
      if (!foundSession) {
        res.status(400)
        body = { error: 'invalid_grant' }
      } else {
        codes.delete(code)
        const { session_state, nonce, code_challenge, code_challenge_method } = foundSession
        if (!verifyPkce(code_challenge_method, code_challenge, code_verifier)) {
          res.status(400)
          body = { error: 'invalid_request', error_description: 'pkce verify failed' }
        } else {
          body = tokenResponse({ session_state, nonce })
        }
      }
    } else if (grant_type === 'refresh_token' && refreshToken) {
      const payload = jwks.verifyToken(refreshToken)
      if (!payload) {
        res.status(400)
        body = { error: 'invalid_grant' }
      } else {
        const { session_state, nonce, exp } = payload
        if (exp <= _now()) {
          res.status(400)
          body = { error: 'invalid_grant' }
        } else {
          const expRefresh = Math.max(0, exp - _now())
          // const expRefresh = undefined // set this if infinite refresh is desired
          const foundSession = { session_state, nonce, expRefresh }
          body = tokenResponse(foundSession)
        }
      }
    } else {
      res.status(400)
      body = { error: 'unsupported_grant_type' }
    }

    res.json(body)
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
    const { post_logout_redirect_uri, redirect_uri } = req.query
    res.clearCookie('SESSION_STATE')
    res.redirect(post_logout_redirect_uri || redirect_uri)
  })

  if (paths.checkSessionIframe) {
    app.get(paths.checkSessionIframe + '/init', cookieParser(), (req, res) => {
      console.log('===>', req.cookies, req.query)
      res.status(204).end()
    })

    app.get(paths.checkSessionIframe, (req, res) => {
      res.type('html').end(viewSessionIframe)
    })
  }

  app.get('/silent-login-check.html', (req, res) => {
    res.type('html').end(`<html><body><script>
      parent.postMessage(location.href, location.origin);
    </script></body></html>`)
  })

  return app
}

if (__filename === process.argv[1]) {
// if (module === require.main) {
  setup().listen(port)
}
