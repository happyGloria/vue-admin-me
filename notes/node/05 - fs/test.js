var fs = require('fs');
let ws = fs.createWriteStream('./3.txt', {
	flag: 'w',
	mode: 0o666,
	encoding: 'ascii',
	autoClose: true
});

let bf = Buffer.from('珠峰', 'ascii');

ws.write(bf);