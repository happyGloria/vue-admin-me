// 实现 拷贝和合并
let obj = {
    name: 'zhang',
    age: 12
  },
  obj2 = {
    addr: '朝阳'
  }
let student = {
  ...obj,
  ...obj2
}
console.log(student) // { name: 'zhang', age: 12, addr: '朝阳' }
console.log(student === obj) // false

// 这种拷贝是几层？

let copyObj = {
  name: {
    schoolName: '北大',
    class: {
      cName: 'grade1'
    }
  }
}

let testObj = {
  ...copyObj
}
testObj.name.schoolName = '清华'
console.log('clone is equal: ', copyObj === testObj) // false
console.log('拷贝的对象:', testObj) // { name: { schoolName: '清华', class: { cName: 'grade1' } } }
console.log('被拷贝对象:', copyObj) // { name: { schoolName: '清华', class: { cName: 'grade1' } } }
console.log(testObj.name === copyObj.name) // true

// 深拷贝
// 方式1： 利用json.stringify(), 凡是如果对象的值是个函数，会有问题
let copyObj1 = {
  name: {
    schoolName: '北大',
    class: {
      cName: 'grade1'
    }
  }
}
var bb = JSON.parse(JSON.stringify(copyObj1))
console.log(bb)
console.log(bb == copyObj1) // false
console.log(bb.name == copyObj1.name) // false

// 方式2： 递归
function deepClone (obj) {
  // if (obj === undefined) return undefined
  if (obj === null) return null
  if (typeof obj != 'object') return obj // 包含undefined和普通类型
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  // 对象 || 数组
  let newObj = new obj.constructor()
  for (var key in obj) {
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}
var sourceObj = {
  stu1: {
    name: 'zhangsan',
    class: {
      name: '3年级1班'
    }
  },
  age: 123,
  haha: new RegExp(/[123]/),
  fn: function () {
    console.log('456')
  },
  d: new Date('2000,1,12')
}
var res3 = deepClone(sourceObj)
res3.stu1.class.name = 'lisi'

console.log('res3.stu1.class.name:', res3.stu1.class.name)
console.log('sourceObj.stu1.class.name:', sourceObj.stu1.class.name)
