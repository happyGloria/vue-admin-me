// 2. post请求
// koa2未封装获取参数的按方法，需自己解析上下文context的原生node.js请求对象req
// 将POST表单数据解析成querystring  (a=1&b=2&c=3
// 再将querystring解析成json （{"a":"1", "b":"2", "c":"3"}

// 利用koa-bodyparser模块，从POST请求的数据体里面提取键值对

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async (ctx) => {
  if (ctx.url == '/' && ctx.method == 'GET') {
    ctx.body = `
      <h1>koa-bodyparser</h1>
      <form method="POST" action="/">
        Name:<input name="name" /><br/>
        Age:<input name="age" /><br/>
        Email: <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
  } else if(ctx.url == '/' && ctx.method == 'POST') {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    ctx.body = ctx.request.body
  } else {
    ctx.body = '<h1>404 Not Found</h1>'
  }
})

app.listen(3000)