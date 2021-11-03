const arr = [7, 6, 9, 3, 1, 5, 2, 4, 0]

function ShellSort(arr) {
  var len = arr.length
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < len; i++) {
      var j = i
      var tmp = arr[j]
      if(arr[j] < arr[j - gap]){
        while (j - gap >=0 && tmp < arr[j - gap]) {
          arr[j] = arr[j - gap]
          j -= gap
        }
        arr[j] = tmp
      }
    }
  }
}

ShellSort(arr)

console.log(arr) // [0, 1, 2, 3, 4, 5, 6, 7, 9]