const fs = require('fs');
fs.mkdir('logs', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('成功创建/logs文件夹')
  }
})
fs.writeFile('logs/hello.log', '您好\n', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('成功写入文件')
  }
})

fs.appendFile('logs/hello.log', 'utf8', (err,data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

fs.readFile('logs/hello.log', (err,data) => {
  console.log('readFile,读取到的是：', data) // <Buffer e6 82 a8 e5 a5 bd 0a>
})

fs.readdir('logs', (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log('readdir:', data); //  <Buffer e6 82 a8 e5 a5 bd 0a 75 74 66 38>
  }
})
fs.stat('./test.txt', (err, stats) => {
  if (err) {
    console.log(err)
  } else {
    console.log(stats)
    console.log(`文件： ${stats.isFile()}`)
    console.log(`目录： ${stats.isDirectory()}`)
  }
});

fs.rename('logs/hello.log', 'logs/greeting.log', (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log('重命名成功')
  }
})

fs.rmdir('logs', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('成功删除目录,logs')
  }
})

fs.unlink('logs/greeting.log', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('成功删除了文件，greeting.log')
  }
})

