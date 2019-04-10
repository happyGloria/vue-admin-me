/**
 * 1. 实例属性定义在constructor中, 也可以定义在类的最顶层
 */
class IncreasingCounter {
  sum = 0
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('getting the current value!')
    console.log('this.sum:', this.sum)
    return this._count
  }
  increment() {
    this._count++
  }
}

var c = new IncreasingCounter()
c.value()