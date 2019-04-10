const fs = require('fs');
/*
const file = fs.readFileSync('package.json', {encoding: 'utf-8'})
fs.writeFileSync('./TEST.json',file);*/

//以上方式是把文件内容全部读入内存，然后再写入文件，对于小型的文本文件，这没有多大问题。
// 但对大文件来说要花很长时间，才能进入数据处理的步骤。甚至引起内存爆仓

let pathname = {
	src: './package.json',
	dist: './test.json'
};

var readStream = fs.createReadStream(pathname.src);
var writeStream =  fs.createWriteStream(pathname.dist);

readStream.pipe(writeStream);

writeStream.on('finish',() => {
	console.log('复制完成');
});


