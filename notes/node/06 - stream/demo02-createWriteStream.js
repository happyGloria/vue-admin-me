var fs = require('fs');
var writeSteam = fs.createWriteStream('y.txt');

writeSteam.write('xyz', 'utf8')
writeSteam.write('abc', 'utf8')
