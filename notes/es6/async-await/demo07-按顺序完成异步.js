/**
 * 按顺序完成异步操作
 * 远程读取一组URL,按读取的顺序输出结果
 * */
const request = require('request')

/*

function loginOrder (urls) {
	const textPromises = urls.map(url => {
		return request(url).then(response => response.text())
	})
	
	textPromises.reduce((chain, textPromise) => {
		return chain.then(() => textPromise).then(text => console.log(text))
	}, Promise.resolve())
}*/

var getPoster = function (name) {
	var url = `https://api.douban.com/v2/movie/search?q=${encodeURI(name)}`
	return new Promise((resolve, reject) => {
		request({url: url, json: true}, function (err, response, body) {
			if (err) {
				return reject(err)
			}
			resolve(body.subjects[0].images.large)
		})
	})
}

async function getImage () {
	var names = ['芳华', '肖申克的救赎']
	for (var name of names) {
		var val = await getPoster(name)
		console.log(val)
	}
}

getImage()