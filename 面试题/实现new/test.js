var Foo = function(name) {
  this.name = name
}
Foo.prototype.say = function() {}
var f1 = new Foo('味精王')
var Foo1 = function(name) {
  this.name = name
  return 'I am Shane'
}
var Foo2 = function(name) {
  this.name = name
  return {
    age: 18
  }
}
var r1 = new Foo1('味精王')
var r2 = new Foo2('味精王')