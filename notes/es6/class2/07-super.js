/**
 * super: es6规定， 在子类普通方法中通过super调用父类的方法时， 方法内部的this指向当前的 ** 子类实例 **。
 * 1. 当函数用
 *     1) 代表父类的构造函数(es6要求， 子类的构造函数必须执行一次super函数)
 *     2) 只能用在子类中，用在其它地方会报错
 * 2. 当对象用
 *     1) 普通方法中， 指向父类的原型对象 super.p() == A.prototype.p()
 *     2) 在静态方法中， 指向父类,二非原型对象（详见09-super.js）
 */

class A {
  constructor () {
    console.log('正在执行的函数：', new.target.name) // new.target指向当前正在执行的函数
    // super执行时，它指向的是B的构造函数，而不是父类A的构造函数；
  }
}
class B extends A {
  constructor () {
    super()
    this.color = '123'
    // super虽然代表父类A的构造函数，但是返回的是子类B的实例
    // super内部的this指的是B
    // super() == A.prototype.constructor.call(this)
  }
}

/* var b = new B()
console.log(b) */

class C {
  p () {
    this.color = 'green'
    return 2
  }
}

C.prototype.x = 'gloria'

class D extends C {
  constructor () {
    super()
    console.log(super.p()) // super.p() 相当于将super当成一个对象使用, super在普通方法中，指向A.prototype 所以 super.p() == A.prototype.p()
    console.log(super.color) // 注意：由于super指向**父类的原型对象**， 所以定义在 **父类实例** 上的方法或属性， 是无法通过super调用的。
    console.log(super.x) // 如果属性定义在父类的原型对象上，super就可以取到。
  }
}

let d = new D()
