Math.max.apply(null, [22, 34, 555, 88])
Math.max(...[22, 34, 555, 88])

// var args = Array.prototype.slice.call(arguments, .length);
function greet(firstName, ...args) {
  // 注意： 剩余运算符，只能放在参数项的最后；
  console.log('Hello', firstName) // Hello Ted
  console.log('args:', args) // 第一次[]  第二次args: [ 'Hope', 'you', 'like', 'this!' ]
  args.forEach(arg => console.log(arg))
}
greet('Ted')
greet('Ted', 'Hope', 'you', 'like', 'this!')


var a = [1, 2, 3]
console.log('a:', [...a, 4, 5, 6]) // a: [ 1, 2, 3, 4, 5, 6 ]

var obj1 = {
    name: 'zhangdan'
  },
  obj2 = {
    age: '20'
  },
  obj3 = {
    ...obj1,
    ...obj2
  }
console.log(obj3) // { name: 'zhangdan', age: '20' }
