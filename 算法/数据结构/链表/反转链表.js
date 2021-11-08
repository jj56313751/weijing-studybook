function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))

function reverse(head) {
  var p = head, 
    q = null
  while(head) {
    head = head.next
    p.next = q //断开链接
    q = p
    p = head
  }
  return q
}
console.log(reverse(head))
