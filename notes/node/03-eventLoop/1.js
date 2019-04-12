function next () {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  }, 1000)
  process.nextTick(() => {
    console.log(3)
    process.nextTick(() => {
      console.log(4)
      process.nextTick(() => {
        console.log(5)
      })
    })
  })
}
next() // 1 3 4 5 2
