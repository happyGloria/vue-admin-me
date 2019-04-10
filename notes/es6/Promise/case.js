/**
 * 1. Promise的函数参数，在new时，会立即执行；
 * */
var myPromise = require('./myPromise')
let p = new myPromise((resolve, reject) => {
  reject(222);
  resolve(111);
});

p.then((data) => {
  console.log('data:', data)
}, (err) => {
  console.log('err:', err)
});