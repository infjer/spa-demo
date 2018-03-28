import { MiddleWare } from './MiddleWare.js';

const pathname = Symbol('pathname');

export function router(options) {
    let routes = options || {};
    let current = null;
    return class Router extends MiddleWare {
        constructor(next, options) {
            super(next, options);
            this.name = 'ROUTER';
        }
        exec(context) {
            super.exec(context);
            let name = context.request.pathname;
            let module = routes[name];
            if(!module) {
                this.redirect('/404');
                return;
            }
            let event = {
                url: name,
                newModule: module,
                oldValue: current
            }
            if(!(module instanceof Module)) {
                module = new Module(options);
                routes[name] = module;
                module.build(context);
                this.emit('build', event);
            }
            if(module === current) {
                module.refresh(context);
                this.emit('refresh', event);
            } else {
                if(current) {
                    current.hide();
                }
                current = module;
                current.show(context);
                this.emit('show', event);
            }
            this.next();
        }
    }
}
