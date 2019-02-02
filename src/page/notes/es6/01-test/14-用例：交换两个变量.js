// 典型用例：交换两个变量的值；(在ES5中交换两个变量的值需要引入第三个临时变量，ES6则不需要了)
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1