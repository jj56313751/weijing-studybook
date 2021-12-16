/*
 * @Author: 味精
 * @Date: 2021-12-16 21:37:40
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-16 21:45:44
 * @Description: file content
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    var ans = []

    function recursion(root, k, ans) {
        if (!root) return
        if (!ans[k]) ans.push([])
        ans[k].push(root.val)
        recursion(root.left, k + 1, ans)
        recursion(root.right, k + 1, ans)
    }

    recursion(root, 0, ans)

    return ans
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
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
        ans.push(tmp)
    }

    return ans
};