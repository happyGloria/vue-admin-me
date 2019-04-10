/**
 * 1. 父类的静态方法，可以被子类继承；
 * 2. 子类bar,可以同super对象调用父类的静态方法；
 * */

class Foo {
  static say () {
    return 'hello world'
  }
}

class Bar extends Foo {
  static go () {
    return super.say() + ', too'
  }
}
console.log(Bar.go())
