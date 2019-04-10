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
	
	socket.on('close', () => {
		console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
	})
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
