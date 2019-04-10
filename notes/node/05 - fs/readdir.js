let fs = require('fs')
var filesArr = [];
fs.readdir('logs', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    (function getFile(i) {
      if (i == files.length) {
        console.log('目录：', filesArr)
        return false;
      }
      fs.stat('logs/' + files[i], (err, stats) => {
        if (stats.isDirectory()) {
          filesArr.push(files[i]);
        }
        getFile(i+1)
      })
    })(0)
  }
})