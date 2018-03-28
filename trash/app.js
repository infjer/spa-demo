let mws = [];
let spa = {
    add(mw) {
        if(typeof mw === 'function') {
            mws.push(mw);
        }
    },
    dispatch(context) {
        let index = 0;
        let next = () => {
            let mw = mws[index++];
            if(mw) {
                return mw(context, next);
            }
        }
        next();
    },
}

let m = new Monitor({
    onChange(e) {
        spa.dispatch({
            request: new URL(e.newValue),
        })
    }
})
