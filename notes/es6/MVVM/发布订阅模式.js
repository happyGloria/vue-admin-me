// 先有订阅，再有发布；
// 需要有个方法，可以帮助我们订阅一些事件，如[fn1, fn2, fn3],当我们要发布的时候，只需要将这些事件循环执行；


function Dep() {
  this.subs = [];   //事件池
}

Dep.prototype.addSub = function (sub) {  //订阅
  this.subs.push(sub)
};

Dep.prototype.notify = function () {  //执行
  this.subs.forEach(sub => sub.update());
  //模拟 ->每个绑定的方法，都有一个update
};

//watcher是一个类，通过这个类创建的实例，都拥有update方法；
function Watcher(fn) {
  this.fn = fn;
}

Watcher.prototype.update = function () {  //update时，传入的函数会执行
  this.fn();
};
let watcher = new Watcher(function () {  //传入的函数是个监听函数
 console.log('执行了')
});

let dep = new Dep();
dep.addSub(watcher); // 将watcher放到了数组中， [watcher.update]
dep.addSub(watcher);

console.log(dep.subs);

dep.notify();

/**
 * 订阅： 向事件池中扔函数；
 * 发布： 让事件池中的函数，依次执行；*/
