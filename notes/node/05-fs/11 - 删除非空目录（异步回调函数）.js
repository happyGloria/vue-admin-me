let fs = require('fs');
let path = require('path');

/**
 * 将读取到的一次放入到数组中，放入完成后，倒序删除
 * 1. 将传入的目录放入到一个数组中；
 * 2. 通过fs.stat判断是否是目录；
 * 3. 如果是目录的话，readdir, 将其子目录或文件的路径都放到这个数组中,进行下次递归；
 * 4. 如果计数器的长度等于数组的长度；倒序删除 删除过程中，通过fs.stat判断是不是目录或文件
 * */
function rmp(dir, cbFn) {
	let index = 0;
	let paths = [dir];

	function rmdir() {
		let current = paths[--index];
		if (current) {
			fs.stat(current, (err, stat) => {
				if (stat.isDirectory()) {
					fs.rmdir(current, rmdir);
				} else {
					fs.unlink(current, rmdir);
				}
			})
		}
	}

	!function next() {
		if (index == paths.length) {
			console.log(paths);
			return rmdir();
		}
		var current = paths[index++];
		fs.stat(current, (err, stat) => {
			if (err) {
				return cbFn(err)
			} else {
				if (stat.isDirectory()) {
					fs.readdir(current, (err, files) => {
						paths = [...paths, ...files.map((item) => path.join(current, item))];
						next();
					})
				} else {
					next();
				}
			}
		})
	}();
}

rmp('a', (err) => {
	console.log(err);
});
/*

function rmp(dir, callback) {
	let dirs = [dir];
	let index = 0;

	function rmdir() {
		let current = dirs[--index];
		if (current) {
			fs.stat(current, (err, stat) => {
				if (stat.isDirectory()) {
					fs.rmdir(current, rmdir);
				} else {
					fs.unlink(current, rmdir)
				}
			})
		}
	}

	!function next() {
		if (index == dirs.length) {
			return false//rmdir();
		}
		let current = dirs[index++];
		fs.stat(current, function (err, stat) {
			if (err) return callback(err);
			if (stat.isDirectory()) {
				fs.readdir(current, function (err, files) {
					dirs = [...dirs, ...files.map(item => path.join(current, item))];
					console.log(dirs)
					next();
				})
			} else {
				next();
			}
		})
	}()
}

rmp('a', function (err) {
	console.log(err);
})*/
