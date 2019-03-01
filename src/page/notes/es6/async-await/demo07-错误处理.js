const superagent = require('superagent')
const NUM_RETRIES = 3
async function test() {
  for (let i = 0; i < NUM_RETRIES; i++) {
    try {
      await superagent.get('http://google.com/this-throws-an-error')
      break
    } catch(err) {
      console.log(err)
    }
  }
  console.log(i)
}

test()
// 如果await操作成功，就会使用break语句退出循环；
// 如果失败，会被catch语句捕捉，然后进入下一轮循环。