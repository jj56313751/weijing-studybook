/*
 * @Author: 味精
 * @Date: 2021-12-11 23:58:52
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-11 23:58:53
 * @Description: file content
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListN
 */
 var partition = function (head, x) {
  var r1 = new ListNode(-1)
  var r2 = new ListNode(-1)
  var p = r1, q = r2
  while (head) {
      var next = head.next
      head.next = null
      if (head.val < x) {
          p.next = head 
          p = p.next
      } else {
          q.next = head
          q = q.next
      }
      head = next
  }
  p.next = r2.next
  return r1.next
};