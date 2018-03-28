const evtname = Symbol('events');

export class Event {
    contructor(options={}) {
        this[evtname] = {};
        Object.keys(options).forEach(key => {
            let it = options[key];
            if(typeof it === 'function') {
                this.on(key, it);
            }
        }, this)
    }
    on(type, listener) {
        let list = this[evtname][type];
        if(!list) {
            list = [];
            this[evtname][type] = list;
        }
        if(typeof listener === 'function') {
            list.push(listener);
        }
    }
    off(type, listener) {
        let list = this[evtname][type];
        if(!list || !list.length) return;
        let index = list.indexOf(listener);
        if(index >= 0) {
            list.splice(index, 1);
        }
    }
    emit(type, ...args) {
        let list = this[evtname][type];
        if(list && list.length > 0) {
            list.forEach(item => item.apply(null, args));
        }
    }
}
