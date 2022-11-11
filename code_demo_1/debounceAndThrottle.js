// 多次操作，在一定事件后只执行一次
function debounce(fn, delay) {
    let t = null;
    return function() {
        if(t !== null) {
            clearTimeout(t)
        }
        let args = argument;
        t = setTimeout(() => {
            fn.call(this, args)
        }, delay);
    }
}


function throttle(fn, delay) {
    let flag = true;
    let args = arguments
    return function() {
        if(flag) {
            setTimeout(() => {
               fn.call(this, args);
               flag = true
            }, delay);
        }
        flag = false
    }
}