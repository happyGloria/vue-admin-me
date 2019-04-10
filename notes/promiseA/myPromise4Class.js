class Promise {
  constructor(task) {

    // 当前状态 存在 { pending fulfilled rejected } 3种状态
    this.status = 'pending';

    // 当resolve时的数据
    this.resolveData = null;

    // 当reject时的数据
    this.rejectData = null;

    // 存放所有回调 实现同步调用
    this.onFulfilledList = [];
    this.onRejectedList = [];

    // 执行传入任务
    try {
      task(this.onResolve.bind(this), this.onReject.bind(this));
    } catch (e) {
      this.onReject(e);
    }
  }

  /**
   * 成功，通过
   *
   * @param {any} data resolve数据
   */
  onResolve(data) {
    if (this.status === 'pending') {
      this.status = 'fulfilled';
      this.resolveData = data;
      this.onFulfilledList.forEach(fn => {
        fn(this.resolveData);
      })
    }
  }

  /**
   * 拒绝，失败
   *
   * @param {any} data reject数据
   */
  onReject(data) {
    if (this.status === 'pending') {
      this.status = 'rejected';
      this.rejectData = data;
      this.onRejectedList.forEach(fn => {
        fn(this.rejectData);
      })
    }
  }

  /**
   * 回调
   *
   * @param {function} onFulfilled 成功回调
   * @param {function} onRejected 失败回调
   * @return {*}
   */
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => {};
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => {};
    }

    let promise2;

    switch (this.status) {
      case 'pending':
        promise2 = new Promise((resolve,reject) => {
          this.onFulfilledList.push(() => {
            let x = onFulfilled(this.resolveData);
            this.resolvePromise(promise2, x, resolve, reject);
          });
          this.onRejectedList.push(() => {
            let x = onRejected(this.rejectData);
            this.resolvePromise(promise2, x, resolve, reject);
          });
        });
        break;
      case 'fulfilled':
        promise2 = new Promise((resolve, reject) => {
          let x = onFulfilled(this.resolveData);
          this.resolvePromise(promise2, x, resolve, reject);
        });
        break;
      case 'rejected':
        promise2 = new Promise((resolve, reject) => {
          let x = onRejected(this.rejectData);
          this.resolvePromise(promise2, x, resolve, reject);
        });
        break;
      default:
        throw 'promise status error';
    }

    return promise2;
  }

  /**
   * catch方法 等于 reject
   *
   * @param onRejected
   */
  catch(onRejected) {
    if (typeof onRejected !== 'function') {
      onRejected = () => {};
    }

    let promise2;

    promise2 = new Promise((resolve, reject) => {
      let x = onRejected(this.rejectData);
      this.resolvePromise(promise2, x, resolve, reject);
    });
  }

  /**
   * 递归方法，多次then
   *
   * @param {Promise} promise2 第二个promise
   * @param {any} x 上一次then所返回的数据
   * @param {function} resolve 当前的成功方法
   * @param {function} reject 当前的失败方法
   * @return {*}
   */
  resolvePromise(promise2, x, resolve, reject) {
    // 第二个then方法
    let then;
    // 如果x 等于 promise2 重复调用
    if(promise2 === x){
      return reject(new TypeError('循环引用'));
    }

    if (x instanceof Promise) {
      if(x.status === 'pending'){
        x.then(function(y){
          resolvePromise(promise2, y, resolve, reject);
        }, reject);
      } else if (x.status === 'fulfilled'){
        resolve(x.resolveData);
      } else if (x.status === 'rejected'){
        reject(x.rejectData);
      }
    } else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // 取出下一次then方法
        then = x.then;
        // 如果then为fn 递归调用then方法
        if (typeof then == 'function') {
          then.call(x, function (y) {
            resolvePromise(promise2, y, resolve, reject)
          }, reject);
        } else {
          // 如果then 不为fn 则以x为值fulfill promise
          resolve(x);
        }
      } catch (e) {
        reject(e);
      };
    } else {
      resolve(x);
    }
  }

  /**
   * all方法 传入数组，等待所有promise完成
   * 1. 如果有一个为reject，则返回reject
   *
   * @param {Array} promiseList 需要执行的数组
   * @return {Promise}
   */
  static all(promiseList) {
    // 如果传入不是数组，抛出错误
    if (!Array.isArray(promiseList)) {
      new TypeError('must be an array');
    }
    return new Promise((resolve, reject) => {
      // 如果传入数组长度为0 则直接resolve
      if (promiseList.length === 0) {
        resolve([]);
      }

      const allData = new Array();

      let resI = 0;

      promiseList.forEach((item, index) => {
        if (item instanceof Promise) {
          item.then(
            res => {
              allData[index] = res;
              resolveAll();
            },
            rej => {
              reject(rej);
            }
          )
        } else {
          allData[index] = item;
          resolveAll();
        }
      })

      function resolveAll() {
        resI++;

        if (resI === promiseList.length) {
          resolve(allData);
        }
      }
    });
  }

  /**
   * race 方法 当某一个promise完成，则返回
   *
   * @param {Array} promiseList 需要执行的数组
   * @return {Promise}
   */
  static race(promiseList) {
    // 如果传入不是数组，抛出错误
    if (!Array.isArray(promiseList)) {
      new TypeError('must be an array');
    }

    return new Promise((resolve, reject) => {
      // 如果传入数组长度为0 则直接resolve
      if (promiseList.length === 0) {
        resolve([]);
      }

      promiseList.forEach(item => {
        promiseList.forEach(item => {
          if (item instanceof Promise) {
            item.then(
              res => {
                resolve(res);
              },
              rej => {
                reject(rej);
              }
            )
          } else {
            resolve(item);
          }
        })
      })
    })
  }

  /**
   * resolve方法
   *
   * @param value
   * @return {Promise}
   */
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(res => {
          resolve(res);
        })
      } else {
        resolve(value);
      }
    })
  }

  /**
   * reject方法
   *
   * @param reason
   * @return {Promise}
   */
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }
}