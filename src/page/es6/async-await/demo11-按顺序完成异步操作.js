/* 依次远程读取一组URL，然后按照读取的顺序输出结果 */
// promise写法：
function logInOrder(urls) {
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text())
  })
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then(text => console.log(text))
  }, Promise.resolve())
}

async function logInOrder2(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    console.log(await response.text())
  }
}

/**
 * 1. fetch 远程读取一组url；
 * 2. 每个fetch操作， 都返回一个Promise对象
 * 3. reduce方法一次处理每个Promise, 使用then， 将每个对象串联起来
 */