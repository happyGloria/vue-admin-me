let fs = require('fs'),
  dirname = __dirname + '/upload'
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
