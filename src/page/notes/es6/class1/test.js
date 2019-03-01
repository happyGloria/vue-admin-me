class Foo {
  constructor () {
    console.log(new.target === Foo) // true
    this._count = 0
  }
  static bar () {
    this.baz() // 这里的this指向Foo类，而不是Foo实例，等同于Foo.baz
  }
  static baz () {
    console.log('hello')
  }
  baz () {
    console.log('world')
  }
}
var obj = new Foo()

