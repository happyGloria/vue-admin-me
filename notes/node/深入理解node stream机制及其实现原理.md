## 1. 简介

### 1.1 什么是流？

在node中，Buffer是缓冲区的意思，stream是流的意思；在计算机中，缓冲区是存储中间变量，方便CPU读取数据的一块存储区域；数据流（stream）是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。

1. 流是一组有序的，有起点和终点的字节`数据传输手段`；Buffer和Stream一般都是字节级操作。
2. 流它不关心文件的整体内容，只关注是否从文件中读到了数据，以及读到数据之后的处理；
3. node中`请求流、响应流、文件流、socket流`都是使用stream封装的。并且`所有的流都是EventEmitter的实例`；

### 2.2 流存在的意义：

如果想明白流存在的意义，先看一个例子，fs.readFile 与 fs.createReadStream的区别：
 - readFile是把整个文件全部读到内存里;
 - createReadStream是给你一个ReadableStream，你可以监听它的'data'，一点一点儿处理文件，用过的部分会被GC（垃圾回收），所以占内存少。
 
```
fs.writeFileSync('/path/to/dest', fs.readFileSync('/path/to/source', {encoding: 'utf8'}));  
这种方式是把文件内容全部读入内存，然后再写入文件，对于小型的文本文件，这没有多大问题，比如grunt-file-copy就是这样实现的。
但是对于体积较大的二进制文件，比如音频、视频文件，动辄几个GB大小，如果使用这种方法，很容易使内存“爆仓”。
理想的方法应该是读一部分，写一部分，不管文件有多大，只要时间允许，总会处理完成，这里就需要用到流的概念；
```

### 3.3 Node处理缓存方式
1. 等到所有数据接收完毕，一次性从缓存读取，这就是传统的读取文件的方式(遇上大文件很容易使内存爆仓)，如上述fs.readFile方式；
2. “数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它(像流水一样)，如fs.createReadStream方式；

### 3.4 Node流类型

1. Readable - 可读的流 (如 fs.createReadStream());
2. Writable - 可写的流 (如 fs.createWriteStream());
3. Duplex - 可读写的流 (如 net.Socket);
4. Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (如 zlib.createDeflate());

## 2 可读流

可读流在创建时都是暂停模式。
### 2.1 可读流状态： 
1. 流动状态，数据会尽快地从数据源导向用户的程序(就像流水一样)；
2. 暂停状态，必须显式**调用stream.read()等指令**，“可读数据流”才会释放数据，(就像流水的闸门，打开它水才继续流下去)；

### 2.2 暂停模式 => 流动模式 切换
1. 给“data”事件关联了一个处理器；
2. 显式调用resume()；
3. 调用pipe()方法将数据送往一个可写数据流；

### 2.3 流动模式 => 暂停模式 切换
1. 如果这个可读的流没有桥接可写流组成管道，直接调用pause()；
2. 如果这个可读的流与若干可写流组成了管道，需要移除与“data”事件关联的所有处理器，并且调用unpipe() 方法断开所有管道；

### 2.4 相关api

```
var fs = require('fs')
1. fs.createReadStream(path [,options]);  //创建可读流,返回rs
    options => {
        highWaterMark: 3, //缓冲区大小，默认64K
        mode: '0x666',  //权限位
        flags: 'r',  // 对文件进行什么操作, 默认r
        encoding: 'utf8' //指定读取的编码格式，默认null（buffer）
        autoClose: true, //false时，则文件描述符不会被关闭，即使有错误。默认true
        start: 3,  //从索引为4的位置开始读
        end: 8,  //读到索引为8结束(包括结束位置)
    }
    
2. rs.setEncoding('utf8');  
    1. 给流设置一个编码格式,用于解码读到的数据。 
    2. 使后面得到的数据是utf8，否则是buffer。调用此方法后，read(size)方法返回String对象。
    
3. 事件
    1) rs.on('data', (chunk) => {});  
    
        1. 默认情况下，当你监听data事件后，会不停的读数据，然后触发data事件，触发完data事件后，再次读数据。
        2. 参数chunk，代表数据; chunk是个Buffer对象，但如果你调用了rs.setEncoding(encoding)，chunk就是String对象了；
        3. 因为只要有数据，就会一直触发data事件，这时候你会希望流有一个暂停和恢复触发的机制；所以可以使用如下两个方式：
            1) rs.pause();  //暂停读取的发射data事件,暂停可读流，不再发出data事件
            2) rs.resume();  //恢复读取并触发data事件
    
    2) rs.on('readable', () => {})
        1. 当fs.createReadStream时，会立即切换到这个暂停模式;
        2. 在数据块可以从流中读取的时候发出; 
        3. 表示立刻从文件中读取highWaterMark(3字节)数据，读完之后填充缓存区，然后触发readable;
        4. 必须要在回调函数中调用read(size)方法，才能读取数据;
        
    3) rs.read(size); 
        参数size是个整数，表示所要读取数据的数量；读不到返回null；如果不写这个参数，默认返回缓存中的所有数据；    rs.read(1);
        读取过程：
         1.如果在创建可读流的时，指定了highWaterMark,如fs.createReadStream(path,{highWaterMark: 3});
         2.rs.read(1)消费掉了一个，剩下2个字节，这时不够highWaterMark:3,会自动读取highWaterMark个字节并填到缓存区内，此时rs._readableState.length = 3-1+3=5
         
    2) rs.on('end', () => {}); //当数据被读完时发出;
    3) rs.on('error', (data) => {});
    
>>> 如果是个“文件流”，还有如下两个事件:
    rs.on('open', () => {});
    rs.on('close', () => {});
    
4. rs.pipe(destination,[options])
    pipe 前者的输出是后者的输入,可以控制速度，可以实现数据的生产者和消费者速度的均衡，tcp http 网络层;
    1) 绑定一个 Writable 到 readable 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable;
    2) 数据流将被自动管理。即使是可读流较快，目标可写流也不会超负荷（overwhelmed）;

5. rs.unpipe([destination]);
    1) 移除pipe方法指定的数据流目的地;
    2) 如果没有参数，则移除所有的pipe方法目的地;
    3) 如果有参数，则移除该参数指定的目的地;
    4) 如果没有匹配参数的目的地，则不会产生任何效果;

    let fs = require('fs');
    let rs = fs.createReadStream('./1.txt',{});
    let ws = fs.createWriteStream('./w.txt');
    rs.pipe(ws);
    rs.unpipe(ws);

```

### 2.5 实现可读流

// 未完待续 to do ...

## 3. 可写流

### 3.1 相关api
```
var fs = require('fs');
1. fs.createWriteStream(path [,options]);  //创建可写流,返回ws
    options => {
        highWaterMark: 3, //缓冲区大小，默认16K
        mode: '0x666',  //权限位
        flags: 'w',  // 对文件进行什么操作
        start: 3  //从索引为4的位置开始写
    }
    
2. ws.write('string | buffer || rs的chunk','utf8', () => {}) 
    1) 向“可写数据流”写入数据；
    2) 参数1： 写入的内容（字符串 || stream对象（比如可读数据流chunk,chunk可以是除了null意外的值）|| buffer对象（表示二进制数据）），
       参数2： 编码格式
       参数3： （可选）是写入完成后的回调函数；
    3) 返回boolean值，缓存区已满，返回false，反之，返回true；
       如果流需要等待 'drain' 事件触发才能继续写入数据，这里将返回 false ；否则返回 true；。

3. ws.setDefaultEncoding();  //设置写入数据的编码格式
    
4. 事件
    1) ws.on('drain', () => {});  // 监听缓冲区清空事件
    2) ws.end();  //终止“可写数据流”，一旦调用end方法后，则不能再写入了；
        三个可选参数： 
        1）第一个参数是最后所要写入的数据，可以是字符串，也可以是stream对象或buffer对象；
        2）第二个参数是写入编码；
        3）第三个参数是一个回调函数，finish事件发生时，会触发这个回调函数。
    3) ws.on('finish', () => {})

```

### 3.2 实现可写流

> 3.2.1 代码实现

```
let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter {
	constructor (path, options) {
		super(path, options);
		this.path = path;   //写入路径
		this.flags = options.flags || 'w'; //写入方式
		this.mode = options.model || 0o666;//权限位
		this.start = options.start || 0; //文件的写入索引
		this.pos = this.start;
		this.encoding = options.encoding || 'utf8';
		this.autoClose = options.autoClose;
		this.highWaterMark = options.highWaterMark || 16 * 1024;  //最高水位线（游标）
		
		this.buffers = [];  //缓冲区，实际代码是用链表实现的
		this.writing = false;  //是否正在写入数据
		this.length = 0;  //缓冲区字节长度
		this.fd = null;   //文件描述符
		this.open();
	}
	
	open () {
		fs.open(this.path, this.flags, this.mode, (err, fd) => {
			if (err) {
				if (this.autoClose) {
					this.destroy()
				}
				return this.emit('error', err)
			}
			this.fd = fd
			this.emit('open')
		})
	}
	
	write (chunk, encoding, cb) {
		chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding)
		let len = chunk.length
		this.length += len
		let rest = this.length < this.highWaterMark
		
		if (this.writing) {
			this.buffers.push({
				chunk,
				encoding,
				cb
			})
		} else {
			this.writing = true
			this._write(chunk, encoding, () => this.clearBuffer())
		}
		return rest
	}
	
	clearBuffer () {
		let data = this.buffers.shift();
		if(data) {
			this._write(data.chunk, data.encoding, () => this.clearBuffer())
		}else {
			this.writing = false;
			this.emit('drain');
		}
	}
	
	_write (chunk, encoding, cb) {
		if (typeof this.fd !== 'number') {
			return this.once('open', () => {
				this._write(chunk, encoding, cb)
			})
		}
		fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
				if (err) {
					if (this.autoClose) {
						this.destroy()
						this.emit('error', err)
					}
				}
				this.pos += bytesWritten;
				this.length -= bytesWritten;
				cb && cb();
			}
		)
	}
	
	destroy () {
		fs.close(this.fd, () => {
			this.emit('close');
		})
	}
}

module.exports = WriteStream
```


> 3.2.2 测试可写流 WriteStream

```
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
```

## 4 Duplex - 可读写的流 

## 5. Transform

```


