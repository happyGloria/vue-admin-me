var b1 = Buffer.from('宇宙');
var b2 = Buffer.from('中心');

/*// 将b1和b2拷贝到buf中
var buf = Buffer.allocUnsafe(12);
b1.copy(buf, 0);
b2.copy(buf, 6);
console.log(buf.toString());*/
res = Buffer.concat([b1, b2], 1000);
console.log(res);
console.log(res.toString());


let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
let buf3 = Buffer.concat([buf1,buf2],10);
console.log(buf3.toString());