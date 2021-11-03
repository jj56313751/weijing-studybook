class Queue {
  constructor(items) {
    this.arr = items || []
  }
  // 入队
  enqueue(element) {
    this.arr.push(element)
  }
  // 出队
  dequeue() {
    return this.arr.shift()
  }
  // 队首
  front() {
    return this.arr[0]
  }
  // 情况队列
  clear() {
    this.arr = []
  }
  // 队列大小
  get size() {
    return this.arr.length
  }
  // 是否为空
  get isEmpty() {
    return !this.arr.length
  }
}