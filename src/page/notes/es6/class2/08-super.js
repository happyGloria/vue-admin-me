class A {
  constructor () {
    this.x = 1
  }
  print () {
    console.log(this.x)
  }
}

class B extends A {
  constructor () {
    super()
    this.x = 2
    super.x = 3
    console.log('this.x:', this.x) // 3
    console.log('super.x:', super.x) // undefined
    /**
     * 1. this指向子类实例，所以通过super对某个属性赋值，super就是this，赋值的属性会变成子类实例的属性；
     * 2. super.x 等同于 this.x
     * 3. 当读取时，super.x == A.prototype.x 返回undefined
     */
  }
  m () {
    super.print() // 2
  }
}

let b = new B()
b.m()

/**
 * 虽然在普通方法中，super.print() 调用的是A.prototype.print()
 * 但是在A.prototype.print()内部的this指向B的实例，所以输出2，而非1
 * super.print.call(this)
 */
