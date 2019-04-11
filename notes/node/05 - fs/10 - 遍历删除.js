let fs = require('fs');
let path = require('path')
// 同步删除
function rmdirpSync(target) {
	let files = fs.readdirSync(target);
	files.forEach((file) => {
		let childs = path.join(target, file);
		console.log(childs);
		if(fs.statSync(childs).isDirectory()) {
			rmdirpSync(childs)
		}
	})
	fs.rmdirSync(target);
}
rmdirpSync(__dirname + '/1');



var path = require('path');
function wide(dirs) {
	let current = dirs[index];
	fs.stat(current, (err, stat) => {
		if (stat.isDirectory) {
			fs.readdir(current, (err, files) => {
				if (err) {
					return;
				}
				if (files) {
					files.forEach(file => {
						dirs.push(path.join(current, file))
					})
				}
				index++;
				next()
			})
		} else {
			idx++;
			next();
		}
	})
}
