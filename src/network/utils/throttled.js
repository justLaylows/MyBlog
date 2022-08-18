export function  throttled(fn, delay = 100) {
    let starttime = Date.now()
    return function (...args) {
        let endtime = Date.now();
        if (endtime - starttime >= delay) {
            fn.apply(this, args);
            starttime = Date.now();
        }
    }
}