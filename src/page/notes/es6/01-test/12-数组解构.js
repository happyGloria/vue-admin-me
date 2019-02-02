let colors = ["red", "green", "blue"],
  firstColor = "black",
  secondColor = "purple";

[firstColor, secondColor, threeColor = 'orange'] = colors;

console.log(firstColor); //"red"
console.log(secondColor); //"green"