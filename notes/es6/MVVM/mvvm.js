/**
 * vm.$options  将所有属性挂在到了$options
 * vm.a 直接代理了 vm.data.a
 *
 * vue 不能新增不存在的属性，不存在的属性没有get和set，无法监控数据变化；
 * 深度响应： 因为每次赋予一个新对象时，会给这个新对象增加数据劫持；
 * */

function MVVM(options = {}) {
  this.$options = options;
  var data = this._data = this.$options.data;
  observe(data);

  // this 代理了 this._data
  for (var key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }

  new Compile(options.el, this);
}

// 主要逻辑
function Observe(data) {
  let dep = new Dep();
  for (let key in data) {
    var val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target); //监控函数 [Watcher]
        return val;
      },
      set(newVal) {  //更改值时
        if (val === newVal) {
          return;
        }
        val = newVal;
        observe(newVal);

        dep.notify(); //让Watcher的update方法执行
      }
    });
  }
}

// 观察对象，给对象增加Object.defineProperty()
function observe(data) {
  if (typeof data != 'object') return false;
  return new Observe(data);
}

/**
 * el 编译范围
 * vm MVVM实例，vm对象
 *
 * 借助文档碎片,转到内存中操作
 * */

function Compile(el, vm) {
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment();
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }
  replace(fragment);

  function replace(fragment) {
    Array.from(fragment.childNodes).forEach((node) => {
      var text = node.textContent;
      let reg = /\{\{(.*)\}\}/;
      if (node.nodeType === 3 && reg.test(text)) {
        // console.log(RegExp.$1)
        let arr = RegExp.$1.split('.');  //[a, name]
        var val = vm;

        arr.forEach(key => {
          val = val[key];  //取this.a.name 或 this.b
        });

        new Watcher(vm, RegExp.$1, function (newVal) {
          node.textContent = text.replace(reg, newVal);
        });
        //替换之前，要订阅一下事件
        node.textContent = text.replace(reg, val);
      }
      if (node.childNodes) {
        replace(node);
      }
    });
  }

  vm.$el.appendChild(fragment);
}

// 链接视图与数据 => 实现vm.a = 123 赋值时，页面刷新；
// 发布订阅模式
function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
};

Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update());
};

function Watcher(vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  //将Watcher添加到订阅中
  Dep.target = this;
  let val = vm;
  let arr = exp.split('.');
  arr.forEach((key) => {
    val = val[key];
  });
  Dep.target = null;
}

Watcher.prototype.update = function () { //更新视图
  let val = this.vm;
  let arr = this.exp.split('.');
  arr.forEach((key) => {
    val = val[key];
  });
  this.fn(val);
};

