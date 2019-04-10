const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
  ctx.body = 'hello word'
})
app.listen(3000)

/**
 * Context对象
 * ctx.response/ctx.request
 * ctx.body 是 ctx.response.body的简写
 * */
