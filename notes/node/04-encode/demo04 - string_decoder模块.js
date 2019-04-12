var { StringDecoder } = require('string_decoder');
var sd = new StringDecoder();

let buffer = Buffer.from('宇宙中心');
let b1 = buffer.slice(0,5);
let b2 = buffer.slice(5);
/*·三个字节组成一个汉字,这时会出现乱码·
·三个字节组成一个汉字,这时会出现乱码·*/

console.log(b1.toString());
console.log(b2.toString());  //宇�� �中心

sd.write(b1);
sd.write(b2);

