class Stack {
  constructor() {
    this.arr = []
  }
  // 入栈
  push(element) {
    this.arr.push(element)
  }

  // 出栈
  pop() {
    return this.arr.pop()
  }

  // 栈顶
  get top() {
    return this.arr[this.arr.length - 1]
  }

  // 是否为空栈
  get isEmpty() {
    return !this.arr.length
  }

  // 栈的大小
  get size() {
    return this.arr.length
  }

  // 清空栈
  clear() {
    this.arr = []
  }

}