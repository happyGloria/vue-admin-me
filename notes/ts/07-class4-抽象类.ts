abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(): void {
    console.log('eat');
  }
  abstract run(): any; // 抽象方法不包含具体实现并且必须在派生类中实现。
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  // 抽象类的子类必须实现抽象类里面的抽象方法
  run() {
    console.log('123');
  }
}
