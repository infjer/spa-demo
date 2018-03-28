import { Dispatcher } from './disp/Dispatcher.js';

let dsp = new Dispatcher({
    redirect: event => {
        location.hash = event.url
    }
})

export function start(options) {
    dsp.add(rest(options));
    dsp.add(rewrite(options));
    dsp.add(Filter);
    dsp.add(router(options));

    let monitor = new Monitor({
        key: 'href',
        source: location,
        change: event => {
            dsp.dispatch({
                request: new URL(event.newValue)
            })
        }
    })
    monitor.start();
}
