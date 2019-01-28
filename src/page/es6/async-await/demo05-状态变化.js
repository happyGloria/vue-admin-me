/** 
 * async函数返回的promise对象，必须等到内部所有的await命令后面的promise执行完，才回发生状态变化；
 * 除非遇到return语句，或抛出错误。
 * 即 async函数内部的异步操作执行完，才会执行then方法指定的回调函数；
 */

 async function getTitle(url) {
   let response = await fetch(url)
   let html = await response.text()
   return html.match(/<title>([\s\S]+)<\/title>/i)[1]
   // 抓取网页、 取出文本、 匹配页面标题, 只有以上三个操作全部完成，才会执行then方法里面的console.log
 }
getTitle('https://tc39.github.io/ecma262/').then(console.log)