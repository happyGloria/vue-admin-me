var path = require('path')
let config = {
	host: 'localhost',
	port: 9028,
	root: path.resolve(__dirname, '../www')  //服务器启动后的默认工作目录
}

module.exports = config;