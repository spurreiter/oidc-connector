import { _globalThis } from './globalThis.js'

export function genRandomData (len) {
  // use web crypto APIs if possible
  // @ts-ignore
  const crypto = _globalThis.crypto || _globalThis.msCrypto
  if (crypto && crypto.getRandomValues) {
    const array = new Uint8Array(len)
    crypto.getRandomValues(array)
    return Array.from(array)
  }

  // fallback to Math random
  /* c8 ignore next 5 */
  const array = new Array(len)
  for (let i = 0; i < array.length; i++) {
    array[i] = (Math.random() * 256) | 0
  }
  return array
}

export function uuid4 () {
  const arr = genRandomData(32)
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (arr.pop() & (15 >> (c / 4)))).toString(16)
  )
}
