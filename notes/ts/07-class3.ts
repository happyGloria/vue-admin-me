class Per {
  public name: string;
  public age: number = 20;
  static sex = '男';
  constructor(name: string) {
    this.name = name;
  }
  run(): void {
    console.log(`${this.name}在运动`);
  }
  work() {
    console.log(`${this.name}在工作`);
  }
  static print() {
    console.log(`static print方法`, Per.sex);
  }
}

var p2 = new Per('Gloria');
p2.run();
p2.work();
// p2.print(); //报错， Property 'print' is a static member of type 'Per'
Per.print();