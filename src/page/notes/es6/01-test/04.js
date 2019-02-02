var tmp = new Date().toDateString()
function f() {
  console.log(tmp) // undefined 原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
  if (false) {
    var tmp = 'hello world'
  }
}
f()
function fn() {
  console.log(tmp)
  if (false) {
    let tmp = '123'
  }
}
fn()
