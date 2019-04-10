// 实现computed,  computed可以缓存，只是把数据挂在了vm上

function MVVM(options = {}) {
  this.$options = options;
  var data = this._data = this.$options.data;
  observe(data);
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
  initComputed.call(this);
  new Compile(options.el, this);
}
function initComputed() {
  let vm = this;
  let computed = vm.$options.computed;
  Object.keys(computed).forEach((key) => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set () {}
    })
  })
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
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        observe(newVal);

        dep.notify();
      }
    });
  }
}

function observe(data) {
  if (typeof data != 'object') return false;
  return new Observe(data);
}

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
        let arr = RegExp.$1.split('.');
        var val = vm;
        arr.forEach(key => {
          val = val[key];
        });
        new Watcher(vm, RegExp.$1, function (newVal) {
          node.textContent = text.replace(reg, newVal);
        });
        node.textContent = text.replace(reg, val);
      }
      // 实现v-model
      if (node.nodeType == 1) {
        var nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach((attr) => {
          let name = attr.name;  //type="text"
          let exp = attr.value;  //v-model='b'
          if(name.indexOf('v-') == 0) {
            node.value = vm[exp]
          }

          new Watcher(vm, exp, (newVal) => {
            node.value = newVal;  //watcher触发时，会自动将内容放到输入框中
          })

          node.addEventListener('input', (e) => {
            var newVal = e.target.value;
            vm[exp] = newVal;
          })
        })
      }
      if (node.childNodes) {
        replace(node);
      }
    });
  }

  vm.$el.appendChild(fragment);
}

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

Watcher.prototype.update = function () {
  let val = this.vm;
  let arr = this.exp.split('.');
  arr.forEach((key) => {
    val = val[key];
  });
  this.fn(val);
};

