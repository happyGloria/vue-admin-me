function Person() {
  this.name = '张三';
  this.age = 20;

  this.run = function() {
    console.log(this.name + '在跑步');
  }
}
Person.prototype.sex = '男';
Person.prototype.work = function() {
  console.log(this.name + '工作')
}
// 原型链上的属性，会被多个实例共享，构造函数不会

Person.getInfo = function() {
  console.log('getInfo是静态方法')
}
Person.getInfo(); // 静态方法

var p = new Person();
console.log(p.name);
p.run()

function Web() {
  Person.call(this); // 对象冒充实例实现继承
}

var w = new Web()
w.name = '李四';
w.run(); // 可以继承构造函数里面的属性和方法
// w.work() //  w.work is not a function. 没法继承原型链上的属性和方法





