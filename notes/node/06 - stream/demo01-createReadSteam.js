var fs = require('fs');

var data = '';

var rs = fs.createReadStream('./x.txt', {
	highWaterMark: 3
});

rs.setEncoding('utf8');

rs.on('readable', () => {
	console.log(rs._readableState.length);
	let c = rs.read(1);
	if(c) {
		console.log('readable.length:',rs._readableState.length)
	}
	console.log('over', rs._readableState.length)
});
rs.on('data', (chunk) => {
	console.log(chunk);
	data += chunk
});

/*
rs.on('end', () => {
	//console.log(data);
});

rs.on('err', (err) => {
	console.log(err);
});
*/



