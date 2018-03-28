import { Event } from '../disp/Event.js';

const nxt = Symbol('next');
const context = Symbol('context');

export class MiddleWare extends Event {
    constructor(next, options={}) {
        super(options);
        this.name = 'MIDDLEWARE';
        this[nxt] = next;
        this[context] = options.context;
    }
    getContext() {
        return this[context];
    }
    next() {
        if(this[nxt]) {
            this[nxt]();
        }
    }
    redirect(config) {
        this.emit('redirect', config);
    }
    exec() {
        console.log(`exec middleware ${this.name}`);
    }
}
