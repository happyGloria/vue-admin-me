/**
 * 1. 实例属性定义在constructor中
 */
class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
