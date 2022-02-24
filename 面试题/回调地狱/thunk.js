const process = (msg, cb) => {
  setTimeout(() => {
    console.log(msg)
    cb && cb()
  }, 1000)
}
// thunk函数
const thunk = (msg) => (cb) => process(msg, cb)

const p1 = thunk('msg 1')
const p2 = thunk('msg 2')
const p3 = thunk('msg 3')
const p4 = thunk('msg 4')

// 执行顺序
const arr = [p1, p2, p3, p4]

// 执行函数
const gen = (arr) => () => arr.reduceRight((a, b) => () => b(() => a()))()

const run = gen(arr)
run()