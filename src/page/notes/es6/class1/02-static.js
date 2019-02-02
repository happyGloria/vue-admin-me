/** 静态方法
 * 方法前加上static关键字，表示该方法不会被实例继承,且直接通过类来调用。
 * 1）如果静态方法包含this关键字， 这个this指的是类， 而不是实例；
 * 2）实例上调用静态方法，会抛出错误，表示不存在该方法；
 */
class Foo {
  static sayHello () {
    this.a = '123'
    console.log('this.a:', this == Foo) // true
    return 'hello'
  }
}
Foo.sayHello()

// let f = new Foo()
// f.sayHello() // TypeError: f.sayHello is not a function
