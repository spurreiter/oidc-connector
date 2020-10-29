import crypto from 'crypto-hash'

import { genRandomData } from './utils/index.js'

const map = {
  '+': '-',
  '/': '_',
  '=': ''
}
const RE_MAP = /[+/=]/g

function uint8ArrayToString (arrUint8) {
  var sUtf8 = ''
  for (let i = 0; i < arrUint8.length; i++) {
    sUtf8 += String.fromCharCode(arrUint8[i])
  }
  return sUtf8
}

function genCodeVerifier (len) {
  const binary = uint8ArrayToString(genRandomData(len))
  return window.btoa(binary).replace(RE_MAP, '').substring(0, len)
}

function base64Encode (hash) {
  const binary = uint8ArrayToString(new Uint8Array(hash))
  const encoded = window.btoa(binary).replace(RE_MAP, m => map[m])
  return encoded
}

async function genPkceChallenge (pkceMethod, codeVerifier) {
  switch (pkceMethod) {
    case 'S256': {
      const hash = await crypto.sha256(codeVerifier, { outputFormat: null })
      return base64Encode(hash)
    }
    default:
      throw new Error('Invalid value for pkceMethod')
  }
}

export async function pkce (pkceMethod, test) {
  const codeVerifier = test || genCodeVerifier(96)
  const challenge = await genPkceChallenge(pkceMethod, codeVerifier)
  return { codeVerifier, challenge }
}
