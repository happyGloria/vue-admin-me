var fs = require('fs');
// 打开文件 1. fs.open(filename, flags, [mode], callback);
/**
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */

fs.open(__dirname + '/log/test.txt', 'r', '0666', function (err, fd) {
  console.log(fd);
});

// 2. 读取文件 readFile(filename,[options],callback);
/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.readFile(__dirname + '/log/hello.log', {
  flag: 'r+',
  encoding: 'utf8'
}, (err, data) => {
  console.log(err || data)
})

// 3. 写文件 fs.writeFile(filename, data, [options], callback)
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
let str = '这是一段通过fs.writeFile函数写入的内容；\r\n',
  w_data = new Buffer.from(str)
fs.writeFile(__dirname + '/log/test.txt', w_data, {
  flag: 'a'
}, err => console.log(err || '写入成功'))

// 4. 追加写入 fs.appendFile(filename, data, [options], callback)

fs.appendFile(__dirname + '/log/hello.log', '使用appendFile追加文件内容', err => console.log(err || '追加内容完成'))

// 读文件，读取打开的文件内容到缓冲区中；
//fs.read(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
 */

var fs = require('fs')
fs.open(__dirname + '/log/test.txt', 'r', (err, fd) => {
  if (err) {
    console.log(err);
    return;
  } else {
		var buffer = new Buffer.alloc(255)
		// 每个汉字utf8编码是三个字节，英文是1个字节
		fs.read(fd, buffer, 0, 9, 0, (err, bytesRead, buffer) => {
			if (err) {
				throw err;
			} else {
				console.log(bytesRead)
				console.log(buffer.slice(0, bytesRead).toString())
				// 读取完后，再使用fd读取时，基点是基于上次读取的位置计算。
				fs.read(fd, buffer, 0, 9, null, (err, bytesRead, buffer) => {
					console.log(bytesRead)
					console.log(buffer.slice(0, bytesRead).toString())
				})
			}
		})
  }
})
// 写文件，将缓冲区内数据写入使用fs.open打开的文件
// fs.write(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，从缓存区中读取时的初始位置，以字节为单位
 * length, 整数，从缓存区中读取数据的字节数
 * position, 整数，写入文件初始位置；
 * callback(err, written, buffer), 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
var fs = require('fs')
fs.open(__dirname + '/log/test.txt', 'a', (err, fd) => {
	if (err) {
		console.log(err)
		return
	} else {
		var buf = new Buffer('写入文件数据内容')
		fs.write(fd, buf, 3, 9, 12, (err, written, buf) => {
			if (err) {
				console.log('写入文件失败')
				console.error(err)
				return 
			} else {
				console.log(buf.toString())
				fs.write(fd, buf, 12, 9, null, (err, written, buf) => {
					console.log(buf.toString)
				})
			}
		})
	}
})

// 刷新缓冲区
// 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内。
// 因此可以使用fs.fsync方法将内存中数据写入文件；
// --刷新内存缓冲区；

//fs.fsync(fd, [callback])
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * [callback(err, written, buffer)], 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
var fs = require('fs')
fs.open(__dirname + '/log/hello.log', (err, fd) => {
	if (err) {
		throw err
	} else {
		var buf = new Buffer.from('我爱nodejs编程')
		fs.write(fd, buf, 0, 9, 0, (err, written, buffer) => {
			console.log(written.toString())
			fs.write(fd, buf, 9, buffer.length-9, null, (err, written) => {
				console.log(written.toString())
				fs.fsync(fd, () => {
					fs.close(fd, () => {
						console.log('写入完成，文件关闭')
					})
				})
			})
		})
	}
})
