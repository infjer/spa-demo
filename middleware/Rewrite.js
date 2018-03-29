import { MiddleWare } from './MiddleWare.js';

export function rewrite(options) {
    let rules = options.rules || [];
    rules.forEach(item => {
        let { target, matcher } = item;
        if(typeof target !== 'function') {
            item.target = ctx => target;
        }
        if(typeof matcher === 'function') return;
        if(typeof matcher === 'string') {
            item.matcher = ctx => ctx.request.pathname === matcher;
            return;
        }
        if(matcher instanceof RegExp) {
            item.matcher = ctx => matcher.test(ctx.request.pathname);
            return;
        }
    })

    return class Rewrite extends MiddleWare {
        constructor(next, options) {
            super(next, options);
            this.name = 'REWRITE';
        }
        exec(context) {
            super.exec(context);
            let ret = rules.find(function(it) {
                return it.matcher(context);
            })
            if(!!ret) {
                let target = ret.target(context);
                context.request.pathname = target;
                if(!!context.hash) {
                    context.hash.pathname = target;
                }
            }
            this.next();
        }
    }
}
