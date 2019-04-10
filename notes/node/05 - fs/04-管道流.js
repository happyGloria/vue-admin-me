var fs = require('fs');
var readStream = fs.createReadStream('logs/hello.log');
var writeStream = fs.createWriteStream('logs/output.txt');

readStream.pipe(writeStream); // 读取hello.log文件内容，并将内容写入到outpu.txt中
console.log('程序执行完毕');