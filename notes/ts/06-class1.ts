class Person {
  name:string; // 属性，前面省略了public关键词
  constructor(n: string) { // 构造函数，实例化类时，触发的方法
    this.name = n
  }
  run():void {
    console.log(this.name)
  }
}

var p = new Person('张三');
p.run();
