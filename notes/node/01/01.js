var http = require('http')
http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>title</h1>')
  res.end('hello world !!!')
}).listen(1337, '127.0.0.1')

console.log('Server is running at http://127.0.0.1:1337')

/**
 * 当一个request到来，Event Loop 会将这个 Listener 回调函数放入到事件队列;
 * nodejs中所有的代码都是一个一个从执行队列中拿出来执行的；
 * 这些执行都是在工作线程上, Event Loop本身可以认为在一个独立的线程中，我们一般不提这个线程，而将Nodejs称之为一个单线程的执行环境；
 * 所有的回调都是在一个工作线程上运行；
 */
