let fs = require('fs');
// 创建目录时，必须保证父级存在
/* fs.mkdir('./test', 0o777, (err) => {
  console.log(err);
});
fs.mkdir('a/b/c', (err, data) => {
  console.log(err);
}); */
// 访问权限
fs.access('./test', fs.constants.R_OK | fs.constants.W_OK, (err) => {
	console.log(err ? 'no access!' : 'can read/write');
});

/* 实现一个递归创建目录 mkdir -p 1/2/3/4*/
let fs = require('fs');
function mkdirp(dirs, cbFn) {
	let paths = dirs.split('/');
	! function next(idx) {
		if (idx > paths.length) return cbFn && cbFn();
		let cur = __dirname + '/' +  paths.slice(0, idx++).join('/');
		fs.access(cur, err => {
			err ? fs.mkdir(cur, () => next(idx)) : next(idx);
		})
	}(0)
}
mkdirp('1/2/3/4', () => {console.log('创建完成')});
var fs = require('fs')
function mkp(dirs, cbFn) {
	var paths = dirs.split('/')
	! function next(idx) {
		if (idx > paths.length) return cbFn && cbFn()
		let cur = __dirname + '/' + paths.slice(0, idx++).join('/')
		fs.stat(cur, err => {
			err ? fs.mkdir(cur, () => next(idx)) : next(idx);
		})
	}(0)
}
mkp('a/b/c/d/e', () => console.log('创建完成'))



// 利用reduce
var fs = require('fs')
function mkp2 (dirs, cbFn) {
	var paths = dirs.split('/')
	paths.reduce((prev, cur, idx) => {
		console.log(idx)
		fs.mkdir(__dirname + '/' + prev, err => {
			console.log(err)
		})
		return (prev.split('/')).concat(cur).join('/')
	})
}
mkp2('m/n/o/p/q') // 有问题

var fs = require('fs')
fs.stat(__dirname + '/log/1.txt', (err, stats) => {
	console.log(stats.isFile());  //判断文件是否是文件
	console.log(stats.isDirectory());  //判断文件是否是文件夹
	console.log(stats);
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