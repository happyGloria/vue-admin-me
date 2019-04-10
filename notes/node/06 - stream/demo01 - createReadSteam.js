var fs = require('fs');

var data = '';

var readerStream = fs.createReadStream('./x.txt');

readerStream.setEncoding('utf8');

readerStream.on('data', (chunk) => {
	console.log(chunk);
	data += chunk
})


readerStream.on('end', () => {
	//console.log(data);
})

readerStream.on('err', (err) => {
	console.log(err);
})



