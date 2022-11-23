
const PromiseAll = (arr) => {
  const resolve = []
  arr.forEach(element => {
    const result =  new Promise((resolve, reject) => {
      resolve(element)
    })
    resolve.push(result)
  });
  
}

function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promiseArr)) {
      throw new TypeError('error')
    }
    let res = [];
    let resolvedCounter = 0;
    const promiseNum = promiseAll.length;
    for(let i=0; i< promiseNum; i++) {
      Promise.resolve(promiseArr[i]).then((value) => {
        resolvedCounter++;
        res[i] = value;
        if(resolvedCounter === promiseNum) {
          resolve(res)
        }
      }).catch((error) = reject(error))
    }
  }) 
}