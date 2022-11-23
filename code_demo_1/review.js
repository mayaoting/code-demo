function flatten(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    if (Array.isArray(ary[i])) {
      result = result.concat(flatten(ary[i]))
    } else if (ary[i] !== undefined){
      result.push(ary[i])
    }   
  }
  return result;
}

console.log(flatten([1,4,[5,6,7,8,undefined]]))

function throttle(func, await) {
  let timeout = null;
  return function() {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func()
      },await)
    }
  }
}

function timeThrottle(func, await) {
  let now = Date.now();
  return function () {
    let current = Date.now()
    if(current - now > await) {
      func();
      current = Date,now();
    }
  }
}
const source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}]
function arrToTree(arr) {
  let result = []
  if(!Array.isArray(arr)) {
    return result;
  }
  let map = {}
  arr.forEach((item) => {
    map[item.id] = item;
  })
  arr.forEach((item) => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children=[])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

arrToTree(source)

const treeObj =
  {
    "id": 1,
    "pid": 0,
    "name": "body",
    "children": [
      {
        "id": 2,
        "pid": 1,
        "name": "title",
        "children": [
          {
            "id": 3,
            "pid": 2,
            "name": "div"
          }
        ]
      }
    ]
  }

function objTreeToarr(objTree) {
  let result = []
  if (Object.keys(objTree).length === 0) {
    return result
  }
  if (objTree.children) {
    
  }
}

objTreeToarr(treeObj)