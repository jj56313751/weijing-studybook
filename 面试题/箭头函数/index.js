var f = v => v

// 等同于
var f = function (v) {
  return v
}

var sum = (num1, num2) => {
  var total = num1 + num2
  return total
}

var f = () => console.log(arguments)

//报错
f(); // arguments is not defined

// rest 参数
var f = (...args) => console.log(args)

f(1, 2, 3, 4) // [1, 2, 3, 4]

var F = () => {}

var f = new F() // F is not a constructor

var age = 18
var arr = () => console.log("I am " + this.age + ' years old')
var obj = {
    age: '28'
}
arr.call(obj) // I am 18 years old