const process = (msg, cb) => {
  setTimeout(() => {
    console.log(msg)
    cb()
  }, 1000)
}
process('msg 1', () => {
  process('msg 2', () => {
    process('msg 3', () => {
      process('msg 4', () => {
          console.log('end')
        })
    })
  })
})