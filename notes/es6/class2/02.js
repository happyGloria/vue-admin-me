class B {
}
let b = new B()
console.log(b.constructor == B.prototype.constructor)

// 所有类的方法，都定义在类的prototype属性上

/**
 * constructor方法
 * 1. 是类的默认方法
 * 2. 通过new命令，生成对象实例时，自动调用该方法；
 * 3. 一个类必须有constructor方法， 如果没有显示定义， 一个空的constructor方法会被默认添加；
 * 4. constructor方法默认返回实例对象this, 也可以返回另外一个对象
 */

class Point {

}
// 等同于
class Point {
  constructor () {
    return Object.create(null)
  }
}
