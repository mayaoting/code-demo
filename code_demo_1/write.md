
typeof 可以正确识别 `undefined boolean number string symbol Function` 等类型的数据，但是
对于其他的都会认为是Object 比如 `Date, Null`, 所以通过typeof来判断数据类型是不准确的， 但是
可以使用Object.prototype.toString().call() 来实现。

```
function typeOf(obj) {
    // Object.prototype.toString() 检测对象类型 为了每个对象都能通过Object.prototype.toString()
    // 来检测，需要以Function.prototype.call() 或者Function.prototype.apply()的形式来调用
    return Object.prototype.toString.call(obj).slice(8, -1)
}

typeOf([]) // Array
```

instanceof 运算符用于检测构造函数的prototype属性是否出现再某个实例对象的原型链上

object instanceof constructor

object 某个实例对象

constructor 某个构造函数

instanceof 运算符用于检测constructor.prototype是否存在于参数object的原型链上。

```3 instanceof Number // false instanceof 是判断引用类型的```

手动实现一个instanceof

```
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
```

this

Object.prototype.hasOwnProperty()

hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性  
所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

语法： obj.hasOwnProperty(prop)

```
const object1 = {}
object1.property1 = 32;
console.log(object1.hasOwnProperty('property1'))   // true
console.log(object1.hasOwnProperty('toString'))   // false
console.log(object1.__proto__.hasOwnProperty('toString'))  // true
```
