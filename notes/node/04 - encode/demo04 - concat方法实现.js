/**
 * 1. 判断长度是否传递，传递了用传了的，没传，需要自己计算
 * 2. 通过长度创建这么大的一个buffer
 * 3. 再循环list 将每一项拷贝到这个大buffer上，buf.copy
 * 4. 如果长度过长，fill清空剩余的，或者使用slice截取有效长度；
 * 5. 返回一个新的buffer;
 * */

Buffer.myConcat = function (list, totalLength) {
	if (typeof totalLength === 'undefined' && list.length) {
		totalLength = list.reduce((prev, cur) => prev + cur.length, 0)
	}
	let buffer = Buffer.alloc(totalLength);
	list.reduce((prev, cur) => {
		cur.copy(buffer, prev);
		return prev + cur.length;
	}, 0);

	return buffer.slice(0, totalLength);
};

var b1 = Buffer.from('宇宙');
console.log(b1);
var b2 = Buffer.from('中心');
var b3 = Buffer.from('世界');
var b4 = Buffer.from('屋脊');
var res = Buffer.myConcat([b1, b2, b3, b4], 9);

console.log(res);
console.log(res.toString());