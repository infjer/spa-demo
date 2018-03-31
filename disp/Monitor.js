import { Event } from './Event.js';

const key = Symbol('key');
const last = Symbol('last');
const check = Symbol('check');
const timer = Symbol('timer');
const source = Symbol('source');
const interval = Symbol('interval');

export class Monitor extends Event {
    constructor(options={}) {
        super(options);
        this[last] = options.last;
        this[key] = options.key;
        this[source] = options.source || {};
        this[interval] = options.interval || 100;
    }
    [check]() {
        let event = {
            oldValue: this[last],
            newValue: this[source][this[key]]
        }
        if(event.oldValue !== event.newValue) {
            this[last] = event.newValue;
            this.emit('change', event);
        }
    }
    start() {
        if(!this[timer]) {
            this[timer] = setInterval(
                this[check].bind(this),
                this[interval]
            )
            this[check]();
        }
    }
    stop() {
        if(this[timer]) {
            this[timer] = clearInterval(
                this[timer]
            )
        }
    }
}
