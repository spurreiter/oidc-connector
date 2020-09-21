export function genRandomData (len) {
  // use web crypto APIs if possible
  const crypto = window.crypto || window.msCrypto
  if (crypto && crypto.getRandomValues && Uint8Array) {
    const array = new Uint8Array(len)
    crypto.getRandomValues(array)
    return array
  }

  // fallback to Math random
  const array = new Array(len)
  for (let j = 0; j < array.length; j++) {
    array[j] = Math.floor(256 * Math.random())
  }
  return array
}

export function uuid4 () {
  const arr = genRandomData(32)
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (arr.pop() & (15 >> (c / 4)))).toString(16)
  )
}
