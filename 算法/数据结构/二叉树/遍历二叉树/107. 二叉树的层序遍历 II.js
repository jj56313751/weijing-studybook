/*
 * @Author: 味精
 * @Date: 2021-12-16 22:12:13
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-16 22:12:14
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
 var levelOrderBottom = function (root) {
  var ans = []
  function recrusion(root, k) {
      if(!root) return
      if(!ans[ans.length - 1 - k]) ans.unshift([])
      ans[ans.length - 1 - k].push(root.val)
      recrusion(root.left, k + 1)
      recrusion(root.right, k + 1)
  }
  recrusion(root, 0)
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
 var levelOrderBottom = function (root) {
  var ans = []
  if (!root) return ans
  var queue = [root]
  while (queue.length) {
      var len = queue.length
      var tmp = []
      while (len--) {
          var top = queue.shift()
          tmp.push(top.val)
          top.left && queue.push(top.left)
          top.right && queue.push(top.right)
      }
      ans.unshift(tmp)
  }
  return ans
};