let fs = require('fs');
fs.stat('upload', (err, stats) => {
  if (err) { // 无此目录
    fs.mkdir('upload', (err) => {
      if (err) {
        console.log(err);
        return ;
      }
      console.log('创建成功')
    })
  } else {
    console.log('目录已经存在');
    console.log(stats.isDirectory());
    
  }
})
