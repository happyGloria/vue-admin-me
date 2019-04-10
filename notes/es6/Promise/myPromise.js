function myPromise(executor) {
  let me = this;
  me.status = 'pending';
  me.value = undefined;  //默认成功值
  me.reason = undefined;  //默认失败值

  function resolve(value) {
    if (me.status == 'pending') {
      me.status = 'resolved';
      me.value = value;
    }
  }

  function reject(reason) {
    if (me.status == 'pending') {
      me.status = 'rejected';
      me.reason = reason;
    }
  }

  executor(resolve, reject);
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let me = this;
  if (me.status == 'resolved') {
    onFulfilled(me.value);
  }
  if (me.status == 'rejected') {
    onRejected(me.reason);
  }
};


module.exports = myPromise;
