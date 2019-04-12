const fs = require('fs')
const out = process.stdout
var readline = require('readline')

function copy (paths) {
	let {src, dist} = paths
	let readStream = fs.createReadStream(src)
	let writeStream = fs.createWriteStream(dist)
	
	let stat = fs.statSync(src)
	totalSize = stat.size,
		process = 0,
		lastSize = 0,
		startTime = Date.now()
	
	readStream.on('data', (chunk) => {
		process += chunk.length
		if (!writeStream.write(chunk)) {
			readStream.pause()
		}
	})
	
	writeStream.on('drain', () => {
		readStream.resume()
	})
	
	setTimeout(function show () {
		let percent = Math.ceil((process / totalSize) * 100)
		let size = Math.ceil(process / (1024 * 1024))
		let diff = size - lastSize
		lastSize = size
		readline.clearLine()
		readline.cursorTo(0)
		out.write(`已完成${size}MB,${percent}%,速度：${diff * 2}MB/s`)
		
		if (process < totalSize) {
			setTimeout(show, 500)
		} else {
			let endTime = Date.now()
			console.log(`共用时：${(endTime - startTime) / 1000}秒。`)
		}
	}, 500)
	
	readStream.on('end', () => writeStream.end())
}

copy({
	src: './test.mp4',
	dist: './test1.mp4'
})