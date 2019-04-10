/**
 * 1)	function关键字与函数名之间有个*；
 * 2)	函数体内部使用yield，定义状态；
 * 3)	调用函数后，该函数不执行，返回的不是函数运行结果，而是一个指向内部状态的指针对象(遍历器对象)；
 * 4) 调用next,指针移动到下一状态；(每次next,都从函数头部或上次停下来的地方执行，直到遇到yield或return)
 */

function* hello () {
  yield 'hello';
  yield 'world';
  console.log('is this runned?');
  return 'ending';
}
var hw = hello();
console.log('generator函数运行结果：', hw);  //{}

// next()方法的返回值 就是yield表达式的值，done表示遍历还未结束
// 调用next()后,fun才会执行，否则永远不会执行
// yield只能用在Generator函数中，否则报错
console.log(hw.next());  //{ value: 'hello', done: false }
console.log(hw.next());  //{ value: 'world', done: false }
console.log(hw.next());  //{ value: 'ending', done: true }
console.log(hw.next());  //{ value: undefined, done: true }
console.log(hw.next());  //{ value: undefined, done: true }
