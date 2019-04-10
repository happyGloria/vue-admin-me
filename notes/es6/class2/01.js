class Point {
  constructor (x, y) { // 构造方法
    this.x = x // this表示实例对象
    this.y = y
  }
  tostring () {
    return `(${this.x}, ${this.y})`
  }
}
console.log(typeof Point) // function
console.log(Point == Point.prototype.constructor) // true

var p = new Point(1, 2)
console.log(p.tostirng())
