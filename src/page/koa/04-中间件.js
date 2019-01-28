const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url}`)
})

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3005)

/**
 * 请求 
 * == > x - response - time中间件 
 * == > logger中间件 
 * == > 响应中间件 
 * == > logger中间件 
 * == > response - time中间件 
 * == > 响应。 
 * 通过这个顺序我们可以发现这是个栈结构以 "先进后出"（first - in -last - out） 的顺序执行
 */