/* T表示泛型，具体什么类型，调用这个方法时决定 */
/* function getData<T>(value: T): T {
  console.log(value);
  return value;
}

getData<number>(12) */

class MinClass {
  list: number[] = [];
  add(num: number) {
    this.list.push(num);
  }
  min(): number {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

var mm = new MinClass();
mm.add(1);
mm.add(33);
mm.add(22);
mm.add(34);

console.log(mm.min());

// 类的泛型
class MinClass2<T> {
  list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
  min(): T {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

var m1 = new MinClass2<number>(); // 实例化类，并制定了类的T，代表的类型是number
m1.add(1);
m1.add(2);
m1.add(3);
console.log('m1-min', m1.min());

var m2 = new MinClass2<string>(); // 实例化类，并制定了类的T，代表的类型是string
m2.add('c');
m2.add('a');
m2.add('v');
console.log('m2-min', m2.min());


// 泛型接口

interface ConfigFn<T> {
  (value:T): T
}

function getData<T>(value:T):T {
  return value;
}

var myGetData: ConfigFn<string> = getData;
myGetData('12')