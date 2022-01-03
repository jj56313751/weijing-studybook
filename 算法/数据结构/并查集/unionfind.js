class UnionFind {
  constructor(n) {
    // 每个节点初始化父节点为本身
    this.parent = new Array(n).fill(0).map((item, index) => index) 
    // 每个节点上集合的数量，初始化1个本身
    this.rank = new Array(n).fill(1)
    // 几个个数，初始化为n
    this.setCount = n
  }
  // 快速查找
  findSet(index) {
    if (this.parent[index] !== index) {
      return this.findSet(this.parent[index])
    }
    return this.parent[index]
  }
  // 合并
  unite(a, b) {
    let root1 = this.findSet(a),
      root2 = this.findSet(b)
    if (root1 !== root2) {
      if (this.rank[root1] < this.rank[root2]) {
        // 交换
        [root1, root2] = [root2, root1]
      }
      // 小的合并到大的上
      this.parent[root2] = root1
      // 增加节点上集合数量
      this.rank[root1] += this.rank[root2]
      //总集合数量减少
      this.setCount--
    }
  }
  // 返回集合数量
  get count() {
    return this.setCount
  }
  // 两个节点是否连通
  connected(a, b) {
    let root1 = this.findSet(a),
      root2 = this.findSet(b)
    return root1 === root2
  }
}

const set = new UnionFind(10)
console.log(set.parent)
console.log('集合数:',set.setCount)
console.log('合并2,3')
set.unite(2,3)
console.log(set.parent)
console.log('集合数:',set.setCount)
console.log('合并5,6')
set.unite(5,6)
console.log(set.parent)
console.log('集合数:',set.setCount)
console.log('合并6,7')
set.unite(6,7)
console.log(set.parent)
console.log('集合数:',set.setCount)
console.log('合并2,6')
set.unite(2,6)
console.log(set.parent)
console.log('集合数:',set.setCount)
console.log('查找3')
console.log(set.findSet(3))