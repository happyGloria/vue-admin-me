/**
 * async 返回 Promise对象
 * async 函数内部 return 语句返回的值，会成为then方法回调函数的参数
 * async 抛出错误，会导致返回的Promise对象变为reject状态，抛出的错误，会别catch方法回调函数接收到。
 */
async function f() {
  if (Math.random() > 0.5) {
    return 'hello'
  } else {
    throw new Error('出错了')
  }
}

f().then(v => console.log(v), e => console.log(e))
