const fs = require('fs');
var fileReadStream = fs.createReadStream('logs/hello.log');

let count = 0;
var str = '';
fileReadStream.on('data', (chunk) => {
  console.log(`${++count} 接收到 ${chunk.length}`);
  str += chunk;
})

fileReadStream.on('end', () => {
  console.log('---结束----');
  console.log(count);
  console.log(str);
})