let p = new Promise((resolve, reject) => {
  /*if (Math.random() > 0.5) {
    resolve(100);
  } else {
    reject(100);
  }*/
  reject(100);
});

p.then((data) => {
  //p的状态被resolved
  console.log(data+100)
}, (data) => {
  //p的状态被reject
  console.log('xxx:', data+'xxx')
}).then((data) => {

}, (data) => {

});

/**
 * 原理
 * 1. 调用Promise构造函数,构造实例；
 * 2. 构造函数的参数是个函数，此函数接受两个回调函数作为参数，分别为resolve和reject；
 * 3. 在参数函数被执行的过程中：
 *    3.1 如果在其内部调用resolve，会将p的状态变成fulfilled，
 *    3.2 如果在其内部调用reject，会将p的状态变成rejected*
 * 4. 实例调用then：
 *    4.1 then中，会为实例注册两种状态的回调函数；
 *    4.2 当实例的状态为fulfilled,  会触发第一个函数;
 *    4.3 当实例的状态为rejected,  会触发第二个函数;
 **/