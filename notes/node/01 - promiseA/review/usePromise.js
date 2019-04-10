var myPromise = require('./7. Promise.resolve.js');

/*var p1 = new myPromise((resolve, reject) => {
  resolve(100);
});

let p2 = p1.then((data) => {
  return new Promise((resolve, reject) => {  //使用原生的的Promise
    resolve('123')
  });
});
p2.then((data) => {
  console.log(data); //结果是 Promise { '123' }
});*/

/*var p1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  },5000)
});

var p2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  },1000)
});

var p3 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  },500)
});*/
/*
myPromise.all([
  p1,
  p2
]).then((value) => {
  console.log(value);
}, (reason) => {
  console.log(reason);
});
*/

/*
myPromise.race([
  p1,
  p2,
  p3
]).then((value) => {
  console.log(value);
}, (reason) => {
  console.log(reason);
});*/


/*
myPromise.resolve(10).then((value) => {
  return new Promise((resolve) => {
    resolve('123');
  })
}).then((value) => {
  console.log(value)
});*/

/*
var obj = {
  then: (resolve, reject) => resolve('执行了')
};

var resolved = Promise.resolve(obj);

var resolved = new Promise((resolve, reject) => {
  obj.then(resolve, reject);
});

resolved.then((str) => {
  console.log(str)
});
*/

myPromise.reject(new Promise(function(resolve, reject){
  resolve('123')
})).catch((err) => {
  console.log(err);
});

/*
myPromise.reject('错了').then((data)=> {
  console.log(data);
},(err) => {
  console.log(err);
});
*/


