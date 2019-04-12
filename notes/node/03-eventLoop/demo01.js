setTimeout(function () {
  console.log('timer - value')
  setTimeout(arguments.callee, 10)
}, 1000)

setInterval(function () {
  console.log('interval - value')
}, 1000)

setImmediate(function () {
  console.log('4')
})
setImmediate(function () {
  console.log('5')
})

console.log('first exec!')

process.nextTick(function () {
  console.log('1')
  process.nextTick(function () {
    console.log('2')
    process.nextTick(function () {
      console.log('3')
    })
  })
})

console.log('next')

setTimeout(() => {
  console.log('setTimeout后的值')
}, 10000)
