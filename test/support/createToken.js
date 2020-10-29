
export const createToken = ({
  skew = 2, // server is 2 seconds ahead in time
  sessionState = 'mystate',
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
    exp: now + skew + exp,
    iat: now + skew,
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
