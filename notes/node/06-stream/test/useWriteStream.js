
let WriteStream  = require('./WriteStream.js');

var ws = new WriteStream('./package.json', {
	mode: '0x666',
	encoding: 'utf8',
	highWaterMark: 3,
	start: 0,
	autoClose: true
});

let i = 9;
function write() {
	let flag = true;
	while(flag && i>0) {
		flag = ws.write((i--)+'');
		console.log('flag: ', flag)
	}
}
write();
ws.on('drain', ()=>{
	console.log('drain');
	write();
});

//let rs = fs.createReadStream('./jquery-3.2.1.min.js');

//let rs = fs.createReadStream('./fullcalendar.js');
/*
let rs = fs.createReadStream('./22.2816e01ace09159825a3.js');

let ws = fs.createWriteStream('y.txt', {
	/!*highWaterMark:3*!/
});
rs.on('data', (chunk) => {
	ws.write(chunk);
});

ws.on('error', () => {
	console.log('error');
});

ws.on('drain', () => {
	console.log('drain');
	//write();
});
*/

/*
rs.on('readable', () =>{
	rs.read(1);
	console.log(rs._readableState.length)
})*/

//ws.write(Buffer.from('测试写入二进制数据'))

/*let i = 9;
function write() {
	let flag = true;
	while(flag && i>0) {
		flag =
		console.log('flag: ', flag);
	}
}
write();
*/
