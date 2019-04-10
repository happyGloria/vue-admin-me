const fs = require('fs')

fs.mkdir(__dirname + '/log', (err) => {
  console.log(err || '成功创建/log文件夹')
})

fs.readdir(__dirname + '/log', (err, data) => {
  console.log(err || 'readdir: ' + data)
})
fs.writeFile(__dirname + '/log/hello.txt', '您好\n', err => {
  console.log(err || '成功写入文件hello.txt')
})
fs.appendFile(__dirname + '/log/hello.txt', '追加的内容', err => {
  console.log(err || '追加写入内容成功')
})

fs.readFile(__dirname + '/log/hello.txt', (err, data) => {
  console.log('readFile, 读取到的内容是：', data)
})
fs.rename(__dirname + '/log/hello.txt', __dirname + '/log/greeting.log', (err) => {
  console.log(err || '重命名成功')
})
fs.rmdir(__dirname + '/upload', err => console.log(err || '成功删除目录upload'))

fs.unlink(__dirname + '/log/greeting.log', err => console.log( err || '成功删除文件'))