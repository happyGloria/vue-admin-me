let fs = require('fs');
let path = require('path');
/*
// 创建目录时，必须保证父级存在
	fs.mkdir('./test',0o777, (err) => {
		console.log(err);
	});
	fs.mkdir('a/b/c', (err, data) => {
		console.log(err);
	});
*/
console.log(fs.constants);
// 访问权限
fs.access('./test', fs.constants.R_OK | fs.constants.W_OK, (err) => {
	console.log(err ? 'no access!' : 'can read/write');
});

/* 实现一个递归创建目录 mkdir -p a/b/c/d*/
function mkdirp(dirs, cb) {
	let paths = dirs.split('/');
	!function next(i) {
		if (i > paths.length) return cb && cb();
		let current = paths.slice(0, i++).join('/');
		fs.access(current, fs.constants.R_OK, (err) => {
			if (err) {
				fs.mkdir(current, () => next(i));
			} else {
				next(i);
			}
		});
	}(0);
}

mkdirp('1/2/3/4');
/*
function mkp(path, callback) {
	var paths = path.split('/');
	var index = 0;

	function mk(p) {
		if (paths.length < index) return ;
		fs.stat(p, (err, stat) => {
			if (err) {
				fs.mkdir(p, (err) => {
					if (err)
						return console.log(err);
					mk(paths.slice(0, ++index).join('/'))
				});
			} else {
				mk(paths.slice(0, ++index).join('/'))
			}
		})
	}
	mk(paths[index]);
}
mkp('a/b/c/d');
*/


/*
function mkp2(path, callback) {
	var paths = path.split('/');
	paths.reduce((prev, cur, idx) => {
		fs.mkdir(prev, (err) => {
			console.log(err);
		})
		return prev.split('/').concat(cur).join('/')
	}/!*, paths[0]*!/)
}

mkp2('a/b/c/d', function (err) {

})*/


// 文件状态

fs.stat('./y.txt', (err, stats) => {
	console.log(stats.isFile());  //判断文件是否是文件
	console.log(stats.isDirectory());  //判断文件是否是文件夹
	//console.log(stats);
	/**{
	  dev: 442403,
	  mode: 33206,
	  nlink: 1,
	  uid: 0,
	  gid: 0,
	  rdev: 0,
	  blksize: undefined,
	  ino: 24206847997412812,
	  size: 18,
	  blocks: undefined,
	  atime: 2018-01-22T08:11:26.157Z,  //access time 访问时间
	  mtime: 2018-01-22T08:11:26.158Z,  //modify time 修改时间
	  ctime: 2018-01-22T08:11:26.236Z,  //change time 修改时间
	  birthtime: 2018-01-22T03:00:54.863Z  // 创建时间
	}*/
});