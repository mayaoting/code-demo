/**
 * 数组的扁平化
 */

function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

const arr = [1,2, [3,4],5]

console.log(flatten(arr));
// const res = [1,[2,[3]]].flat(9);

function flattenES6(arr) {
    if(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr;
}
console.log(flattenES6(arr));
console.log(arr);