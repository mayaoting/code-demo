function unique(arr) {
    var res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
    return res;
}

const arr = [1,2,4,6,6,7,0]

console.log(unique(arr))

const res = arr => [...new Set(arr)]
console.log(res(arr))