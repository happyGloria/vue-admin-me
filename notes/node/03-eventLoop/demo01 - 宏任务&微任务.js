setTimeout(function () {
	console.log(1);
});

new Promise(function(resolve,reject){
	console.log(2);
	resolve(3)
}).then(function(val){
	console.log(val);
});