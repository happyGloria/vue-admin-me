function Person(name,age) {
  this.name = name;
  this.age = age;

  this.run = function () {
    console.log(this.name + '在跑步');
  }
}
Person.prototype.sex = '男';
Person.prototype.work = function () {
  console.log(this.name + '工作')
}
// 原型链上的属性，会被多个实例共享，构造函数不会

Person.getInfo = function () {
  console.log('getInfo是静态方法')
}

function Web(name, age) {
  this.name = name;
  this.age = age;
}

Web.prototype = new Person()
// 原型链实现继承,可以继承构造函数里面的属性和方法 也可以继承原型链上面的属性和方法

var w = new Web('李四', 20)
w.run();
w.work();
