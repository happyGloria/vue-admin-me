const Koa = require('koa'),
  app = new Koa(),
  koaLog = require('./koa-logger')

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000)
  })
}

app.use(koaLog)

app.use(async (ctx, next) => {
  ctx.body = '1'
  await next()
  ctx.body += '2'
})

app.use(async (ctx, next) => {
  ctx.body += '3'
  await delay()
  await next()
  ctx.body += '4'
})

app.use(async (ctx, next) => {
  ctx.body += '5'
  await next()
  ctx.body += '6'
})

app.listen(3000)