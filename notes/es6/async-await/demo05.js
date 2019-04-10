/*
async function  fn() {
	await Promise.reject('出错了');  //这时候，后面的await语句
	await Promise.resolve('hello');  //不会执行
}

*/
async function  fn() {
	try {
		await Promise.reject('出错了');
	} catch (err){
	
	}
	return await Promise.resolve('hello world');
}
fn().then((result) => {
	console.log(result)
}, (err) => {
	console.log(err)
})

async function fn2() {
	await Promise.reject('出错了').catch(err => console.log(err));
	return await Promise.resolve('hello world');
}
fn2().then((result) => {
	console.log('2', result)
}, (err) => {
	console.log('2', err)
})

async function fn3() {
	try {
		await new Promise((resolve, reject) => {
			throw new Error('出错了')
		})
	}catch(err){
	
	}
	return await('hello world 3')
}

fn3().then((res) => {console.log(res)}, (err) => {console.log(err)})

async function fn4 () {
	try {
		const v1 = await 1;
		const v2 = await 2;
		return v1+v2;
	} catch(err){
		console.log(err)
	}
}
