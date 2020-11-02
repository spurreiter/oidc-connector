/* eslint no-console: off */

const CHANGED = 'changed'
const UNCHANGED = 'unchanged'
const ERROR = 'error'

let init = false

function checkState (clientId, sessionState, post) {
  const cookie = getCookie('SESSION_STATE')
  console.log('[sessionIframe] checkState "%s" "%s/%s"', cookie, clientId, sessionState)
  const c = cookie.split('/')
  if (!init && !c[1] && !c[2]) { // can't read cookie, maybe 3rd party cookies are blocked...
    post(ERROR)
  } else if (sessionState === c[1] && clientId === c[0]) {
    post(UNCHANGED)
  } else {
    post(CHANGED)
  }
  init = true
}

function getCookie (key) {
  const name = key + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trimStart()
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length))
    }
  }
  return ''
}

function receiveMessage (ev) {
  if (typeof ev.data !== 'string') {
    return
  }

  const origin = ev.origin
  const data = ev.data.split(' ')
  if (data.length !== 2) {
    return
  }

  const clientId = data[0]
  const sessionState = data[1]

  checkState(clientId, sessionState, function (result) {
    ev.source.postMessage(result, origin)
  })
}

window.addEventListener('message', receiveMessage, false)
