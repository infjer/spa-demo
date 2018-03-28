function Monitor(opt) {
    opt = opt || {};
    let last = null;
    let runURLCheck = () => {
        let url = location.href;
        if(url !== last) {
            let event = {
                oldValue: last,
                newValue: url,
            }
            last = url;
            if(typeof opt.onChange === 'function') {
                opt.onChange(event);
            }
        }
    }
    window.setInterval(runURLCheck, 500);
}
