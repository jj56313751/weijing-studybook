const arr = [9, 7, 8, 2, 5, 1, 3, 6, 4]

function InsertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var j = i
    while (j > 0) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
      j--
    }
  }
}

InsertionSort(arr)

console.log(arr) //[1, 2, 3, 4, 5, 6, 7, 8, 9]