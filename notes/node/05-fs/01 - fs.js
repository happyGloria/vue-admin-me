let fs = require('fs'),
  dirname = __dirname + '/upload'
// 1. fs.stat  查看文件与目录信息
fs.stat(dirname, (err, stats) => {
  if (err) { // 无此目录
    fs.mkdir(dirname, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('创建成功')
    })
  } else {
    console.log('目录已经存在', stats.isDirectory())
  }
})

// 2. fs.lstat(path, cbFn) 查看符号链接文件
let fs = require('fs')
fs.lstat(__dirname + '/log', (err, stats) => console.log(stats))

// 3. fs.exists(path, cbFn)
let fs = require('fs')
fs.exists(__dirname + '/logs', (exists) => console.log(exists ? '存在' : '不存在'))

let fs = require('fs'),
  file = __dirname + '/log/test.js'
fs.utimes(file, new Date(), new Date(), err => {
  if (err) {
    throw err;
  } else {
    fs.stat(file, (err, stat) => {
      console.log('访问时间：', stat.atime.toString(), '\n 修改时间：', stat.mtime)
    })
  }
})

let fs = require('fs'),
  file = __dirname + '/log/test.txt'

fs.watchFile(file, { interval: 20 }, (cur, prev) => {
  if (Date.parse(prev.ctime) == 0) {
    console.log('文件被创建');
  } else if (Date.parse(cur.ctime) == 0) {
    console.log('文件被删除');
  } else if (Date.parse(prev.mtime) != Date.parse(cur.mtime)) {
    console.log('文件被修改');
  }
})
setTimeout(() => {
  fs.unlink(file, (err) => console.log(err))
}, 30)

fs.unwatchFile(file, prev => console.log('取消监视'))

let fs = require('fs'),
  dir = __dirname + '/log'
let fsWatcher = fs.watch(dir, (event, filename) => {

})
fsWatcher.on('change', (event, filename) => console.log(filename + '发生变化'))

setTimeout(() => {
  fsWatcher.close(() => console.log(err || '关闭watch'))
})