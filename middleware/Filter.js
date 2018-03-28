export function add(ft) {
    filters.push.apply(filters, arguments);
}

export class Filter exntends MiddleWare {
    constructor(next, options) {
        super(next, options);
        this.name = 'FILTER';
    }
    exec(context) {
        super.exec(context);
        if(!filter.length) {
            this.next(context);
            return;
        }
        let index = 0;
        let chain = () => {
            let Ft = filters[index++];
            if(Ft) {
                let chai = chain;
                let next = this.next.bind(this, context);
                if(!filter[index]) {
                    chai = next;
                }
                let ft = new Ft(next, chai, context);
                ft.on('redirect', this.redirect.bind(this));
                ft.doFilter(context);
            }
        }
        chain();
    }

}
