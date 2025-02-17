import { genRandomData } from './random.js'
import { _globalThis } from './globalThis.js'

const map = {
  '+': '-',
  '/': '_',
  '=': ''
}
const RE_MAP = /[+/=]/g

function uint8ArrayToString(arrUint8) {
  let sUtf8 = ''
  for (let i = 0; i < arrUint8.length; i++) {
    sUtf8 += String.fromCharCode(arrUint8[i])
  }
  return sUtf8
}

/**
 * @param {number} len
 * @returns {string}
 */
function genCodeVerifier(len) {
  const binary = uint8ArrayToString(genRandomData(len))
  // @ts-ignore
  return _globalThis.btoa(binary).replace(RE_MAP, '').substring(0, len)
}

function base64Encode(hash) {
  const binary = uint8ArrayToString(new Uint8Array(hash))
  // @ts-ignore
  const encoded = _globalThis.btoa(binary).replace(RE_MAP, (m) => map[m])
  return encoded
}

function createHash(buffer, algorithm) {
  if (typeof buffer === 'string') {
    // @ts-ignore
    buffer = new _globalThis.TextEncoder().encode(buffer)
  }
  // @ts-ignore
  return _globalThis.crypto.subtle.digest(algorithm, buffer)
}

async function genPkceChallenge(pkceMethod, codeVerifier) {
  switch (pkceMethod) {
    case 'S256': {
      const hash = await createHash(codeVerifier, 'SHA-256')
      return base64Encode(hash)
    }
    default:
      throw new Error('Invalid value for pkceMethod')
  }
}

/**
 *
 * @param {'S256'|string} pkceMethod
 * @param {string} [test]
 * @returns {Promise<{codeVerifier: string, challenge: string }>}
 */
export async function pkce(pkceMethod, test) {
  const codeVerifier = test || genCodeVerifier(96)
  const challenge = await genPkceChallenge(pkceMethod, codeVerifier)
  return { codeVerifier, challenge }
}
