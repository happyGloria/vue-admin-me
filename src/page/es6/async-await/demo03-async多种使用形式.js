// 声明
async function foo()
// 表达式
const foo2 = async function() {}
// 对象的方法
let obj = {
  async foo() {

  }
}
obj.foo().then()

class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars')
  }

  async getAvatar(name) {
    const cache = await this.cachePromise
    return cache.match(`/avatars/${name}.jpg`)
  }
}

const storage = new Storage()
storage.getAvatar('jake').then(resolve => {
  console.log('123')
})

// 箭头函数
const foo = async () => {}