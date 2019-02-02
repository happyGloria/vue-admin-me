var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()
/**
 * 上面代码中， 变量i是var命令声明的， 在全局范围内都有效， 所以全局只有一个变量i。
 * 每一次循环， 变量i的值都会发生改变， 而循环内被赋给数组a的函数内部的console.log(i)， 里面的i指向的就是全局的i。
 * 也就是说， 所有数组a的成员里面的i， 指向的都是同一个i， 导致运行时输出的是最后一轮的i的值， 也就是 10。
 */

let b = []
for (let j = 0; j < 10; j++) {
  b[j] = function() {
    console.log(j)
  }
}
b[6]()
// 上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。

for (let k = 0; k < 3; k++) {
  let k = 'abc'
  console.log(k)
}
// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

var temp = 123
if (true) {
  // console.log(typeof temp) // ReferenceError: temp is not defined
  // temp = 'abc' // ReferenceError: temp is not defined
  let temp
  console.log(temp) // undefined

  temp = '456'
  console.log(temp) // 456
}

// 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

/* ES6规定，如果区块中存在let和const命令， 这个区块对这些命令声明的变量， 从一开始就形成了封闭作用域。 凡是在声明之前就使用这些变量， 就会报错。 */

console.log(typeof dd) // undefined

function bar(x = y, y = 2) {
  return [x, y]
}
console.log('bar:', bar())