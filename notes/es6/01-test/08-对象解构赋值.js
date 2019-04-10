let obj = {
  uid: 121,
  uname: '张三'
};
let {
  uid: id,
  uname: name = '李四', // :表别名 name别名，并赋默认值
  age = 12, // = 表示默认值
  sex
} = obj
console.log(id, name, age, sex) // 121 '张三' 12 undefined

let [{a}] = [{a: 1}]
console.log('a：', a)

let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 3,
      column: 5
    }
  },
  range: [0, 3]
}
let {
  loc: {
    start,
    end: {
      line: endLine, // 别名
      column: endColumn = 10 // 别名 & 默认值
    }
  },
  range: [, rangeEnd]
} = node
// 提取node.loc.start
console.log(start.line); // 1
console.log(start.column); // 1
console.log('endLine:', endLine) // endLine: 3
console.log('endColumn:', endColumn) // endColumn: 5
console.log('rangeEnd:', rangeEnd) // rangeEnd: 3