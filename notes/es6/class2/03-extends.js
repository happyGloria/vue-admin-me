/**
 * Class 通过 extends 关键字实现继承
 * super 关键字，表示父类的构造函数，用来新建父类的this对象。
 * 子类必须在constructor方法中调用super方法，否则新建实例时，会报错。如果不调用super方法，子类就得不到this对象。
 * (因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法)
 */

class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class ColorPoint extends Point {
  constructor (x, y, color) {
    this.color = color // 报错, ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    super(x, y) // 表示调用父类的constructor(x, y)
    // 不调用super,子类得不到this。只有调用了this关键字后，才能使用this关键字
    // 因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
    this.color = color
  }

  toString () {
    return this.color + '' + super.toString() // 调用父类的toString()
  }
}

var c = new ColorPoint()

/* 如果子类没有定义constructor方法，这个方法会被默认添加，即如果没有现显式定义，任何一个子类都有constructor方法 */
class ColorPoint2 extends Point {

}
// 等价于
class ColorPoint2 extends Point {
  constructor (...args) {
    super(...args)
  }
}
