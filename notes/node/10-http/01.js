var http = require('http');

// 创建http服务器， 并监听8888端口
http.createServer((req, res) => {
  console.log('服务器接收到了请求' + req.url);
  // 设置响应头，回写响应代码
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=UTF-8'
  })
  // 写入响应体
  res.write('<h1>NodeJS</h1>')
  // 结束并发送
  res.end('哈哈')
}).listen(8888)
