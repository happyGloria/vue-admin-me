let obj = {
  uid: 121,
  uname: '张三'
};
let {
  uid: id,
  uname: name = '李四', // 非同名局部变量， 默认值
  age = 12, // 默认值
  sex
} = obj;

console.log(id, name, age, sex) // 121 "张三" 12 undefined

let [{a}] = [{a: 1}]
console.log('a：', a)
