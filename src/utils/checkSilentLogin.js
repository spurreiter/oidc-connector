import { createPromise } from './createPromise.js'
import { createIframe } from './createIframe.js'
import { NONE } from '../constants.js'

export async function checkSilentLogin (client) {
  const { callback, endpoints, options } = client
  const promise = createPromise()

  const src = await endpoints.createLoginUrl({
    ...options,
    prompt: NONE,
    redirectUri: options.silentLoginRedirectUri
  })
  const iframe = (checkSilentLogin.mock || createIframe)({ src, title: 'oidc-silent-check-sso' })
  iframe.origin = window.location.origin

  const handleMessage = (ev) => {
    const oauth = callback.parse(ev.data)
    iframe.removeListener(handleMessage)
    if (!oauth) {
      promise.reject(new Error('silent login failed'))
    } else {
      promise.resolve(oauth)
    }
  }
  iframe.addListener(handleMessage)

  return promise
}
