## 1. 引子
最近在学习node.js的net模块，涉及到了tcp/ip,arp,rcmp,http等协议,在之前本人仅对http协议进行过深入的研究，至于其它协议仅仅只是知道有这些协议存在而已，未深入研究过，说是在的，网络协议概念很简单，但是也很抽象，网上查了很多资料，都是一些晦涩难懂的语言，所以个人觉得，明白协议的作用、怎么用、以何种形式用，再去看协议的具体工作过程更会让人印象深刻，下面就简明扼要的阐述TCP、IP、UDP。

> TCP/IP协议，是传输控制协议/因特网互联协议，又名网络通讯协议，是Internet最基本的协议、Internet国际互联网络的基础，由网络层的IP协议和传输层的TCP协议组成。TCP/IP 定义了电子设备如何连入因特网，以及数据如何在它们之间传输的标准。协议采用了4层的层级结构，每一层都呼叫它的下一层所提供的协议来完成自己的需求。通俗而言：TCP负责发现传输的问题，一有问题就发出信号，要求重新传输，直到所有数据安全正确地传输到目的地。而IP是给因特网的每一台联网设备规定一个地址。-- 百度百科

> 不同的计算机系统，就好像语言不同的两个人互相见了面，完全不能交流信息。因而他们需要定义一些共通的东西来进行交流，TCP/IP就是为此而生。

封面图中，展示了OSI七层及TCP/IP五层协议的对应关系；

- 网络由下往上分为物理层、数据链路层、网络层、传输层、应用层。
- IP协议对应于网络层，TCP协议对应于传输层，而HTTP协议对应于应用层，三者从本质上来说没有可比性，socket则是对TCP/IP协议的封装和应用（程序员层面上）。
- 也可以说，TPC/IP协议是传输层协议，主要解决**数据如何在网络中传输**，而HTTP是应用层协议，主要解决 **如何包装数据**。

## 2. 一张图让你了解TCP/IP到底是啥？

![image](https://note.youdao.com/yws/api/personal/file/239D10FF936D4F0DBDCDB7D2CFC6BD61?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)


IP能锁定一台物理机器，对应着一张网卡，外界发来的数据包网卡都会接收。如果所有程序都需要监听网卡接发数据，每个包都被发到了所有应用程序，那应用程序符合不了，最后会垮掉，所以就诞生了端口这个标识，从数据安全层面考虑，一个标识号只能被一个应用程序监听。其实网卡都是被系统层封装了，**端口和进程之间的关系也是系统封装好的**。我们只需要用socket就行，给定一个端口号就行了。其它的事都交给操作系统去做。
**TCP读取端口号，这个端口号就是创建socket时注册的，socket创建成功应该有一个process ID，这应该是操作系统来完成的，TCP于是就把[ 端口号  Process ID] 联系了起来，于是就和这个Process ID进程交换，完成数据的发送和接收。**  [点击查看参考链接](https://www.zhihu.com/question/22577025/answer/125711899)

通过这篇文章，我才知道IP和TCP到底做了些啥玩意....... 就是寻址和保证数据传递正确；

## 3. TCP 

### TCP三次握手四次断开

![image](https://note.youdao.com/yws/api/personal/file/E1B0F167F9EB452B8F207E5C2668456F?method=download&shareKey=7af88e3aed341652c4df90c18ad4747d)

### 1. 三次握手

    1. 第一次握手`主机A`通过一个标识为SYN = j标识位的数据段发送给主机B`请求连接`，通过该数据段告诉主机B希望建立连接，需要B应答，并告诉主机B传输的起始序列号;
    2. 第二次握手是`主机B`用一个`确认应答`ACK = j+1 和同步序列号SYNC = k 标志位的数据段来响应主机A，一是发送ACK告诉主机A收到了数据段，二是通知主机A从哪个序列号做标记;
    3. 第三次握手是`主机A确认收到`了ACK(ack=k+1)主机B的数据段并可以开始传输实际数据。

### 2. 四次断开
    1. `主机A`发送FIN控制位发出`断开连接的请求`;
    2. `主机B`进行响应，`确认收到断开连接请求`;
    3. `主机B`提出反方向的`关闭要求`;
    4. `主机A确认`收到的主机B的`关闭连接请求`;

   问题：为什么断开要四次，而不是三次？因为主机B在响应收到断开链接请求的同时，还存在未发送完的数据；

## 4. UDP

UDP协议并不提供超时重传，出错重传等功能，所以说其是不可靠的协议。

## 5. TCP和UDP的区别:

TCP(Transimision Control Protocal)  ==> http ftp smtp   ==> 电话
- 传输控制协议
- 可靠的、面向连接的协议
- 传输效率低

UDP(User Datagram Protocal)   ==> qq, 微信 ==> 广播

- 用户数据报协议
- 不可靠的、无连接的服务
- 传输效率高

1. TCP是面向链接的，虽然说网络的不安全不稳定特性决定了多少次握手都不能保证连接的可靠性，但TCP的三次握手在最低限度上（实际上也很大程度上保证了）保证了连接的可靠性；而UDP不是面向连接的，UDP传送数据前并不与对方建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收，当然也不用重发，所以说UDP是无连接的、不可靠的一种数据传输协议。
2。也正由于1所说的特点，使得UDP的开销更小数据传输速率更高，因为不必进行收发数据的确认，所以UDP的实时性更好。
    
知道了TCP和UDP的区别，就不难理解为何采用TCP传输协议的MSN比采用UDP的QQ传输文件慢了，但并不能说QQ的通信是不安全的，因为程序员可以手动对UDP的数据收发进行验证，比如发送方对每个数据包进行编号然后由接收方进行验证啊什么的，即使是这样，UDP因为在底层协议的封装上没有采用类似TCP的“三次握手”而实现了TCP所无法达到的传输效率。

## 6. node.js net模块

- net模块也是node的核心模块,用于底层的网络通信；
- http.Server继承了net.Server；
- http客户端与http服务端的通信均依赖于socket（net.Socket）；

### 6.1 net模块组成

主要包含两个部分：

1. **net.Server**
    
    tcp/server, 服务端TCP监听来自客户端的请求，并使用TCP连接(socket)向客户端发送数据；
    内部通过socket来实现与客户端的通信；

2. **net.Socket**

    tcp/本地，客户端TCP连接到服务器，并与服务器交换数据；
    socket的node实现，实现了全双工的stream的接口；


### 6.2 服务端net.Server

```
let net = require('net')
let PORT = 8081
let HOST = 'localhost'
/**
 * 1. 创建一个TCP服务器实例，调用listen函数开始监听指定端口；
 * 2. 传入net.createServer()的回调函数，作为connection事件的处理函数；
 * 3. 在每个connection事件中，该回调函数接收到的socket对象是唯一的；
 * 4. 该连接自动关联一个socket对象
 * */
let server = net.createServer((socket) => {
	console.log('connection:' + socket.remoteAddress, socket.remotePort)
	// 为这个socket实例添加一个“data”事件处理函数
	socket.on('data', (data) => {
		console.log('DATA' + socket.remoteAddress + ":" + data);
		socket.write('You said "'+ data +'"\r\n') // 向客户端回发该数据
	})
	
	socket.on('end', () => {
		console.log('客户端关闭')
		/**
		 * 服务端收到客户端发出的关闭连接请求时，会触发end事件
		 * 这个时候客户端没有真正的关闭，只是开始关闭；
		 * 当真正的关闭的时候，会触发close事件；
		 * */
		server.unref();
		//调用了该方法，则所有的客户端关闭跟本服务器的连接后，将关闭服务器
	})
	
	// 客户端关闭事件
	socket.on('close', () => {
		console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
	})
	
	/*socket.pause()
	socket.setTimeout(3000) //设置客户端超时时间，如果客户端一直不输入，超过这个时间，就认为超时了
	socket.on('timeout', () => {
		console.log('超时了')
		socket.pipe(ws, {end: false})
		// 默认情况下，当可读流读到末尾的时候会关闭可写流
	})*/
})

server.listen(PORT, HOST, () => {
	console.log('服务端的地址是：', server.address())
})

server.on('error', (err) => {
	console.log(err)
})

//服务端也可以通过显式处理"connection"事件来建立TCP连接，只是写法不同，二者没有区别即:
/*
let server = net.createServer()
server.listen(PORT,HOST)
server.on('connection', (socket) => {
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
})*/
server.on('close', () => {
	//关闭服务器，停止接收新的客户端的请求
	console.log( 'close事件：服务端关闭' );
})

server.on('error', (error) => {
	console.log( 'error事件：服务端异常：' + error.message );
})
```
### 6.3 客户端net.Socket

```
let net = require('net')

//创建一个TCP客户端连接到刚创建的服务器上，该客户端向服务器发送一串消息，并在得到服务器的反馈后关闭连接。

var client = new net.Socket()
let PORT = 8081
let HOST = 'localhost'

client.connect(PORT, HOST, () => {
	console.log('connect to ' + HOST + ':' + PORT)
	client.write('I am happyGloria.') //建立连接后立即向服务器发送数据，服务器将收到这些数据
})

client.on('data', (data) => {
	console.log('DATA: ' + data)
	client.destroy() // 完全关闭连接
})

client.on('close', function () {
	console.log('Connection closed')
})
```

### 6.4 基于tcp的聊天室

```
let net = require('net')
let util = require('util')
let HOST = 'localhost'
let PORT = 8082
let clients = {}

function broadcast (username, msg) {
	for (let name in clients) {
		if (name != username) {
			clients[name].write(msg + '\r\n')
		}
	}
}

let server = net.createServer((socket) => {
	socket.setEncoding('utf8')
	server.getConnections((err, count) => {
		socket.write('在线人数是' + count + '位，请输入你的昵称:\r\n')
	})
	
	let username
	socket.on('data', (data) => {
		data = data.replace(/\r\n/, '')
		if (username) {
			broadcast(username, `${username} 说: ${data}`)
		} else {
			if (clients[data]) {
				socket.write('您的昵称' + data + '被占用了，请您更换新的昵称\r\n')
			} else {
				username = data
				clients[username] = socket
				broadcast(username, `欢迎${username}加入`)
			}
		}
	})
	
	socket.on('end', () => {
		broadcast(username, `${username}离开聊天室`)
		clients[username] && clients[username].destroy()
		delete clients[username]
	})
})


server.listen(PORT, HOST, () => {
	console.log(`tcp聊天室已启动，地址是${util.inspect(server.address())}`)
})
```
参考资料： https://www.zhihu.com/question/51074319
