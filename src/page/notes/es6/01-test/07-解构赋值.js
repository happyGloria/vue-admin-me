Promise.all([1, 2, 3, 4]).then(data => {
  console.log('data:', data)
})

Promise.all([1, 2, 3, 4]).then(([, , a, b, d = 'hello']) => {
  console.log('values:', a, b, d) // 3 4 hello
})


let [, , x, y, z = 0] = ['a', 'b', 'c', 'd']
console.log(x, y, z) // c d 0
// 不定元素， 在数组中， 可以通过… 语法将数组中的其余元素赋值给一个特定的变量。
let colors = ["red", "green", "blue"]
let [firstColor, ...restColors] = colors
console.log(firstColor) // "red"
console.log('restColors.length: ', restColors.length) // 2
console.log(restColors[0]) // "green"
console.log(restColors[1]) // "blue"

// 注意：在被解构的数组中，不定元素必须为最后一个条目，在后面继续添加逗号会导致程序抛出语法错误。