var arr = [3, 1, 4, 5, 2, 9, 8, 12]
var stack = []

for (var i = 0; i < arr.length; i++) {
  var tmp = arr[i]
  while(stack.length && stack[stack.length - 1] >= tmp) {
    stack.pop()
  }
  stack.push(tmp)
}

console.log(stack)