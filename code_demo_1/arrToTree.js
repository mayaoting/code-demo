
function arrToTree(Items) {
    const result = []
    const itemMap = {};

    for (const item of Items) {
        const id = item.id;
        const pid = item.pid;

        if(!itemMap[id]) {
            itemMap[id] = {
                ...item,
                children: []
            }
        }
        // itemMap[id] = {
        //     ...item,
        //     children: itemMap[id]['children']
        // }
        const treeItem = itemMap[id]
        if (pid === 0) {
            result.push(treeItem)
        } else {
            if(!itemMap[pid]) {
                itemMap[pid] = {
                    children: []
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    return result;
}


let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

console.log(arrToTree(arr))


let data = [
    { id: 0, parentId: null, name: '生物' },
    { id: 1, parentId: 0, name: '动物' },
    { id: 2, parentId: 0, name: '植物' },
    { id: 3, parentId: 0, name: '微生物' },
    { id: 4, parentId: 1, name: '哺乳动物' },
    { id: 5, parentId: 1, name: '卵生动物' },
    { id: 6, parentId: 2, name: '种子植物' },
    { id: 7, parentId: 2, name: '蕨类植物' },
    { id: 8, parentId: 4, name: '大象' },
    { id: 9, parentId: 4, name: '海豚' },
    { id: 10, parentId: 4, name: '猩猩' },
    { id: 11, parentId: 5, name: '蟒蛇' },
    { id: 12, parentId: 5, name: '麻雀' }
  ]

  /**
   * 转换为树
   * @param {*} data
   * @returns
   */
  function transTree (data) {
    let result = []
    let map = {}
    if (!Array.isArray(data)) {//验证data是不是数组类型
      return []
    }
    data.forEach(item => {//建立每个数组元素id和该对象的关系
      map[item.id] = item //这里可以理解为浅拷贝，共享引用
    })
    data.forEach(item => {
      let parent = map[item.parentId] //找到data中每一项item的爸爸
      if (parent) {//说明元素有爸爸，把元素放在爸爸的children下面
        (parent.children || (parent.children = [])).push(item)
      } else {//说明元素没有爸爸，是根节点，把节点push到最终结果中
        result.push(item) //item是对象的引用
      }
    })
    return result //数组里的对象和data是共享的
  }
  console.log(transTree(data))
