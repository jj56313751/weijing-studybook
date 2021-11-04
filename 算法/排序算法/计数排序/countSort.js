const arr = [0, 2, 5, 3, 7, 9, 10, 3, 7, 6]
// 简单版
function countSort(arr) {
  let max = -Infinity // 记录数组中最大的元素
  for (let v of arr) {
    max = Math.max(max, v)
  }
  // 记录每个元素出现次数
  const count = new Array(max + 1).fill(0)
  for (let v of arr) {
    count[v]++
  }
  const res = [] //结果数组
  for (let i = 0; i < count.length; i++) {
    let tmp = count[i]
    while (tmp--) {
      res.push(i)
    }
  }
  return res
}
console.log(countSort(arr)) //[0, 2, 3, 3, 5, 6, 7, 7, 9, 10]

// 优化空间浪费及有负数情况
const arr2 = [-101, 109, 107, 103, 108, 102, 103, 110, 107, 103]
function countSort_v2(arr) {
  let max = -Infinity, 
    min = Infinity //额外记录最小值
  for (let v of arr) {
    max = Math.max(max, v)
    min = Math.min(min, v)
  }
  const count = new Array(max - min + 1).fill(0) //数组长度最大值-最小值，最小值变成下标0，
  // 如果最大值和最小值差距很大，仍然存在空间浪费的情况
  for (let v of arr) {
    count[v - min]++ //需要减去最小值
  }
  const res = [] 
  for (let i = 0; i < count.length; i++) {
    let tmp = count[i]
    while (tmp--) {
      res.push(i + min) //这里要加回来
    }
  }
  return res
}
console.log(countSort_v2(arr2)) //[-101, 102, 103, 103, 103, 107, 107, 108, 109, 110]

