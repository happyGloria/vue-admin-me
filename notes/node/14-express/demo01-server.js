var express = require('express');
var server = express(); //返回一个server

server.use('/a.html', (req, res) => {
  // req, res保留了原生的功能，添加了一些方法（如send），增强了原有的功能
  // res.send({name: 123}) 可以发送json，字符串, buffer
  // res.write('123') 只能发送字符串和buffer
  res.send('abc');
  res.end();
});

server.use('/b.html', (req, res) => {
  res.send('123');
  res.end();
});

server.get('/', (req, res) => {
  res.end('get成功')
})

server.post('/', (req, res) => {
  res.end('post成功')
})

server.listen(9028);
