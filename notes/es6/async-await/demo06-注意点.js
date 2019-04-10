/**
 * 1. await命令后面的Promise对象，运行结果有可能是reject,所以最好将await命令放在try...catch语句中
 * 2. 多个await命令后面的异步操作，如果不存在继发关系，最好让其同时触发；
 * */

function doSomething(){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(100)
		}, 1000)
	})
}

async function fn1() {
	try {
		const res = await doSomething()
		console.log(res)
	}catch(err){
		console.log(err)
	}
}

fn1()


async function doFunc() {
	let docs = [{}, {}, {}]
	let promises = docs.map(doc => {db.post(doc)})
	
	let results = await Promise.all(promises)
}