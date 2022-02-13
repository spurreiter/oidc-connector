/** @typedef {import('../client').eventName} eventName */

export class EventEmitter {
  constructor () {
    this._events = {}
  }

  /**
   * @private
   * @param {eventName} eventName
   * @returns {Set} Set of listeners
   */
  _getMap (eventName) {
    if (!this._events[eventName]) this._events[eventName] = new Set()
    return this._events[eventName]
  }

  /**
   * add event listener
   * @param {eventName} eventName
   * @param {Function} listener
   * @returns {this}
   */
  on (eventName, listener) {
    this._getMap(eventName).add(listener)
    return this
  }

  /**
   * remove event listener
   * @param {eventName} eventName
   * @param {Function} listener
   * @returns {this}
   */
  off (eventName, listener) {
    this._getMap(eventName).delete(listener)
    return this
  }

  /**
   * emit event
   * @param {eventName} eventName
   * @param  {...any} args
   */
  emit (eventName, ...args) {
    for (const listener of this._getMap(eventName)) {
      listener(...args)
    }
  }
}
