let EventEmitter = require('events');

//借助util模块，原型继承
let util = require('util');

// 定义一个Bell类
function Bell () {
	EventEmitter.call(this);  //继承私有属性
}
util.inherits(Bell, EventEmitter);

let bell = new Bell();
function stuIn(roomNum, things) {
	console.log(`学生带着${things}进${roomNum}教室`);
}

function teacherIn(roomNumber,things){
	console.log(`讲师带着${things}进${roomNumber}教室`);
}
function masterIn(roomNumber,things){
	console.log(`校长带着${things}进${roomNumber}教室`);
}

bell.addListener('响', stuIn);
bell.on('响', teacherIn);
bell.once('响', masterIn);

bell.emit('响','301','书');
bell.emit('响','302','book');
