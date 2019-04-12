/**
 * Buffer，相当于是一个容器 （存储的是16进制），提供对二进制数据的操作；
 * “固定内存”分配的全局对象，放到缓存区的“字节数要提前确定”；
 * buffer像一个多位字节元素组成的数组，存的最小的单位是字节；
 *
 * 字节：
 *  1字节 = 8位        ->  8bit(8个2进制位 0和1) = 1byte
 *  1k = 1024字节     ->  1k = 1024b
 *  1个汉字 = 3个字节b  = 24位   （由编码格式决定几个字节)
 *  1个字节转换为10进制是255，一个字节转换为16进制是FF
 *
 *  1个字节转换为十进制最大是多少？  255
 *      控制台中打印如下数据，都会转化为十进制输出
 *      0b01 -> 1
 *      0b11 -> 3
 *      0b11111111 -> 255（2的8次方-1） +1 => 然后 进位-1
 *      var sum = 0;
 *      for(var i=1; i<=8;i++){
 *          sum += 1*Math.pow(2, i-1);
 *      }
 *
 *  将十进制转化为二进制？
 *      31 => 对2取余-> 然后倒着取 0b11111
 *      64 => 1000100
 *
 *  将255转换为十六进制最大是多少 ？
 *      255 => 对16取余 => 然后倒着取 0xFF
 *
 *
 * 创建buffer的几种方式：
 * 1. 通过长度创建
     * 1）. Buffer.alloc(6, 1);
     *      // 创建一个长度为6个字节的Buffer, 默认会把所有字节设置为0;
     *      // 参数2，表示填充的默认值；
     * 2）. Buffer.allocUnsafe(6);
     *      // 创建一个长度为6，且未初始化的内存;
     *      // 但返回的 Buffer 实例可能包含旧数据（比Buffer.alloc快）；
     *      // 因此需要使用 fill() 或 write() 重写。
 * 2. 通过数组创建
 *   Buffer.from([1,2,3]);
 * 3. 通过字符串创建
 *   Buffer.from('123');  从字符串中取字节
 * */

const buf1 = Buffer.alloc(10);
console.log(buf1);

const buf2 = Buffer.alloc(10, 258);
console.log(buf2);

const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

const b4 = Buffer.from('123');
const b5 = Buffer.from([0b101010,17,18,19,0x20,257,'你', 'f']);   //17除16，商1余1, 18除16上商1余2
console.log(b4);
console.log(b5);

const b6 = Buffer.from('你好吗？');
console.log(b6);
console.log('buffer的长度', b6.length)


// 将buffer转化成字符串

const b7 = Buffer.alloc(7,'你好')
console.log(b7);
console.log(b7.toString());







