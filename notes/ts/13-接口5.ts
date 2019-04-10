/* 接口扩展：接口可以继承接口 */

interface Animal2 {
  eat(): void;
}

interface PPerson extends Animal2 {
  work(): void;
}

class Programmer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  coding(code: string) {
    console.log(this.name + code)
  }
}
class WWeb extends Programmer implements PPerson {
  constructor(name: string) {
    super(name)
  }
  eat() {
    console.log(this.name + '吃饭')
  }
  work() {
    console.log(this.name + '写code')
  }
}

var ww = new WWeb('HappyGlroia');
ww.eat();
ww.work();