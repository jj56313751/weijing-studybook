const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

/**
 * @param {Number[]} arr
 * @param {Number} l
 * @param {Number} r
 */
function quickSort(arr, l, r) {
  while (l < r) {
    let x = l,
      y = r,
      base = arr[l]
    while(x < y) {
      while (x < y && arr[y] >= base) {
        y--
      }
      if (x < y) {
        arr[x++] = arr[y]
      }
      while (x < y && arr[x] <= base) {
        x++
      }
      if (x < y) {
        arr[y--] = arr[x]
      }
    }
    arr[x] = base 
    quickSort(arr, x + 1, r)
    r = x - 1 //减少一次递归
  }
}

quickSort(arr, 0, arr.length - 1)

console.log(arr)