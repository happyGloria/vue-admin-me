const fs = require('fs');
var readStream = fs.createReadStream(__dirname + '/log/hello.log');

let count = 0, str = '';
readStream.on('data', (chunk) => {
  console.log(`${++count} 接收到 ${chunk.length}`);
  str += chunk;
})

readStream.on('end', () => {
  console.log('---结束----');
  console.log(count);
  console.log(str);
})