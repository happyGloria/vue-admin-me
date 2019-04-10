function myPromise (executor) {
  var self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallbacks = [];  //Promise resolved 回调函数集
  self.onRejectedCallbacks = [];

  function resolve (value) {
    if (self.status == 'pending') {
      self.status = 'fulfilled';
      self.data = value;
      self.onResolvedCallback.forEach(task => task(value));
    }
  }
  function reject (reason) {
    if (self.status == 'pending') {
      self.status = 'rejected';
      self.data = reason;
      self.onRejectedCallback.forEach(task => task(reason));
    }
  }
  try { //考虑到executor在执行的时候，有可能出错；在出错时，调用reject;
    executor(resolve, reject);
  } catch (err) {
    reject(err)
  }
}

// onResolved，onRejected，分别为Promise成功或失败后的回调
//
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;
  /**
   * promise2的值取决于then里面函数的返回值
   * 如果promise1被resolve了，promise2的将被resolve，
   * 如果promise1被reject了，promise2将被new Error('sth was wrong') reject
   * */

  //根据标准，如果then的参数不是函数，忽略
  onResolved = typeof onResolved === 'function' ? onResolved :  (value) => value;
  onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
    throw reason;
  };

  // 如果promise1(此处即为this/self)的状态已经确定并且是fulfilled，调用onResolved
  if (self.status == 'fulfilled') {
    // 另外考虑到有可能throw Error，所以使用try/catch块里
    return promise2 = new Promise((resolve, reject) => {
      try {
        var x = onResolved(self.data);
        // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        // 否则，以它的返回值做为promise2的结果
        resolve(x);
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status == 'rejected') {
    return promise2 = new Promise((resolve, reject) => {
      try {
        var x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
        resolve(x);
      } catch (err) {
        reject(err)
      }
    });
  }
  /**
   * 如果当前的Promise还处于pending状态，并不能确定调用onResolved还是onRejected，
   * 只能等到Promise的状态确定后，才能确实如何处理。
   * 所以需要把这两种情况的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
   * */
  if (self.status == 'pending') {
    return promise2 = new Promise((resolve, reject) => {
      self.onResolvedCallback.push((value) => {
        try {
          var x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (err) {
          reject(err);
        }
      })

      self.onRejectedCallback.push((reason) => {
        try {
          var x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      })
    });
  }
};

myPromise .prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

module.exports = myPromise;