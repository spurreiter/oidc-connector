
export function createIframe ({ src, title }) {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', src)
  iframe.setAttribute('title', title)
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  return iframe
}
