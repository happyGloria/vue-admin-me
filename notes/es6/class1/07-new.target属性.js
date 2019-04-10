
function Person(name) {
  if (new.target !== undefined) {
    this.name = name
  } else {
    throw new Error('必须使用 new 命令生成实例')
  }
}
function Person2(name) {
  if (new.target === Person2) {
    this.name = name
  } else {
    throw new Error('必须使用 new 命令生成实例')
  }
}

var person = new Person('张三')
// var notaperson = Person.call(person, '张三') // 报错

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle) // true， class内部调用new.target，返回当前的class
    this.legnth = length
    this.width = width
  }
}

var obj = new Rectangle(3, 4)

class Square extends Rectangle {
  constructor(length) {
    super(length, length)
  }
}

var s = new Square(3)
// 子类继承父类，new.target会返回子类，所以L23返回false

class Shape1 {
  constructor() {
    if(new.target === Shape1) {
      throw new Error('本类不能实例化')
    } else {
      console.log('子类继承父类成功')
    }
  }
}

class Rectangle1 extends Shape1 {
  constructor() {
    super()
  }
}

var x = new Rectangle1() // 子类继承父类成功
var y = new Shape1() // 报错