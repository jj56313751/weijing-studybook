class Heap {
  constructor(arr = [], cmp = (a, b) => a < b) {
    this.arr = arr // 用数组实现堆
    this.cmp = (a, b) => cmp(a, b) //比较函数
    this.heapify() // 初始化调整成堆的性质
  }

  // 堆的长度
  size() {
    return this.arr.length
  }

  // 返回堆顶元素
  top() {
    if (!this.size()) return null
    return this.arr[0]
  }

  // 初始化调整
  heapify() {
    if (this.size() < 2) return
    for (let i = 1; i < this.size(); i++) {
      this.bubbleUp(i) // 遍历每一个元素向上调整
    }
  }

  // 插入元素
  push(val) {
    this.arr.push(val) // 堆尾插入
    this.bubbleUp(this.size() - 1) // 向上调整
  }

  // 弹出元素
  pop() {
    if (!this.size()) return null
    if (this.size() === 1) return this.arr.pop()
    var top = this.top()
    this.arr[0] = this.arr.pop() // 堆尾元素与堆首交换
    this.bubbleDown(0) // 向下调整
    return top
  }

  // 向上调整
  bubbleUp(index) {
    while (index) {
      const parentIndex = Math.floor((index - 1) / 2) // 当前元素的父元素
      if (this.cmp(this.arr[index], this.arr[parentIndex])) { //符合条件就交换
        [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]]
        index = parentIndex
      } else { 
        // 说明不需要交换已经在正确的位置跳出循环
        break
      }
    }
  }

  // 向下调整
  bubbleDown(index) {
    const lastIndex = this.size() - 1 // 堆尾元素
    while (index < lastIndex) { 
      let findIndex = index // 当前元素
      let leftIndex = index * 2 + 1 // 左孩子
      let rightIndex = index * 2 + 2 // 右孩子
      // 与左孩子比较
      if (leftIndex <= lastIndex && this.cmp(this.arr[leftIndex], this.arr[findIndex])) {
        findIndex = leftIndex
      }
      // 与右孩子比较
      if (rightIndex <= lastIndex && this.cmp(this.arr[rightIndex], this.arr[findIndex])) {
        findIndex = rightIndex
      }
      // 如果已经找到需要交换的索引值
      if (findIndex > index) {
        // 交换元素
        [this.arr[findIndex], this.arr[index]] = [this.arr[index], this.arr[findIndex]]
        index = findIndex
      } else { 
        // 说明不需要交换已经在正确的位置跳出循环
        break
      }
    }
  }
}

let arr = [2,4,5,6,1,7,8]
const heap = new Heap(arr)
console.log('init', heap.arr)
// heap.push(10)
// console.log(heap.arr)
// heap.push(11)
// console.log(heap.arr)
console.log(heap.pop())
console.log(heap.arr)
console.log(heap.pop())
console.log(heap.arr)
console.log(heap.pop())
console.log(heap.arr)
console.log(heap.pop())
console.log(heap.arr)