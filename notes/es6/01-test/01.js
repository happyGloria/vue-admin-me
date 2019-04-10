let a = 2

function temp () {
  // console.log(a) // ReferenceError: a is not defined (只会在本作用域中查找 )
  let a = 4
  console.log(a)
}
temp()
console.log(a)

console.log(d) // undefined
{
  var d = function () {

  }
}

{
  var b = function () {

  }
}
console.log(b) // [Function: b]

{
  let e = function () {

  }
}
console.log(e) // ReferenceError: e is not defined
