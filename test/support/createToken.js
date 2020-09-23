
export const createToken = ({
  sessionState = 'mystate',
  iat = -2,
  exp = 300,
  typ = 'Bearer',
  scope = 'openid',
  sub = 'f:uuid:subject',
  ...other
} = {}) => {
  const header = {
    alg: 'none',
    typ: 'JWT'
  }
  const now = (Date.now() / 1000 | 0)
  const payload = {
    exp: now + iat + exp,
    iat: now + iat,
    aud: 'audience',
    scope,
    sub,
    session_state: sessionState,
    typ,
    ...other
  }
  const base64 = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
  return [header, payload, {}].map(base64).join('.')
}
