/* function my_async_function (name, fn) {
  setTimeout(() => {
    fn(null, ` - ${name} - `)
  }, 3000)
}

my_async_function('hello nodejs', (err, name) => {
  if (err) {
    console.log(err)
  }
  console.log(name)
}) */

class Evente {
  constructor () {
    this.map = {}
  }
  add (name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return
    }
    this.map[name] = [fn]
    return
  }
  emit (name, ...args) {
    this.map[name].forEach(fn => fn(...args))
  }
}

let ev = new Evente()
ev.add('Hello', (err, name) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(name)
})

ev.emit('Hello', '发生了错误')
ev.emit('Hello', null, 'hello nodejs')
