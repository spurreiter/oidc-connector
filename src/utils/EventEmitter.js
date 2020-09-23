export class EventEmitter {
  constructor () {
    this._events = {}
  }

  _getMap (eventName) {
    if (!this._events[eventName]) this._events[eventName] = new Map()
    return this._events[eventName]
  }

  on (eventName, listener) {
    this._getMap(eventName).set(listener, listener)
    return this
  }

  off (eventName, listener) {
    this._getMap(eventName).delete(listener)
    return this
  }

  emit (eventName, ...args) {
    for (const [_, listener] of this._getMap(eventName)) { // eslint-disable-line no-unused-vars
      listener(...args)
    }
  }
}
