function bubbleSort(arr) {
  var n = arr.length
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n - 1 - i; j++){
      if(arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
}

var arr = [4, 5, 3, 2, 1]
bubbleSort(arr)
console.log(arr)