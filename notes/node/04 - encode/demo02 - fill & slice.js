/** 填充值：
 * b.fill(填充值，填充开始索引，填充介素索引)
 * */

const b = Buffer.allocUnsafe(100);
b.fill(0);  // == Buffer.alloc(100)
console.log(b);

/*
b.write('123', 0, 3, 'utf-8');
console.log(b);

b.toString();
console.log(b);

b.writeInt(8);*/


var obj = {a:1};
var a1 = [obj], a2 = [obj];
a1[0].a = 2;
console.log(a2);  // 会影响[{a: 2}]

var obj2 = {name: '123'};
var arr = [obj2, 2, 3];
arr.slice(0);
arr[0].name = 'hello';
console.log(arr);  //浅拷贝

var obj3 = {name: '456', child: {name: '123'}};
var newObj = Object.assign({}, obj3);
obj3.child.name = 'hello world';
newObj.child.name = 'lisi';

console.log(obj3);
console.log(newObj);




var o3 = {name: 'zhangsan', child: {name: 'lisi'}};
var o4 = JSON.parse(JSON.stringify(o3));

o4.name = 'wangwu';
console.log(o3, o4);


var buffer = Buffer.from([1,2,3]);
var newBuffer = buffer.slice(0,1);
newBuffer[0] = 100;
console.log(buffer);

