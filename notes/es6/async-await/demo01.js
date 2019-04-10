const fs = require('fs')
const readFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}
// Generator函数
const gen = function * () {
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}

// async 函数
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}

/**
 * async函数返回一个Promise对象， 可使用then方法添加回调函数。
 * 函数钱的async关键字， 表明该函数内部有异步操作； 调用函数时， 会立即返回一个promise对象.
 * 函数执行时，遇到await会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
 */
async function getStockPriceByName (name) {
  const symbol = await getStockSymbol(name)
  const stockPrice = await getStockPrice(symbol)
  console.log(symbol)
  return stockPrice
}

getStockPriceByName('goog').then(result => {
  console.log(result)
})
