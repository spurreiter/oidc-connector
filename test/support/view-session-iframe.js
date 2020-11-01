/* eslint no-console: off */

var CHANGED = 'changed'
var UNCHANGED = 'unchanged'
var ERROR = 'error'

var init = false

function checkState (clientId, sessionState, post) {
  var cookie = getCookie('SESSION_STATE')
  console.log('[sessionIframe] checkState "%s" "%s/%s"', cookie, clientId, sessionState)
  var c = cookie.split('/')
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
  var name = key + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trimStart()
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

  var origin = ev.origin
  var data = ev.data.split(' ')
  if (data.length !== 2) {
    return
  }

  var clientId = data[0]
  var sessionState = data[1]

  checkState(clientId, sessionState, function (result) {
    ev.source.postMessage(result, origin)
  })
}

window.addEventListener('message', receiveMessage, false)
