// 1. 数字
var num:number = 123;
num = 456;
console.log(456);
// num = 'hello' //报错
// 2. 字符串
var str:string = 'hello world';
str = 'haha';
console.log(str);
// str = true // 报错，Type 'true' is not assignable to type 'string'.

// 3. 数组
var arr:number[] = [1,2,3];
var arr:Array<number> = [1,2,3];

// 4.元组类型
let arr1:[number, string] = [1, 'this is tuple'];
console.log(arr1);

// 5. 枚举 enum

enum Flag {
  success = 1,
  error = 2,
};
let s:Flag = Flag.success;
console.log(s);

enum Color {
  blue,
  red,
  'orange'
};
var c:Color = Color.red;
console.log('c: ', c); // 如果标识符没有赋值，没有值就是下标

enum Color1 {
  blue,
  red = 3,
  orange
};
var c1:Color1 = Color1.red;
console.log('c1: ', c1)
var c2:Color1 = Color1.orange;
console.log('c2: ', c2)
 

enum Err {
  undefined = -1,
  null = -2,
  success = 1,
  error =2
};

var e:Err = Err.success
console.log('e: ', e) // 1





