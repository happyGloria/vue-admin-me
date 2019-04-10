

var res1 = [1, 2, 3, 4, 5].filter((item) => item > 2 && item < 5)
console.log('res1:', res1) // [ 3, 4 ]

var res2 = [1, 2, 3, 4, 5].map((item) => `<li>${item}</li>`).join('')
console.log('res2:', res2) // res2: <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>

var res3 = [1, 2, 3, 4].includes(5)
console.log('res3:', res3) // false

var res4 = [1, 2, 3, 4, 55, 555].find((item, idx) => {
  if (item.toString().indexOf("5") > -1) return idx
})
console.log('res4:', res4) // 55

var res5 = [1, 2, 3, 4, 55, 555].some((item, idx) =>
  item.toString().indexOf("5") > -1
)
console.log('res5:', res5) // true
