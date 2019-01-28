/* async函数返回的Promise对象，可以作为await命令的参数 */
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
async function asyncPrint(value, ms) {
  await timeout(ms)
  console.log(value)
}
asyncPrint('hello world', 50) // 指定了50ms后，输出hello world

// 改写成
async function timeout2(ms) {
  await new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint2(value, ms) {
  await timeout2(ms)
  console.log(value)
}

asyncPrint2('hello world2', 50)
