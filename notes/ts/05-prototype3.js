function Person(name, age) {
  this.name = name;
  this.age = age;

  this.run = function () {
    console.log(this.name + '在跑步');
  }
}

function Web(name, age) {
  Person.call(this, name, age); //  实例化子类可以给父类传参
}

Web.prototype = new Person();

var w = new Web('王五', 23);
w.run()