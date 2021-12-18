const hasProto = proto => /^https?:/.test(proto)

export function absoluteUrl (url, origin) {
  if (hasProto(url)) {
    return url
  } else {
    const u = new URL(origin || window.location.origin)
    u.pathname = url
    return u.toString()
  }
}

export function clearUrl (url) {
  const parts = url.split('/').filter(Boolean)
  const proto = parts.shift()
  return (hasProto(proto)
    ? `${proto}//`
    : `/${proto}/`) + parts.join('/')
}

export function createUrl (url, query) {
  const u = new URL(url)
  if (query) {
    u.search = urlEncoded(query)
  }
  return u.toString()
}

export function urlEncoded (query) {
  return new URLSearchParams(
    Object.entries(JSON.parse(JSON.stringify(query)))
  ).toString()
}
