var fs = require('fs');
var readStream = fs.createReadStream('x.txt');
var writeStream = fs.createWriteStream('y.txt');

readStream.pipe(writeStream);