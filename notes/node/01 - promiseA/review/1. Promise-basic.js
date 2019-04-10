function Promise (executor) {
  var self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve (value) {
    if (self.status == 'pending') {
      self.status = 'fulfiled';
      self.data = value;
      self.onResolvedCallbacks.forEach(task => task(value));
    }
  }
  function reject (reason) {
    if (self.status == 'pending') {
      self.status = 'rejected';
      self.data = reason;
      self.onRejectedCallbacks.forEach(task => task(reason));
    }
  }
  try { //考虑到executor在执行的时候，有可能出错；在出错时，调用reject;
    executor(resolve, reject);
  } catch (e) {
    reject(e)
  }
}