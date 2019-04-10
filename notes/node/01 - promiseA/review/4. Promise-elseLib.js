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

/**
 * promise2 新的自定的myPromise对象
 * x  then方法返回的结果 有可能是普通的值，也有可能是promise对象
 * resolve 成功的回调
 * reject 失败的回调
 * */
function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('两个对象不能来自同一个引用！！！');
  }
  if ((x != null) && (typeof x === 'function') || (typeof x === 'object')) {
    let then = x.then;
    if (typeof then === 'function') {
      then.call(x, (value) => {
        //这里value也有可能是个promise, 所以需要进行递归
        resolvePromise (promise2, value, resolve, reject)
      }, (reason) => {
        reject(reason);
      })
    }
  } else {
    resolve(x);
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2;
  if (self.status == 'fulfilled') {
    return promise2 = new myPromise((resolve, reject) => {
      try {
        var x = onFulfilled(self.value);
        /*if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }*/
        resolvePromise(promise2, x, resolve, reject);
      } catch (err) {
        reject(err);
      }
    })
  }

  if (self.status == 'rejected') {
    return promise2 = new myPromise((resolve, reject) => {
      try {
        var x = onRejected(self.reason);
        /*if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }*/
        resolvePromise(promise2, x, resolve, reject);
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
        /*if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }*/
        resolvePromise(promise2, x, resolve, reject);
      })
      self.onRejectedCallbacks.push(() => {
        var x = onRejected(self.reason);
       /* if (x instanceof myPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }*/
        resolvePromise(promise2, x, resolve, reject);
      })
    })
  }
};

Promise.prototype.catch = function (func) {
  return this.then(null, func);
}



module.exports = myPromise;