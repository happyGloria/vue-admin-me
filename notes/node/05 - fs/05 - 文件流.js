var fs = require('fs');
var data = '我是从数据库中获取的数据，我要保存起来.';
var writeStream = fs.createWriteStream(__dirname + '/log/hello.log', { encoding: 'utf8' });
 // 创建一个可写入的流，写入到文件hello.log中；
writeStream.write(data, 'UTF8');
writeStream.end(); // 标记文件结尾
writeStream.on('finish', () => console.log('写入完成'));
writeStream.on('error', err => console.log(err.stack));
console.log('程序执行完毕'); // 先执行