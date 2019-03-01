/**
 * 1. 静态方法bar调用了this.baz， 这里的this指的是Foo类， 而不是Foo的实例， 等同于调用Foo.baz
 * 2. 静态方法可以与非静态方法重名
 */
class Foo {
  static bar () {
    this.baz()
  }
  static baz () {
    console.log('hello')
  }
  baz () {
    console.log('world')
  }
}
Foo.bar()
