/*
 * @Author: 味精
 * @Date: 2021-12-16 21:38:08
 * @LastEditors: 味精
 * @LastEditTime: 2021-12-16 21:45:50
 * @Description: file content
 */
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
    var ans = []

    function recursion(root) {
        if (!root) return
        ans.push(root.val)
        for (var i = 0; i < root.children.length; i++) {
            recursion(root.children[i])
        }
    }
    recursion(root)
    return ans
};
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
    var ans = []
    if (!root) return ans
    var queue = [root]
    while (queue.length) {
        var top = queue.shift()
        ans.push(top.val)
        var children = top.children
        // 关键步骤，children反向添加到队列前
        for (var i = children.length - 1; i >= 0; i--) {
            queue.unshift(children[i])
        }
    }
    return ans
};