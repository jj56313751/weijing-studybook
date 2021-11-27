/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (k === 1) return head
  var ret = new ListNode(0, head)
  var pre = ret

  while (1) {
    pre.next = reverse(pre.next, k)
    var n = k
    while (n-- && pre) { // 反转完以后向后走
      pre = pre.next
    }
    if (!pre) break // 待反转数量不够跳出循环
  }

  return ret.next
};

function reverse(head, k) {
  var p = ret = q = head,
    n = k
  while (--n && p) {
    p = p.next
  }
  if (!p) return head //需要反转的节点数量小于k则不反转
  p = null
  while (k--) {
    head = head.next
    q.next = p
    p = q
    q = head
  }
  ret.next = q
  return p
}