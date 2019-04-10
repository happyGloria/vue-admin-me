class Human {
  name: string; // 属性，前面省略了public关键词, 默认
  protected fullName: string;
  private age: number;
  constructor(n: string, age: number) {
    // 构造函数，实例化类时，触发的方法
    this.name = n;
    this.fullName = n;
    this.age = age;
  }
  run(): void {
    console.log(`${this.name}在运动`);
  }
}

var h = new Human('张三', 20);
h.run();

class Web extends Human {
  constructor(name: string, age: number) {
    super(name, age); // 初始化父类的构造函数，继承父类的属性和方法
    console.log('类中和子类中，可以访问protected属性：', this.fullName);
    // console.log('子类中无法访问父类的private属性：', this.age); //报错，属性“age”为私有属性，只能在类“Human”中访问
  }
  run(): void {
    console.log(this.name + '在运动， 子类的');
  }
}

var w = new Web('lili', 10);
w.run();
console.log('类外部访问共有属性：', w.name);
// console.log('类外部访问protected属性：', w.fullName); // 报错，属性“fullName”受保护，只能在类“Human”及其子类中访问
