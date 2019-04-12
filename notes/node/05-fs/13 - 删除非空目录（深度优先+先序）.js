var fs = require('fs');
var path = require('path');

// 同步 深度优先 + 先序
/*
function deepSync(dir) {
	console.log(dir);
	fs.readdirSync(dir).forEach(file => {
		let child = path.join(dir, file);
		let stat = fs.statSync(child)
		if (stat.isDirectory) {
			deepSync(child);
		} else {
			console.log(child);
		}
	})
}
*/

//deepSync('a');


//异步 深度优先+先序遍历
/**
 * 1. readdir 当前目录下的文件，如下面有 a/b a/c a/1.txt
 * 2. 这时候需要遍历这三个文件；
 *    1） 如果当前是个目录，继续readdir当前目录a/b;
 *    2） 如果是个文件，进行下一轮next(index+1)
 * */
function deep(dir, cbFn) {
	fs.readdir(dir, (err, files) => {
		!function next(index) {
			if (index == files.length) {
				return cbFn();
			}
			let child = path.join(dir, files[index]);
			console.log(child);
			fs.stat(child, (err, files) => {
				if (files.isDirectory()) {
					deep(child, () => next(index + 1));
				} else {
					next(index + 1);
				}
			})
		}(0);
	})
}

deep('1', function (err) {

})