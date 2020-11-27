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
  await iframe.create(window.location.origin)
  const timerId = setTimeout(() => {
    // iframe did not load yet. Force login...
    promise.reject(new Error('login_required'))
  }, options.silentLoginWait * 1000)

  const handleMessage = (ev) => {
    clearTimeout(timerId)
    iframe.removeListener(handleMessage)
    const oauth = callback.parse(ev.data)
    if (!oauth) {
      promise.reject(new Error('login_required'))
    } else {
      promise.resolve(oauth)
    }
  }
  iframe.addListener(handleMessage)

  return promise
}
