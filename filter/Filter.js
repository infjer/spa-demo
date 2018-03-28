import { Event } from '../disp/Event.js';

const context = Symbol('context');
const chan = Symbol('chain');
const nxt = Symbol('next');

export class Filter extends Event {
    constructor(next, chain, options={}) {
        super(options);
        this[context] = options.context;
        this[chan] = chain;
        this[nxt] = next;
    }
    getContext() {
        return this[context];
    }
    redirect(config) {
        this.emit('redirect', config);
    }
    chain() {
        if(this[chan]) {
            this[chan]();
        }
    }
    next() {
        if(this[nxt]) {
            this[nxt]();
        }
    }
}
