import * as crypto from 'node:crypto'

const SECOND = 1000
const MINUTE = 60 * SECOND

const algMap = {
  RS256: 'rsa-sha256',
  RS384: 'rsa-sha384',
  RS512: 'rsa-sha512'
}

/**
 * @param {number} [date]
 * @returns {number}
 */
const seconds = (date = Date.now()) => Math.floor(date / 1000)

/**
 * @param {string} [type]
 * @param {number} [modulusLength]
 * @returns {{publicKey: crypto.KeyObject, privateKey: crypto.KeyObject}}
 */
export const generateKeypair = (type = 'rsa', modulusLength = 1024) => {
  return crypto.generateKeyPairSync(type.toLowerCase(), {
    modulusLength
    // publicKeyEncoding: {
    //   type: 'spki',
    //   format: 'pem'
    // },
    // privateKeyEncoding: {
    //   type: 'pkcs8',
    //   format: 'pem',
    //   cipher: 'aes-256-cbc',
    //   passphrase: 'top secret'
    // }
  })
}

/**
 * @param {crypto.KeyObject} publicKey
 * @returns {}
 */
export const toJwks = (publicKey) => publicKey.export({ format: 'jwk' })

/**
 * @typedef {header: object, payload: object, headerPayload64: string, parts: (Buffer|undefined)[]} JwtDecoded
 */
/**
 * @param {string} base64
 * @returns {Buffer}
 */
const toBuffer = (base64 = '') => Buffer.from(base64, 'base64url')
/**
 * @param {Buffer} buffer
 * @returns {any}
 */
const parse = (buffer) => JSON.parse(buffer || 'null')
/**
 * @param {string} token
 * @returns {JwtDecoded}
 */
export function jwtDecode(token) {
  const parts64 = String(token || '').split('.')
  const headerPayload64 = [parts64[0], parts64[1]].join('.')
  const parts = parts64.map((part) => (part ? toBuffer(part) : undefined))
  const header = parse(parts[0])
  const payload = parse(parts[1])
  return { header, payload, headerPayload64, parts }
}

const toBase64 = (str = '') => Buffer.from(str).toString('base64url')
const stringify = (obj) => JSON.stringify(obj)

/**
 * @param {{alg: string}} header
 * @param {object} payload
 * @param {{expires: number, privateKey: crypto.KeyObject}} opts
 * @returns {string} token
 */
export function jwtSign(header, payload, opts) {
  const { expires = MINUTE * 5, privateKey } = opts || {}
  const { alg } = header
  const algorithm = algMap[alg]
  if (!algorithm) {
    throw new TypeError(`unsupported algorithm "${alg}"`)
  }

  if (payload.iat === undefined) {
    payload.iat = seconds()
  }
  if (payload.exp === undefined) {
    payload.exp = seconds(Date.now() + (expires || 0))
  }
  const header64 = toBase64(stringify({ ...header, typ: 'JWT' }))
  const payload64 = toBase64(stringify(payload))
  const headerPayload64 = [header64, payload64].join('.')

  let signature = ''
  if (!privateKey) {
    throw new TypeError('missing key')
  }
  const keyObject =
    privateKey instanceof crypto.KeyObject
      ? privateKey
      : crypto.createPrivateKey(privateKey)

  if (!keyObject || keyObject.asymmetricKeyType !== 'rsa') {
    throw new TypeError('Invalid key; asymmetricKeyType must be rsa')
  }
  signature = crypto
    .sign(algorithm, Buffer.from(headerPayload64), keyObject)
    .toString('base64url')

  return [header64, payload64, signature].join('.')
}

/**
 * @typedef {{audiences?: string[], publicKey: crypto.KeyObject}} JwtVerifyOptions
 */
/**
 * @param {string} token
 * @param {JwtVerifyOptions} options
 * @returns {{header: object, payload: object}|null}
 */
export function jwtVerify(token, options) {
  const decoded = jwtDecode(token)
  const isValid = verifySignature(decoded, options)
  if (!isValid) {
    return null
  }
  const { header, payload } = decoded
  return { header, payload }
}

/**
 * @param {JwtDecoded} decoded
 * @param {JwtVerifyOptions} options
 * @returns {{header: object, payload: object}|null}
 */
export function verifySignature(decoded, options) {
  const { header, payload, headerPayload64, parts } = decoded
  const { audiences, publicKey } = options
  const { alg } = header || {}
  const algorithm = algMap[alg]
  if (!algorithm) {
    throw new TypeError(`unsupported algorithm "${alg}"`)
  }

  if (!parts || !parts[2]) {
    throw new Error('missing signature')
  }
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('JWT expired')
  }
  if (audiences && !audiences.includes(payload.aud)) {
    throw new Error('bad audience')
  }
  if (!publicKey) {
    throw new Error('missing publicKey')
  }
  const keyObject =
    publicKey instanceof crypto.KeyObject
      ? publicKey
      : crypto.createPublicKey(publicKey)
  const isOk = crypto.verify(
    algorithm,
    Buffer.from(headerPayload64),
    keyObject,
    parts[2]
  )

  return isOk ? { header, payload } : null
}
