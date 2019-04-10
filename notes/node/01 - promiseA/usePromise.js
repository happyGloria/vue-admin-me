new Promise((resolve, reject) => {
  $.ajax('/api/user/login', {
    success: function(isLogin) {
      if (isLogin) {
        resolve(data);
      } else {
        reject('没有登录');
      }
    }
  })
}).then(
  res => {
    $.ajax('/api/list', {
      success: function(data) {
        resolve(data);
      }
    })
  },
  reason => {
    alert(reason)
  }
).then((data) => {
  // data为list数据
  // 在这里还可以为list排序
  return data.sort();
}).then((list) => {
  // 好了，这里的拿到list 可以使用了
})


const task1 = {ji: 2018};

const task2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2018年');
  }, 5000);
});

const task3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('新年好');
  }, 2000);
});

Promise.all([task1, task2, task3]).then(values => {
  console.log(values);
  // 5秒后打印 [{ji: 2018}, '2018年', '新年好']
});



const task2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2018年');
  }, 5000);
}); ;
const task3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('新年好');
  }, 2000);
});

Promise.race([task1, task2, task3]).then(values => {
  console.log(values);
  // 2秒后打印 '新年好'
});

/**
 * @param {Promise} fn 需要传入一个promise对象
 * Promise.resolve() (传入一个值，返回一个同步执行成功状态的promise, 适用于: 如果有方法要求返回一个promise, 但你已经有一个值了， 则这个时候使用)
 */
const task = (fn) => {
  fn.then()
  // ........
}

Promise.resolve(1);