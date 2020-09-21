export function clearUrl (url) {
  const parts = url.split('/').filter(Boolean)
  const proto = parts.shift()
  return (/^https?:/.test(proto)
    ? `${proto}//`
    : `/${proto}/`) + parts.join('/')
}

export function createUrl (url, query) {
  const u = new URL(clearUrl(url))
  u.search = new URLSearchParams(Object.entries(JSON.parse(JSON.stringify(query))))
  return u.toString()
}
