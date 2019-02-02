var Koa = require('koa')
var Router = require('koa-router')
var app = new Koa()
var router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = `
    <ul>
      <li><a href="/hello">helloworld</a></li>
      <li><a href="/about">about</a></li>
    </ul>
  `
}).get('/hello', async (ctx) => {
  ctx.body = 'hello world'
}).get('/about', async (ctx) => {
  ctx.body = 'about'
})

app.use(router.routes(), router.allowedMethods())
// app.use() 用来加载中间件
// 每个中间件，默认接收两个参数（context对象， next函数）。 
// 只要调用了next函数，就可以把执行权交给下一个中间件。
app.listen('3002')