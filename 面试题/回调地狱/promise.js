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

processPromise('msg 1')
  .then(_ => processPromise('msg 2'))
  .then(_ => processPromise('msg 3'))
  .then(_ => processPromise('msg 4'))