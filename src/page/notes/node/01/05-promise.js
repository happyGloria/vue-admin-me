const getName = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('nodejs')
  }, 50)
})
// const getNumber = Promise.resolve(1)

const getError = Promise.reject('出错了！！！')
getError.catch(err => console.log(err))

getName.then(name => {
  console.log(name)
  return 20
}).then(num => {
  console.log(num)
})

Promise.all([getName, getName])
  .then(console.log)
  .catch(console.log)

Promise.race([getName, getName]) // 返回一个最快完成的Promise, 谁快就返回谁
  .then(console.log)
  .catch(console.log)
