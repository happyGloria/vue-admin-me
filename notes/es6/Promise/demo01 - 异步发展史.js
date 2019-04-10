/**
 * 异步：先干一件事儿，中间去干其它的事，最终回来干这件事儿；
 * 同步：连续执行
 * callback -> promise （解决callback嵌套） -> generator + co库 -> async + await (语法糖)
 * */

// 1.异步 不支持try catch， try catch只针对同步代码
var fs = require('fs');
fs.readFile('./1.txt', 'utf8', (err, data) => {
  fs.readFile(data, 'utf8', (err, data) => {
    console.log(data);
  })
});

// 2.并行 无法在同一时刻合并两个异步的结果，异步方案不支持return
function afterFn(times, callback){
  var arr = []
  return function (chunk) {
    arr.push(chunk);
    if(--times == 0) {
      callback(arr);
    }
  }
}
let out = afterFn(2, function(data) {
  console.log('解决异步结果无法在同一时刻打印合并的问题：', data);
});
fs.readFile('./1.txt', 'utf8', (err, data) => {
  out(data);
});
fs.readFile('./2.txt', 'utf8', (err, data) => {
  out(data);
});


// 3. 高阶函数 函数可以作为参数 或 函数还可以作为返回值

function isType(type, content) {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}

console.log('isType:', isType('String', 'hello'));

//批量生成函数
function isType2(type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

let isString = isType2('String');
let isArray = isType2('Array');

console.log('是字符串：', isString('hello'));
console.log('是数组：', isArray([123]));

// 预置函数  loadsh  _.after

function after(times, callback) {
  return function () {
    if(--times == 0) {
      callback();
    }
  }
}

var newFn = after(3, function () {
  console.log('3次后执行了')
});

newFn();
newFn();
newFn();




