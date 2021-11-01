const arr = [7, 6, 9, 3, 1, 5, 2, 4, 0]

function ShellSort(arr) {
  var len = arr.length
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < len; i++) {
      var j = i + gap
      while (j > 0 && j < len) {
        if (arr[j] < arr[j - gap]) {
          [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
        } else {
          break
        }
        j -= gap
      }
    }
  }
}

ShellSort(arr)

console.log(arr) // [0, 1, 2, 3, 4, 5, 6, 7, 9]