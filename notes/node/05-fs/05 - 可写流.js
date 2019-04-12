var fs = require('fs');
var buffer = new Buffer.from('我是从数据库中获取的数据，我要保存起来.');
var ws = fs.createWriteStream(__dirname + '/log/hello.log', { encoding: 'utf8' });
 // 创建一个可写入的流，写入到文件hello.log中；
ws.write(buffer, 'UTF8', (err, buffer) => {
  console.log(arguments)
  console.log('写入完成，回调函数没有参数')
});
ws.end(); // 标记文件结尾
ws.on('finish', () => console.log('写入完成'));
ws.on('error', err => console.log(err.stack));
console.log('程序执行完毕'); // 先执行

