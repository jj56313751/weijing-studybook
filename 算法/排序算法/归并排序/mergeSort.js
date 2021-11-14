/*
 * @Author: 味精
 * @Date: 2021-11-14 21:30:10
 * @LastEditors: 味精
 * @LastEditTime: 2021-11-14 21:30:11
 * @Description: file content
 */
var mergeSort = function (sum, l, r) {
  if (l >= r) return
  var mid = Math.floor((l + r) / 2) //中点

  mergeSort(sum, l, mid) //递归左边
  mergeSort(sum, mid + 1, r) //递归右边
  // 成为有序数组

  var temp = new Array(r - l + 1) //借助储存空间

  var k = l,
    p1 = l,
    p2 = mid + 1
  // 比较左右区间将较小的放入temp
  while (p1 <= mid || p2 <= r) {
    if (p2 > r || (p1 <= mid && sum[p1] <= sum[p2])) {
      temp[k++] = sum[p1++]
    } else {
      temp[k++] = sum[p2++]
    }
  }
  for (var i = l; i <= r; i++) sum[i] = temp[i] //储存空间拷贝回原数组
  return
}

var arr = [8, 1, 5, 6, 3, 2, 7, 4, 9]

mergeSort(arr, 0, arr.length - 1)
console.log(arr) // [1, 2, 3, 4, 5, 6, 7, 8, 9]