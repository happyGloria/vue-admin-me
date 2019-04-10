/* 事件实现异步，支持链式调用 */
class ChainEvente {
  constructor () {
    this.map = {}
  }
  add (name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return this
    }
    this.map[name] = [fn]
    return this
  }
  emit (name, ...args) {
    this.map[name].forEach(fn => fn(...args))
    return this
  }
}

var ev = new ChainEvente()
/* ev
  .add('hello', (err, name) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(name)
  })
  .emit('hello', '发生错误')
  .emit('hello', 'hello, nodejs！') */

/* 将事件加入到异步编程中 */

function readFn (_error, data) {
  console.log(data)
}
const fs = require('fs')
ev.add('readFn', readFn)
fs.readFile('mock.txt', (err, data) => {
  ev.emit('readFn', err, data)
})
