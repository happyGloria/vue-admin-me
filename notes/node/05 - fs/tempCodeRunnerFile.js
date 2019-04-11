let fs = require('fs'),
  dir = __dirname + '/log/test.txt'

fs.watchFile(dir, { interval: 20 }, (cur, prev) => {
  if (Date.parse(prev.ctime) == 0) {
    console.log('文件被创建');
  } else if (Date.parse(cur.ctime) == 0) {
    console.log('文件被删除');
  } else if (Date.parse(prev.time) != Date.parse(cur.time)) {
    console.log('文件被修改');
  }
})
setTimeout(() => {
  fs.unlink(dir, (err) => console.log(err))
}, 30)