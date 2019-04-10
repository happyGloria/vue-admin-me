let config = require('./config')

let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')
let zlib = require('zlib')

let hanlebars = require('handlebars')
let chalk = require('chalk')  //命令行颜色

class Server {
	constructor (option) {
		this.config = Object.assign({}, option)
	}
	start () {
		http.createServer()
		.on('request', this.request.bind(this))
		.listen(this.config.port, () => {
			let url =  `${this.config.host}:${this.config.port}`
			console.log(`server started at ${chalk.green(url)}`)
		})
	}
	async request(req, res) {
		/**
		 * 1. 解析URL => 与本地工作根目录进行拼接；
		 * 2. 文件|| 文件夹|| 无效
		 * */
		let pathname = url.parse(req.url)
		if (pathname == './favicon.ico') return
		let filepath = path.join(this.config.root, pathname)
		try {
			let stat = await stat(filepath)
			if(stat.isDirectory()) {
				let files = await readdir(filepath)
				files.map(file => {
					name: file,
						path: path.join(pathname, file)
				})
				
				let html = this.list({
					title: pathname,
					files
				})
				
				res.sentHeader('Content-type', 'text-html')
				res.end(html)
			}else{
				this.sendFile(req, res, filepath, stat)
			}
		}catch(err){
			this.sendError(err, req, res)
		}
	}
	sendFile (req, res, filepath, stat) {
		if(this.hanleCache(req, res, filepath, stat)) return ;  //走缓存，直接返回
		res.setHeader('Content-type', mime.getType(filepath)+ ';charset=utf8')
		let encoding = this.getEncoding(req, res)  //客户端编码格式
		
		let rs = this.getStream(req, res, filepath, stat)   //断点续传
		if(encoding) {
			rs.pipe(encoding).pipe(res)
		}else {
			rs.pipe(res)
		}
	}
	sendError() {
		// 错误提示
	}
	// https://juejin.im/post/5a9660fe6fb9a0634b4da9ae
	// https://juejin.im/post/5a9a5ceb6fb9a028c71de8d6
	getEncoding (req, res) {
		//压缩
	}
	
	getStream () {
		//返回部分内容
	}
	
	handleCache (req, res, filepath, stat) {
		//缓存
		let ifModifiedSince = req.headers['if-modified-since']
		let isNoneMatch = req.headers['is-none-match']
		
		res.setHeader('Cache-Control', 'private,max-age=30')
		res.setHeader('Expires', new Date(Data.now()+30*1000)).toGMTString()
		
		let eTage = stat.size
		let lastModified = stat.ctime.toGMTString()
		res.setHeader('Etag', eTage)
		res.setHeader('Last-Modified', lastModified)
		
		if(isNoneMatch && isNoneMatch != eTage) return false
		if(ifModifiedSince && ifModifiedSince !=lastModified) return false
		if(isNoneMatch || ifModifiedSince) {
			res.write('404')
			res.end()
			return true
		}
		return false
	}
}

module.exports = Server;