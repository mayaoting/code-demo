// const getCurrentModelLevelsArr = (firstArr, secondArr) => firstArr.filter((item) => secondArr.indexOf(item) > -1);
// const newArr = getCurrentModelLevelsArr([], ['LOD', 'LOD2', 'LOD3', 'LOD4']);
// console.log(111, newArr);
/**
 * 返回两个数组的重复项
 * @param {string[]} firstArr
 * @param {string[]} secondArr
 * @returns {string[]}
 */
const getCurrentModelLevelsArr = (firstArr, secondArr) => {
    const newArr = [new Set(firstArr), new Set(secondArr)].sort((a,b) => a.length - b.length)
    console.log(newArr)
    const result = [];
    newArr[0].forEach((item) => {
        if(newArr[1].has(item)) {
            result.push(item)
        }
    });
    return result
}

console.log(getCurrentModelLevelsArr(['LOD', 'LOD2', 'LOD3'], ['LOD', 'LOD2', 'LOD3', 'LOD4']));

