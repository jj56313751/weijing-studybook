const arr = [3, 2, 1]

function selectionSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var minIdx = i
    for (var j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
  }
}

selectionSort(arr)

console.log(arr)