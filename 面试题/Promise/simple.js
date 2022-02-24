function MyPromise(excutor) {
  this._deferreds = []
  var _this = this

  function resolve(stuff) {
    _this._deferreds.forEach(function (deffered) {
      deffered(stuff)
    })
  }

  excutor(resolve)
}

MyPromise.prototype.then = function(onFulfilled) {
  this._deferreds.push(onFulfilled)
}

var pms = new MyPromise(function(resolve) {
  setTimeout(function() {
    resolve('hahah')
  }, 1000)
})
pms.then(function(res) {
  console.log(res)
})