const fs = require('fs');
let file = __dirname + '/log/hello.log'
var rs = fs.createReadStream(file);

rs.on('open', fd => console.log('开始读取文件'))
rs.on('data', function (data) {
  console.log(data.toString());
});

rs.on('end', function () {
  console.log('读取文件结束')
});
rs.on('close', function () {
  console.log('文件关闭');
});

rs.on('error', function (err) {
  console.error(err);
});

//暂停和回复文件读取；
rs.on('open', function () {
  console.log('开始读取文件');
});

rs.pause();

rs.on('data', function (data) {
  console.log(data.toString());
});

setTimeout(function () {
  rs.resume();
}, 2000);
/* let count = 0, str = '';
readStream.on('data', (chunk) => {
  console.log(`${++count} 接收到 ${chunk.length}`);
  str += chunk;
})

readStream.on('end', () => {
  console.log('---结束----');
  console.log(count);
  console.log(str);
})
 */
