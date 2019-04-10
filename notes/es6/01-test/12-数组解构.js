let colors = ["red", "green", "blue"],
  firstColor = "black",
  secondColor = "purple";

[firstColor, secondColor, threeColor = 'orange'] = colors;

console.log(firstColor); //"red"
console.log(secondColor); //"green"

var a = [1, 2, 3],
  b = [4, 5, 6],
  c = [...a, ...b]
console.log(c)
