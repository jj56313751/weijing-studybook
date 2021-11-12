function binarySearch(arr, target) {
  var left = 0,
    right = arr.length - 1
  while (left <= right) {
    var mid = (left + right) >> 1
    if (arr[mid] === target) return mid
    else if (target < arr[mid]) right = mid - 1
    else if (target > arr[mid]) left = mid + 1
  }
  return -1
}

var arr = [-1, 2, 2, 3, 5, 8, 10],
  target = 2
console.log(binarySearch(arr, target))

// 寻找左边界
function leftBound(arr, target) {
  if (!arr.length) return -1
  var left = 0,
    right = arr.length
  while (left < right) {
    var mid = (left + right) >> 1
    if (arr[mid] === target) right = mid
    else if (target < arr[mid]) right = mid
    else if (target > arr[mid]) left = mid + 1
  }
  return left
}
console.log(leftBound(arr, target))

// 寻找右边界
function rightBound(arr, target) {
  if (!arr.length) return -1
  var left = 0,
    right = arr.length
  while (left < right) {
    var mid = (left + right) >> 1
    if(arr[mid] === target) left = mid + 1
    else if (target < arr[mid]) right = mid
    else if (target > arr[mid]) left = mid + 1
  }
  return left - 1
}
console.log(rightBound(arr, target))