function shallowCopy(obj) {
    if(typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            new[obj] = obj[key];
        }
    }
    return newObj
}

function deepCopy(obj) {
    if(typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}