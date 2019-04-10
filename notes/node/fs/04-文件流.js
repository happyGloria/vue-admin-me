var fs = require('fs');
var data = '我是从数据库中获取的数据，我要保存起来.';
var writeStream = fs.createWriteStream('logs/output.txt', { encoding: 'utf8' }); // 创建一个可写入的流，写入到文件output.txt中；
writeStream.write(data, 'UTF8');
writeStream.end(); // 标记文件结尾
writeStream.on('finish', function () {
  console.log('写入完成');
})
writeStream.on('error', function (err) {
  console.log(err.stack);
})

console.log('程序执行完毕');