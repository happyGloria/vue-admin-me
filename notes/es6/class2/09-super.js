/**
 * super在静态方法中指向父类， 在普通方法中指向父类的原型对象。
 */
class Parent {
  static myMethod (msg) {
    console.log('static:', msg)
  }
  myMethod (msg) {
    console.log('instance:', msg)
  }
}

class Child extends Parent {
  static myMethod (msg) {
    super.myMethod(msg) // 子类的静态方法中，super调用父类的方法时，北部this想想当前的子类，而不是子类实例。
  }
  myMethod (msg) {
    super.myMethod(msg)
  }
}
Child.myMethod(1) // static 1
let c = new Child()
c.myMethod(2) // instance 2

