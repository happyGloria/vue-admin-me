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
};

let {
  loc: {
    start,
    end: {
      line: endLine, // 别名
      column: endColumn = 10 // 别名 & 默认值
    }
  },
  range: [, rangeEnd]
} = node;
// 提取node.loc.start
console.log(start.line); // 1
console.log(start.column); // 1
console.log('endLine:', endLine) // endLine: 3
console.log('endColumn:', endColumn) // endColumn: 5
console.log('rangeEnd:', rangeEnd) // rangeEnd: 3

let [a, b, c, d] = "倚天屠龙";
console.log(a, b, c, d); // 倚 天 屠 龙

let obj = {
  a: [1, 2]
}

let {
  a: [x, y]
} = obj

console.log('x-y:', x-y)

let obj1 = [
  { a: 555}
]

let [
  { a }
] = obj1
console.log(a)

