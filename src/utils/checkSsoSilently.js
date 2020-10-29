import { createPromise } from './createPromise.js'
import { createIframe } from './createIframe.js'
import { NONE } from '../constants.js'

const MESSAGE = 'message'

export async function checkSsoSilently (client) {
  const { callback, endpoints, options } = client
  const promise = createPromise()

  const src = await endpoints.createLoginUrl({
    ...options,
    prompt: NONE,
    redirectUri: options.silentCheckSsoRedirectUri
  })
  const iframe = createIframe({ src, title: 'oidc-silent-check-sso' })

  const handleMessage = function (ev) {
    if (ev.origin !== window.location.origin || iframe.contentWindow !== ev.source) {
      return
    }
    const oauth = callback.parse(ev.data)
    document.body.removeChild(iframe)
    window.removeEventListener(MESSAGE, handleMessage)
    if (!oauth) {
      promise.reject(new Error('silent login failed'))
    } else {
      promise.resolve(oauth)
    }
  }

  window.addEventListener(MESSAGE, handleMessage)

  return promise
}
