/** @typedef {import('../client').eventName} eventName */
export class EventEmitter {
    _events: {};
    /**
     * @private
     * @param {eventName} eventName
     * @returns {Set} Set of listeners
     */
    private _getMap;
    /**
     * add event listener
     * @param {eventName} eventName
     * @param {Function} listener
     * @returns {this}
     */
    on(eventName: eventName, listener: Function): this;
    /**
     * remove event listener
     * @param {eventName} eventName
     * @param {Function} listener
     * @returns {this}
     */
    off(eventName: eventName, listener: Function): this;
    /**
     * emit event
     * @param {eventName} eventName
     * @param  {...any} args
     */
    emit(eventName: eventName, ...args: any[]): void;
}
export type eventName = import("../client").eventName;
