function  myPromise (executor) {
  var self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve (value) {
    if (self.status == 'pending') {
      self.value = value;
      self.status = 'fulfilled';
      self.onResolvedCallbacks.forEach(task => task(value));
    }
  }
  function reject (reason) {
    if (self.status == 'pending') {
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(task => task(reason));
    }
  }
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2;
  if (self.status == 'fulfilled') {
    return promise2 = new myPromise((resolve, reject) => {
      try {
        var x = onFulfilled(self.value);
        if (x instanceof myPromise) {
          // 如果是个promise对象的话，调用then让函数执行;
          // 这个resolve，reject分别是promise2的成功和失败的回调；
          x.then(resolve, reject);  //这就相当于p2中resolve('promise')
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    })
  }

  if (self.status == 'rejected') {
    return promise2 = new myPromise((resolve, reject) => {
      try {
        var x = onRejected(self.reason);
        if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);  //注意这里也是resolve，失败的结果也会作为下一次then成功的参数
        }
      } catch (err) {
        reject(err);
      }
    })
  }

  if (self.status == 'pending') {
    return promise2 = new myPromise((resolve, reject) => {
      //因为这里还不知道pending会走向哪里，所以需要存储到回调函数集中
      self.onResolvedCallbacks.push(() => {
        var x = onFulfilled(self.value);
        if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      })
      self.onRejectedCallbacks.push(() => {
        var x = onRejected(self.reason);
        if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      })
    })
  }
};

Promise.prototype.catch = function (func) {
  return this.then(null, func);
}
module.exports = myPromise;