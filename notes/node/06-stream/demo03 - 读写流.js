/**
 * Stream在nodejs中是EventEmitter的实现，并且有多种实现形式，例如：
	 http responses request
	 fs read write streams
	 zlib streams
	 tcp sockets
	 child process stdout and stderr
 */
var fs = require('fs');
var readStream = fs.createReadStream('/path/to/source');
var writeStream = fs.createWriteStream('/path/to/dest');

readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
	writeStream.write(chunk);
});

readStream.on('end', function() { // 当没有数据时，关闭数据流
	writeStream.end();
});

/**
 * 上面的写法有一些问题，
 * 如果写入的速度跟不上读取的速度，有可能导致数据丢失。
 * 正常的情况应该是，写完一段，再读取下一段，如果没有写完的话，就让读取流先暂停，等写完;
 * 再继续，于是代码可以修改为：*/
var fs = require('fs');
var readStream = fs.createReadStream('/path/to/source');
var writeStream = fs.createWriteStream('/path/to/dest');

readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
	if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
		readStream.pause();
	}
});

writeStream.on('drain', function() { // 写完后，继续读取
	readStream.resume();
});

readStream.on('end', function() { // 当没有数据时，关闭数据流
	writeStream.end();
});

// 或者使用更直接的pipe
// pipe自动调用了data,end等事件
fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'));

// 下面是一个更加完整的复制文件的过程
var fs = require('fs'),
	path = require('path'),
	out = process.stdout;

var filePath = '/Users/chen/Movies/Game.of.Thrones.S04E07.1080p.HDTV.x264-BATV.mkv';

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('file.mkv');

var stat = fs.statSync(filePath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data', function(chunk) {

	passedLength += chunk.length;

	if (writeStream.write(chunk) === false) {
		readStream.pause();
	}
});

readStream.on('end', function() {
	writeStream.end();
});

writeStream.on('drain', function() {
	readStream.resume();
});

setTimeout(function show() {
	var percent = Math.ceil((passedLength / totalSize) * 100);
	var size = Math.ceil(passedLength / 1000000);
	var diff = size - lastSize;
	lastSize = size;
	out.clearLine();
	out.cursorTo(0);
	out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
	if (passedLength < totalSize) {
		setTimeout(show, 500);
	} else {
		var endTime = Date.now();
		console.log();
		console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
	}
}, 500);


/**
 * 我们添加了一个递归的setTimeout（或者直接使用setInterval）来做一个旁观者，每500ms观察一次完成进度，并把已完成的大小、百分比和复制速度一并写到控制台上，当复制完成时，计算总的耗费时间。
 */

/*结合nodejs的readline， process.argv等模块，我们可以添加覆盖提示、强制覆盖、动态指定文件路径等完整的复制方法，有兴趣的可以实现一下，实现完成，可以

ln -s /path/to/copy.js /usr/local/bin/mycopy

这样就可以使用自己写的mycopy命令替代系统的cp命令。*/


//http://justcoding.iteye.com/blog/2307215