/**
 * 1. 正常情况下，await命令后面是Promise对象，返回该对象的结果；
 *    如果不是Promise对象，则直接返回对应的值
 */
async function f () {
  return await 3 // 相当于 return 3
}
f().then(v => console.log(v))

/* 2. await后面 是个thenable对象，那么，await会将其等同于Promise对象 */

class Sleep {
  constructor (timeout) {
    this.timeout = timeout
  }
  then (resolve, reject) {
    const startTime = Date.now()
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    )
  }
}
(async () => {
  const actualTime = await new Sleep(1000)
  console.log(actualTime)
})()

// 3. 任何一个await语句后面的Promise变成reject状态，那么整个async函数都会中断执行

async function f3 () {
  await Promise.reject('出错了')
  await Promise.resolve('hello') // 不会执行
}
f3().then(v => console.log(v), err => console.log(err))
// 4. 如果想让前一个异步操作失败，也不中断后面的，就将其放在try... catch中
async function f4 () {
  try {
    await Promise.reject('出错了')
  } catch (err) {
    console.log(err)
  }
  return await Promise.resolve('hello world')
}

f4().then(v => console.log(v))

// 5. 或使用Promise.catch处理错误

async function f5 () {
  await Promise.reject('出错了')
    .catch(e => console.log(e))
  return await Promise.resolve('hello')
}

f5().then(v => console.log(v))

// 6. await 后面的异步出错，等同于async函数返回Promise对象被reject

async function f6 () {
  await new Promise((resolve, reject) => {
    throw new Error('出错了')
  })
}
f6().then(v => console.log(v))
  .catch(e => console.log(e))
