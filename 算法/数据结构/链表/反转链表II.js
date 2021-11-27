/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  var ret = new ListNode(null, head)
  var cnt = right - left + 1 // 需要反转区间的个数
  var pre = ret
  while (--left) {
    pre = pre.next
  }
  pre.next = reverse(pre.next, cnt) // 必须反转p.next，如果直接反转p，p的前一个元素仍然指向p，中间反转的部分都被略过了
  return ret.next
};

function reverse(head, cnt) {
  var p = null,
    q = ret = head
  while (cnt--) {
    head = head.next
    q.next = p
    p = q
    q = head
  }
  ret.next = q // 原来的头节点已经指向了null，再连接上反转后的下一个元素
  return p
}