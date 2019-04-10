/**
 * promise解决掉了回调地狱的问题；
 * */

var p = Promise.resolve({
	then: x => {
		console.log('ok')
	}
});

p.then( x => {
	console.log('为什么这里不继续执行了？');
});


var p = new Promise(resolve => { resolve() });
p.then(x=> { console.log('ok') });
p.then(x=> { console.log('这样也能') });

//采用如下方式：

var p = Promise.resolve({  // 这是一个thenable对象，
  then: x => {
    // then接受两个参数resolve和reject，有点像传进new Promise里的函数的参数，
    // 也就是说这里需要手动调用 resolve 或者 reject，p的then里的函数才会被调用；
    console.log('ok');
    x(); // 也就是说这里需要调用下 x 函数
  }
});

p.then( x => {
  console.log('这样就执行，thenable对象中要手动的调一下resolve函数');
});


