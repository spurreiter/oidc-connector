import crypto from 'node:crypto'
import { atob, btoa } from 'node:buffer'
import { JSDOM } from 'jsdom'
import { MemoryStorage } from '../../src/utils/storage.js'

const defaultHtml =
  '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'

export const shim = () => {
  if (!globalThis.crypto) {
    globalThis.crypto = {}
  }
  if (!globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues = (uint8Array) => crypto.randomFillSync(uint8Array)
  }
  if (!globalThis.crypto.subtle) {
    globalThis.crypto.subtle = {}
  }
  if (!globalThis.crypto.subtle.digest) {
    globalThis.crypto.subtle.digest = (algorithm, buffer) => {
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
  }
  if (!globalThis.localStorage) {
    globalThis.localStorage = new MemoryStorage()
  }

  if (!globalThis.atob) {
    globalThis.atob = atob
  }
  if (!globalThis.btoa) {
    globalThis.btoa = btoa
  }
}

export const jsdom = (html = defaultHtml, opts = {}) => {
  const dom = new JSDOM(html, {
    url: 'https://www.example.com',
    ...opts
  })
  const keys = ['document', 'navigator', 'location', 'window', 'SVGElement', 'Element']
  Object.assign(
    globalThis,
    Object.fromEntries(keys.map((key) => [key, dom.window[key]]))
  )
  shim()
}
