const process = (msg, cb) => {
  setTimeout(() => {
    console.log(msg)
    cb && cb()
  }, 1000)
}

const processPromise = msg => {
  return new Promise((resolve, reject) => {
    process(msg, resolve)
  })
}

const run = async() => {
  await processPromise('msg 1')
  await processPromise('msg 2')
  await processPromise('msg 3')
  await processPromise('msg 4')
}

run()