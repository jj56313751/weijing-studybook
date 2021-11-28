function bucketSort(arr) {
  // 找到最大值与最小值
  let max = -Infinity,
    min = Infinity
  for (let v of arr) {
    max = Math.max(max, v)
    min = Math.min(min, v)
  }
  // 生成桶数组
  const bucketNum = Math.floor((max - min) / arr.length) + 1 //桶数量
  const bucketArr = new Array(bucketNum).fill(null).map(_ => [])
  // 每个元素放入桶
  for (let v of arr) {
    let index = Math.floor((v - min) / arr.length)
    bucketArr[index].push(v)
  }
  // 结果数组
  const res = []
  for (let item of bucketArr) {
    // 可进行其他排序
    item.sort((a, b) => a - b)
    // 输出
    for (let v of item) {
      res.push(v)
    }
  }
  return res
}

const arr = [14, 28, 10, 24, 35, 50, 39, 47]
console.log(bucketSort(arr))