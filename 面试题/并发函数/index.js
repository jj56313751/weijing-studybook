// 等待函数
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

/**
 * @description: 并发函数
 * @param {function} 执行函数
 * @param {number} 允许并发执行最大值
 * @param {number} 执行总数
 */
const asyncFn = async(fn, curMax = 4, sum = 200) => {
  console.time('总耗时');
  console.log('beginTime:' + new Date().toLocaleString())
  let num = 0
  let curLength = 0
  const queue = []

  while(num !== sum) {
    if(curLength <= curMax) {
      queue.push(new Promise(async resolve => {
        console.log(`并发数${curLength}`)
        await fn()
        curLength--
        resolve('完成')
      }))
      curLength++
      num++
    } else {
      await sleep(10)
    }
  }
  Promise.all(queue).then(res => {
    console.log('all', res)
    console.log('endTime:' + new Date().toLocaleString())
    console.timeEnd('总耗时');
  })
  
}

const test = async () => {
  const delay = (Math.random() * 1000).toFixed()
  await sleep(delay)
}

asyncFn(test, 5, 20)