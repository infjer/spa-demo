import { MiddleWare } from './MiddleWare.js';

export function rest(options) {
    let matchers = options.matcher || [];
    matchers.forEach((it, index, list) => {
        list[index] = str2matcher(it);
    })
    function str2matcher(url) {
        let ret = {
            url,
            keys: []
        }
        let reg = url.replace(/:(.+?)(?=\/|$)/g, function($1, $2) {
            ret.keys.push($2);
            return '([^/]+?)';
        })
        ret.matcher = new RegExp(`^${reg}(?=/|$)`, 'gi');
        return ret;
    }
    function gerParams(path) {
        let ret = {};
        matcher.find(function(it) {
            it.matcher.lastIndex = -1;
            let res = it.matcher.exec(path);
            if(res) {
                it.keys.forEach(function(key, index) {
                    ret[key] = res[index + 1] || '';
                })
                return true;
            }
        })
        return ret;
    }

    return class RESTParser extends MiddleWare {
        constructor(next, options) {
            super(next, options);
            this.name = 'REST_PARSER';
        }
    }
}
