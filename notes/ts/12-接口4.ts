/* 可索引接口：数组、对象的约束 */
var a1: number[] = [1, 2];
var a2: Array<string> = ['a', 'b'];
interface Ani {
  name: string;
  eat(str: string): void;
}

class DDog implements Ani {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name + '吃狗粮.');
  }
}

var d = new DDog('小黑');
d.eat();

class CCat implements Ani {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(food: string) {
    console.log(this.name + '吃' + food);
  }
}

var cc = new CCat('小花');
cc.eat('鱼');
