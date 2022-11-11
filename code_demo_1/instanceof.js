function instanceofFun(a, b){
    // 需要处理基础类型
    if(a ===null || a === undefined) return false;
    if(['string', 'boolean', 'number'].includes(typeof a)) return false;
    let prototypeA = Object.getPrototypeOf(a)
    let prototypeB = b.prototype;
    while(prototypeA) {
        if(prototypeA === prototypeB) return true;
        prototypeA = Object.getPrototypeOf(prototypeA)  // 去原型链上找
    }
    return false;
}
console.log(instanceofFun(new Number(1), Number)) // true
console.log(instanceofFun('new Number(1)', String)) // false
console.log('asd' instanceof String) // false
console.log(typeof 'a') // string