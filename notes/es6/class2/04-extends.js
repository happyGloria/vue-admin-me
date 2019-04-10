class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
class ColorPoint extends Point {
  constructor (x, y, color) {
    super(x, y)
    this.color = color
  }
}

var cp = new ColorPoint(25, 8, 'green')

console.log(cp instanceof ColorPoint) // true
console.log(cp instanceof Point) // true

/**
 * cp 同时是ColorPoint和Point的实例
 */

