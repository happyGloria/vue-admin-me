// 实现 拷贝和合并
let obj = {
    name: 'zhang',
    age: 12
  },
  obj2 = {
    addr: '朝阳'
  }
let student = { ...obj, ...obj2 }
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

let testObj = { ...copyObj }
testObj.name.schoolName = '清华'
console.log('拷贝的对象:', testObj) // { name: { schoolName: '清华', class: { cName: 'grade1' } } }
console.log('被拷贝对象:', copyObj) // { name: { schoolName: '清华', class: { cName: 'grade1' } } }

console.log(testObj.name === copyObj.name) // true
