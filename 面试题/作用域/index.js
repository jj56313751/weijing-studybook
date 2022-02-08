var color = 'blue'

function changeColor() {
  var anotherColor = 'red'

  function swapColors() {
    var tmpColor = anotherColor
    anotherColor = color
    color = tmpColor
    // 这里可以访问 color, anotherColor, tmpColor
  }
  // 这里可以访问 color, anotherColor，不能访问 tmpColor
  swapColors()
}
// 这里只能访问 color
changeColor()

console.log('color is now ' + color)

for(var i = 0; i < 10; i++) {
  console.log(i)
}

console.log(i) // 10

for(let j = 0; j < 10; i++) {
  console.log(j)
}

console.log(j) // j is not defined