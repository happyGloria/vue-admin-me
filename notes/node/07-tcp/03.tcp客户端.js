let net = require('net')

// 创建一个TCP客户端连接到刚创建的服务器上，该客户端向服务器发送一串消息，并在得到服务器的反馈后关闭连接。

let client = new net.Socket(),
  PORT = 8081,
  HOST = 'localhost'

client.connect(PORT, HOST, () => {
  console.log('connect to ' + HOST + ':' + PORT)
  client.write('I am happyGloria') //建立连接后立即向服务器发送数据，服务器将收到这些数据
})

client.on('data', (data) => {
  console.log('DATA: ' + data)
  client.destroy() // 完全关闭连接
})

client.on('close', function () {
  console.log('Connection closed')
})
