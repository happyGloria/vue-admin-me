var fs = require("fs");

var data = fs.readFileSync('package.json');
console.log(data.toString());
console.log("程序执行结束!");


fs.readFile('package.json', function (err, data) {
	if (err)
		return console.error(err);
	
	console.log(data.toString());
});
console.log("程序执行结束2!");