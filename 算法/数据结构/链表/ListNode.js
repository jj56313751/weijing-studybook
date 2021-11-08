// 构造函数
function NodeList(val) {
  this.val = val ? val : null
  this.next = null
}
// 生成链表
function generateList(array) {
  let ret = new NodeList() //虚拟头节点，方便返回
  let cur = ret
  for (let i = 0; i < array.length; i++) {
    cur.next = new NodeList(array[i])
    cur = cur.next
  }
  return ret.next
}

const arr = [1, 2, 3, 4, 5]

const list = generateList(arr) // 1=>2=>3=>4=>5
/**
 * @description: 插入节点
 * @param {Number|String} index
 * @param {Number|String} val
 */
function insertNode(index, val){
  let head = list
  while(head.val !== index) { //找到节点
    head = head.next
  }
  const node = new NodeList(val) //新增待插入节点
  node.next = head.next //x节点先连上下一个节点
  head.next = node //从3的位置断开连上x节点
}
//在3之后插入x节点
insertNode(3, 'x') // list: 1=>2=>3=>x=>4=>5
/**
 * @description: 删除节点
 * @param {Number|String}
 */
function deleteNode(val){
  let head = new NodeList()
  head.next = list
  while(head.next && head.next.val !== val) { //找到待删除节点的前一个节点
    head = head.next
  }
  head.next = head.next.next ? head.next.next : null
}
// 删除节点3
deleteNode(3)
console.log(JSON.stringify(list)) // list: 1=>2=>x=>4=>5