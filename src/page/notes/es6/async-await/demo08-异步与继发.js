/**
 * 多个await命令，如果不存在继发关系，最好让它们同时触发
 */

/* let foo = await getFoo()
let bar = await getBar() */

// 以上写法，被写成了继发关系，比较耗时，因为只有getFoo完成后，才会执行getBar
 
function getFoo() {
  return new Promise((resolve) => {
    resolve('1')
  })
  /* setTimeout(() => {
    return 'foo'
  }, 1000) */
}
function getBar() {
  return new Promise((resolve) => {
    resolve('2')
  })
  /*  setTimeout(() => {
    return 'bar'
  }, 1000) */
}
async function f1() {
  /* let [foo, bar] = await Promise.all([getFoo(), getBar()])
  console.log(foo, bar) */
  let res = await Promise.all([getFoo(), getBar()])
  console.log(res)
}

f1()
