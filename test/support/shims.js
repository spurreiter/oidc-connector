import crypto from 'crypto'

function digest (algorithm, buffer) {
  const map = {
    'SHA-1': 'sha1',
    'SHA-256': 'sha256',
    'SHA-384': 'sha384',
    'SHA-512': 'sha512'
  }
  const hash = crypto.createHash(map[algorithm])
  hash.update(buffer)
  return Promise.resolve(hash.digest().buffer)
}

function getRandomValues (uint8Array) {
  crypto.randomFillSync(uint8Array)
}

if (!global.crypto) {
  global.crypto = {}
}
if (!global.crypto.getRandomValues) {
  global.crypto.getRandomValues = getRandomValues
}
if (!global.crypto.subtle) {
  global.crypto.subtle = {}
}
if (!global.crypto.subtle.digest) {
  global.crypto.subtle.digest = digest
}

if (!global.atob) {
  global.atob = function atob (str) {
    return Buffer.from(str, 'base64').toString('binary')
  }
}
if (!global.btoa) {
  global.btoa = function btoa (str) {
    return Buffer.from(str, 'binary').toString('base64')
  }
}
