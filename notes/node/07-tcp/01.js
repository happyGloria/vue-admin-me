let net = require('net'),
  path = require('path'),
  PORT = 8080,
  HOST = 'localhost';
let ws = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'));
// socket是个双工流，代表了与客户端的连接
let server = net.createServer(socket => {
  console.log('服务端：收到来自客户端的请求')
  // 通过监听data事件，获得可读流中的数据
  socket.on('data', (data) => console.log(`服务端：收到客户端的数据，内容为: ${data}`))

  socket.write('你好，我是服务端')

  socket.on('end', () => {
    console.log('客户端关闭')
    /**
     * 服务端收到客户端发出的关闭连接请求时，会触发end事件
     * 这个时候客户端没有真正的关闭，只是开始关闭；
     * 当真正的关闭的时候，会触发close事件；*/
    server.unref();
    // 调用了该方法，则所有的客户端关闭跟本服务器的连接后，将关闭服务器
  })

  socket.pause()
  socket.setTimeout(3000) // 设置客户端超时时间，如果客户端一直不输入，超过这个时间，就认为超时了
  socket.on('timeout', () => {
    console.log('超时了')
    socket.pipe(ws, {
      end: false
    })
    // 默认情况下，当可读流读到末尾的时候会关闭可写流
  })
})

server.listen(PORT, HOST, () => {
  console.log(server.address())
  //返回服务端的地址信息，比如绑定的ip地址、端口等。
  // { port: 3000, family: 'IPv4', address: '127.0.0.1' }
  console.log('服务端：开始监听来自客户端的请求!')
  /*	server.close((error) => {
  		if (error) {
  			console.log('close回调：服务端异常：' + error.message)
  		} else {
  			console.log('close回调：服务端正常关闭')
  		}
  	})*/
})

server.on('close', () => {
  //关闭服务器，停止接收新的客户端的请求
  console.log('close事件：服务端关闭');
  /**
   * 对正在处理中的客户端请求，服务器会等待它们处理完（或超时），然后再正式关闭。
   * 正常关闭的同时，callback 会被执行，同时会触发 close 事件。
   * 异常关闭的同时，callback 也会执行，同时将对应的 error 作为参数传入。（比如还没调用 server.listen(port)
   * 之前，就调用了server.close()）
   */
  /**
   * 已调用server.listen()：正常关闭，close事件触发，然后callback执行，error参数为undefined
   * 未调用server.listen()：异常关闭，close事件触发，然后callback执行，error为具体的错误信息。（注意，error
   * 事件没有触发）*/
})

server.on('error', (error) => {
  console.log('error事件：服务端异常：' + error.message);
})
