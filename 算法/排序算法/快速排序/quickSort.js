const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

/**
 * @param {Number[]} arr
 * @param {Number} l
 * @param {Number} r
 */
function quickSort(arr, l, r) {
  if (l >= r) return
  let x = l, //左指针
    y = r, //右指针
    base = arr[l] //取第一个元素为基准值
  // partition
  while (x < y) {
    while (x < y && arr[y] >= base) { //从数组右边往前找到第一个小于基准值的元素
      y--
    }
    if (x < y) { //把小于基准值的元素放到基准值左边，同时左指针向后一步
      arr[x++] = arr[y]
    }
    while (x < y && arr[x] <= base) { //从数组左边往后找到第一个大于基准值的元素
      x++
    }
    if (x < y) { //把大于基准值的元素放到基准值右边，同时右指针向前一步
      arr[y--] = arr[x]
    }
  }
  arr[x] = base //此时所有小于基准值的元素都在左边，大于基准值的元素都在右边
  // 到这里分别递归左半边和右半边
  quickSort(arr, l, x - 1)
  quickSort(arr, x + 1, r)
  return
}

quickSort(arr, 0, arr.length - 1)

console.log(arr) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]