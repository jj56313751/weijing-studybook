/*
 * @Author: 味精
 * @Date: 2021-12-12 00:00:14
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-12 00:00:14
 * @Description: file content
 */
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
 * @return {ListNode[]}
 */
 var splitListToParts = function (head, k) {
  var ans = new Array(k).fill(null)
  if(!head) return ans
  var len = 0
  var p = head
  while (p) {
      p = p.next
      len++
  }
  var subLen = len > k ? Math.floor(len / k) : 1 // 每一段长度
  var rest = len > k ? len % k : 0 // 剩余长度
  p = head
  var i = 0 //索引
  while(p) {
      var move = subLen + (rest-- > 0 ? 1 : 0) // 移动步数
      while(--move) {
          p = p.next
      }
      var next = p.next
      p.next = null
      ans[i++] = head
      head = next
      p = head
  }
  return ans
};