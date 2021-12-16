/*
 * @Author: 味精
 * @Date: 2021-12-16 21:38:32
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-16 21:38:32
 * @Description: file content
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
  var ans = []
  function recursion(root, k) {
      if(!root) return
      if(!ans[k]) ans.push([])
      if(k % 2 === 0) ans[k].push(root.val)
      else ans[k].unshift(root.val)
      recursion(root.left, k + 1)
      recursion(root.right, k + 1)
  }
  recursion(root, 0)
  return ans
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
  var ans = []
  if(!root) return ans
  var queue = [root]
  var flag = true
  while(queue.length) {
      var len = queue.length
      var tmp = []
      while(len--){
          var top = queue.shift()
          if(flag) tmp.push(top.val)
          else tmp.unshift(top.val)
          top.left && queue.push(top.left)
          top.right && queue.push(top.right)
      }
      ans.push(tmp)
      flag = !flag
  }
  return ans
};
