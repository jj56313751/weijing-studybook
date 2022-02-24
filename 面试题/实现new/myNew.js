function newOperator(ctor) {
  // 需要传入一个构造函数
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  // 创建一个新对象继承构造函数的原型
  var newObj = Object.create(ctor.prototype)
  // 获取第一个参数后面的参数
  var argsArr = [].slice.call(arguments, 1)
  // 改变this指向，并传入后面的参数，并执行构造函数
  var ctorReturnResult = ctor.apply(newObj, argsArr)
  // 判断是否有手动的返回值
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  var isFunction = typeof ctorReturnResult === 'function'
  if (isObject || isFunction) {
    return ctorReturnResult
  }
  // 返回新建的对象
  return newObj;
}