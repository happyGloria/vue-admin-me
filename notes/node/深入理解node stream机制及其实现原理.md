## 1. ���

### 1.1 ʲô������

��node�У�Buffer�ǻ���������˼��stream��������˼���ڼ�����У��������Ǵ洢�м����������CPU��ȡ���ݵ�һ��洢������������stream���Ǵ���ϵͳ�����һ�ַ�ʽ������ϵͳ�������ݿ飨chunk���ķ�ʽ��ȡ���ݣ�ÿ�յ�һ�����ݣ��ʹ��뻺�档

1. ����һ������ģ��������յ���ֽ�`���ݴ����ֶ�`��Buffer��Streamһ�㶼���ֽڼ�������
2. �����������ļ����������ݣ�ֻ��ע�Ƿ���ļ��ж��������ݣ��Լ���������֮��Ĵ���
3. node��`����������Ӧ�����ļ�����socket��`����ʹ��stream��װ�ġ�����`���е�������EventEmitter��ʵ��`��

### 2.2 �����ڵ����壺

��������������ڵ����壬�ȿ�һ�����ӣ�fs.readFile �� fs.createReadStream������
 - readFile�ǰ������ļ�ȫ�������ڴ���;
 - createReadStream�Ǹ���һ��ReadableStream������Լ�������'data'��һ��һ��������ļ����ù��Ĳ��ֻᱻGC���������գ�������ռ�ڴ��١�
 
```
fs.writeFileSync('/path/to/dest', fs.readFileSync('/path/to/source', {encoding: 'utf8'}));  
���ַ�ʽ�ǰ��ļ�����ȫ�������ڴ棬Ȼ����д���ļ�������С�͵��ı��ļ�����û�ж�����⣬����grunt-file-copy��������ʵ�ֵġ�
���Ƕ�������ϴ�Ķ������ļ���������Ƶ����Ƶ�ļ�����������GB��С�����ʹ�����ַ�����������ʹ�ڴ桰���֡���
����ķ���Ӧ���Ƕ�һ���֣�дһ���֣������ļ��ж��ֻҪʱ�������ܻᴦ����ɣ��������Ҫ�õ����ĸ��
```

### 3.3 Node�����淽ʽ
1. �ȵ��������ݽ�����ϣ�һ���Դӻ����ȡ������Ǵ�ͳ�Ķ�ȡ�ļ��ķ�ʽ(���ϴ��ļ�������ʹ�ڴ汬��)��������fs.readFile��ʽ��
2. �����������ķ�ʽ���յ�һ�����ݣ��Ͷ�ȡһ�飬�������ݻ�û�н������ʱ���Ϳ�ʼ������(����ˮһ��)����fs.createReadStream��ʽ��

### 3.4 Node������

1. Readable - �ɶ����� (�� fs.createReadStream());
2. Writable - ��д���� (�� fs.createWriteStream());
3. Duplex - �ɶ�д���� (�� net.Socket);
4. Transform - �ڶ�д�����п����޸ĺͱ任���ݵ� Duplex �� (�� zlib.createDeflate());

## 2 �ɶ���

�ɶ����ڴ���ʱ������ͣģʽ��
### 2.1 �ɶ���״̬�� 
1. ����״̬�����ݻᾡ��ش�����Դ�����û��ĳ���(������ˮһ��)��
2. ��ͣ״̬��������ʽ**����stream.read()��ָ��**�����ɶ����������Ż��ͷ����ݣ�(������ˮ��բ�ţ�����ˮ�ż�������ȥ)��

### 2.2 ��ͣģʽ => ����ģʽ �л�
1. ����data���¼�������һ����������
2. ��ʽ����resume()��
3. ����pipe()��������������һ����д��������

### 2.3 ����ģʽ => ��ͣģʽ �л�
1. �������ɶ�����û���Žӿ�д����ɹܵ���ֱ�ӵ���pause()��
2. �������ɶ����������ɿ�д������˹ܵ�����Ҫ�Ƴ��롰data���¼����������д����������ҵ���unpipe() �����Ͽ����йܵ���

### 2.4 ���api

```
var fs = require('fs')
1. fs.createReadStream(path [,options]);  //�����ɶ���,����rs
    options => {
        highWaterMark: 3, //��������С��Ĭ��64K
        mode: '0x666',  //Ȩ��λ
        flags: 'r',  // ���ļ�����ʲô����, Ĭ��r
        encoding: 'utf8' //ָ����ȡ�ı����ʽ��Ĭ��null��buffer��
        autoClose: true, //falseʱ�����ļ����������ᱻ�رգ���ʹ�д���Ĭ��true
        start: 3,  //������Ϊ4��λ�ÿ�ʼ��
        end: 8,  //��������Ϊ8����(��������λ��)
    }
    
2. rs.setEncoding('utf8');  
    1. ��������һ�������ʽ,���ڽ�����������ݡ� 
    2. ʹ����õ���������utf8��������buffer�����ô˷�����read(size)��������String����
    
3. �¼�
    1) rs.on('data', (chunk) => {});  
    
        1. Ĭ������£��������data�¼��󣬻᲻ͣ�Ķ����ݣ�Ȼ�󴥷�data�¼���������data�¼����ٴζ����ݡ�
        2. ����chunk����������; chunk�Ǹ�Buffer���󣬵�����������rs.setEncoding(encoding)��chunk����String�����ˣ�
        3. ��ΪֻҪ�����ݣ��ͻ�һֱ����data�¼�����ʱ�����ϣ������һ����ͣ�ͻָ������Ļ��ƣ����Կ���ʹ������������ʽ��
            1) rs.pause();  //��ͣ��ȡ�ķ���data�¼�,��ͣ�ɶ��������ٷ���data�¼�
            2) rs.resume();  //�ָ���ȡ������data�¼�
    
    2) rs.on('readable', () => {})
        1. ��fs.createReadStreamʱ���������л��������ͣģʽ;
        2. �����ݿ���Դ����ж�ȡ��ʱ�򷢳�; 
        3. ��ʾ���̴��ļ��ж�ȡhighWaterMark(3�ֽ�)���ݣ�����֮����仺������Ȼ�󴥷�readable;
        4. ����Ҫ�ڻص������е���read(size)���������ܶ�ȡ����;
        
    3) rs.read(size); 
        ����size�Ǹ���������ʾ��Ҫ��ȡ���ݵ�����������������null�������д���������Ĭ�Ϸ��ػ����е��������ݣ�    rs.read(1);
        ��ȡ���̣�
         1.����ڴ����ɶ�����ʱ��ָ����highWaterMark,��fs.createReadStream(path,{highWaterMark: 3});
         2.rs.read(1)���ѵ���һ����ʣ��2���ֽڣ���ʱ����highWaterMark:3,���Զ���ȡhighWaterMark���ֽڲ���������ڣ���ʱrs._readableState.length = 3-1+3=5
         
    2) rs.on('end', () => {}); //�����ݱ�����ʱ����;
    3) rs.on('error', (data) => {});
    
>>> ����Ǹ����ļ��������������������¼�:
    rs.on('open', () => {});
    rs.on('close', () => {});
    
4. rs.pipe(destination,[options])
    pipe ǰ�ߵ�����Ǻ��ߵ�����,���Կ����ٶȣ�����ʵ�����ݵ������ߺ��������ٶȵľ��⣬tcp http �����;
    1) ��һ�� Writable �� readable �ϣ� ����д���Զ��л��� flowing ģʽ�����������ݴ����󶨵� Writable;
    2) �����������Զ�������ʹ�ǿɶ����Ͽ죬Ŀ���д��Ҳ���ᳬ���ɣ�overwhelmed��;

5. rs.unpipe([destination]);
    1) �Ƴ�pipe����ָ����������Ŀ�ĵ�;
    2) ���û�в��������Ƴ����е�pipe����Ŀ�ĵ�;
    3) ����в��������Ƴ��ò���ָ����Ŀ�ĵ�;
    4) ���û��ƥ�������Ŀ�ĵأ��򲻻�����κ�Ч��;

    let fs = require('fs');
    let rs = fs.createReadStream('./1.txt',{});
    let ws = fs.createWriteStream('./w.txt');
    rs.pipe(ws);
    rs.unpipe(ws);

```

### 2.5 ʵ�ֿɶ���

// δ����� to do ...

## 3. ��д��

### 3.1 ���api
```
var fs = require('fs');
1. fs.createWriteStream(path [,options]);  //������д��,����ws
    options => {
        highWaterMark: 3, //��������С��Ĭ��16K
        mode: '0x666',  //Ȩ��λ
        flags: 'w',  // ���ļ�����ʲô����
        start: 3  //������Ϊ4��λ�ÿ�ʼд
    }
    
2. ws.write('string | buffer || rs��chunk','utf8', () => {}) 
    1) �򡰿�д��������д�����ݣ�
    2) ����1�� д������ݣ��ַ��� || stream���󣨱���ɶ�������chunk,chunk�����ǳ���null�����ֵ��|| buffer���󣨱�ʾ���������ݣ�����
       ����2�� �����ʽ
       ����3�� ����ѡ����д����ɺ�Ļص�������
    3) ����booleanֵ������������������false����֮������true��
       �������Ҫ�ȴ� 'drain' �¼��������ܼ���д�����ݣ����ｫ���� false �����򷵻� true����

3. ws.setDefaultEncoding();  //����д�����ݵı����ʽ
    
4. �¼�
    1) ws.on('drain', () => {});  // ��������������¼�
    2) ws.end();  //��ֹ����д����������һ������end������������д���ˣ�
        ������ѡ������ 
        1����һ�������������Ҫд������ݣ��������ַ�����Ҳ������stream�����buffer����
        2���ڶ���������д����룻
        3��������������һ���ص�������finish�¼�����ʱ���ᴥ������ص�������
    3) ws.on('finish', () => {})

```

### 3.2 ʵ�ֿ�д��

> 3.2.1 ����ʵ��

```
let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter {
	constructor (path, options) {
		super(path, options);
		this.path = path;   //д��·��
		this.flags = options.flags || 'w'; //д�뷽ʽ
		this.mode = options.model || 0o666;//Ȩ��λ
		this.start = options.start || 0; //�ļ���д������
		this.pos = this.start;
		this.encoding = options.encoding || 'utf8';
		this.autoClose = options.autoClose;
		this.highWaterMark = options.highWaterMark || 16 * 1024;  //���ˮλ�ߣ��α꣩
		
		this.buffers = [];  //��������ʵ�ʴ�����������ʵ�ֵ�
		this.writing = false;  //�Ƿ�����д������
		this.length = 0;  //�������ֽڳ���
		this.fd = null;   //�ļ�������
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


> 3.2.2 ���Կ�д�� WriteStream

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

## 4 Duplex - �ɶ�д���� 

## 5. Transform

```


