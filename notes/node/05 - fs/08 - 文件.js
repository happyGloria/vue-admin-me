/**
 * 会把内容读到内存中
 * 读取的文件，必须要存在；读取返回的data数据是Buffer;
 * */
var fs = require('fs')
fs.readFile(__dirname + '/log/hello.log', (err, data) => {
  console.log(data.toString());
});

/*
写的文件， 不存在， 会自动创建； 里面有内容会被覆盖； 
并且会自动是utf8编码， 即自动调用toString() 方法, 不用使用Buffer.from() 转码
fs.writeFile('1.txt',1);
fs.writeFile('2.txt',Buffer.from('测试写入文件编码格式'));
fs.writeFile('3.txt','测试写入文件编码格式');

fs.writeFile('4.txt', "{name:'zhangsan', age:1}", function (err) {
	console.log(err)
})
fs.writeFile('5.txt', JSON.stringify({name:'zhangsan', age:1})); */
var fs = require('fs')
fs.writeFile(__dirname + '/log/1.txt', '写入的内容', () => {})
fs.writeFile(__dirname + '/log/2.txt', new Buffer.from('测试写入文件的编码格式'), () => {})
fs.writeFile(__dirname + '/log/3.txt', '测试写入文件的编码格式2', () => {})

// 实现一个copy功能， 同步copy
function copySync(source, target) {
  var res = fs.readFileSync(source);
  console.log(res);
  fs.writeFileSync(target, res.toString());
}

copySync('x.txt', 'y.txt');

// 异步copy
function copy(source, target, cbFn) {
  fs.readFile(source, (err, data) => {
    if (err) return cbFn(err)
    fs.writeFile(target, data, cbFn)
  })
}

copy('x.txt', 'y.txt', function (err) {
  console.log(err);
});

fs.open('x.txt', 'r', 0o666, (err, fd) => {
  let buf = Buffer.alloc(6);
  fs.read(fd, buf, 0, 6, null, (err, bytesRead, buffer) => {
    console.log(bytesRead);
    console.log(buffer);
    console.log(buffer === buf);
    console.log(buf.toString());
    console.log(buffer.toString());
  });
});


let buf = Buffer.from('不知道哦是不是真的');
fs.open('y.txt', 'w', (err, fd) => {
  fs.write(fd, buf, 3, 6, 0, (err, bytesWrite, buffer) => {
    console.log(bytesWrite);
    console.log(buffer === buf);

    fs.fsync(fd, function (err) {
      fs.close(fd, function (err) {
        console.log('写入完毕!')
      });
    });
  });
});

function copy(src, dest, callback) {
  const BUFFER_SIZE = 3;
  let buf = Buffer.alloc(BUFFER_SIZE);
  fs.open(src, 'r', function (err, readFd) {
    err ? callback(err) : fs.open(dest, 'w', function (err, writeFd) {
      err ? callback(err) : ! function read(err) {
        err ? callback(err) : fs.read(readFd, buf, 0, BUFFER_SIZE, null, function (err, bytesRead, buffer) {
          bytesRead && fs.write(writeFd, buf, 0, bytesRead, read);
        })
      }();
    })
  })
}

function copy2(src, target, callback) {
  const BUFFER_SIZE = 3;
  let buf = Buffer.alloc(BUFFER_SIZE);
  fs.open(src, 'r', (err, readFd) => {
    fs.open(target, 'w', (err, writeFd) => {
      ! function read(err) {
        fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead) => {
          bytesRead && fs.write(writeFd, buf, 0, bytesRead, read)
        })
      }();
    })
  })
}
copy2('x.txt', 'y.txt');