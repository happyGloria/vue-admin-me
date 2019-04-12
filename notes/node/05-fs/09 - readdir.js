let fs = require('fs')
var filesArr = [];
fs.readdir(__dirname + '/log', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    ! function getFile(i) {
      if (i == files.length) {
        console.log('目录：', filesArr)
        return false;
      }
      fs.stat(__dirname + '/log/' + files[i], (err, stats) => {
        if (stats.isDirectory()) {
          filesArr.push(files[i]);
        }
        getFile(i++)
      })
    }(0)
  }
})

let fs = require('fs'), path = require('path')
fs.readdir(`${__dirname}/log`, (err, files) => {
  console.log(files)
  if (err) {
    throw err;
  } else {
    files.forEach(file => {
      var filePath = path.normalize(`${__dirname}/log/${file}`)
      fs.stat(filePath, (err, stats) => {
        if (stats.isDirectory()) {
          console.log(filePath + ' is: dir.')
        }
        if (stats.isFile()) {
          console.log(filePath + ' is: File.')
        }
      })
    })
  }
})

