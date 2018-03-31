import { Event } from './Event.js';
import { MiddleWare } from '../middleware/MiddleWare.js';

const middleware = Symbol('middleware');

export class Dispatcher extends Event {
    constructor(options) {
        super(options);
        this[middleware] = [];
    }
    add() {
        this[middleware].push.apply(this[middleware], arguments)
    }
    redirect(url) {
        this.emit('redirect', { url });
    }
    dispatch(context) {
        let index = 0;
        let list = this[middleware];
        let next = () => {
            let _MiddleWare = list[index++];
            if(_MiddleWare) {
                let mw = new MiddleWare(next, {
                    context,
                    redirect: this.redirect.bind(this)
                })
                return mw.exec(context);
            }
        }
        return next();
    }
}
