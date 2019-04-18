const Koa = require('koa');
const app = new Koa();
/**
 * 1. 请求流 通过x-response-time 和 logging中间件， 移交控制给response中间件
 * 2. 当一个中间件调用next(), 则改函数暂停，并将控制传递给定义的下一个中间件；
 * 3. 当下游没有更多的中间件执行后，堆栈将展开并每个中间件恢复执行上游行为；
 */
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}).listen(3000);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`)
  // console.log('ms:', `${ms}ms`)
})

app.use(async ctx => {
  ctx.body = 'hello world'
})

/**
 * 1. app.context 是从其创建ctx的原型；
 * 2. 编辑app.context为ctx添加其他属性；
 * 3. 将ctx添加整个应用程序中,使用的属性或方法非常有用，这可能会更加有效（不需要中间件）或更简单（更少require），而更多的依赖ctx
 * 4. **从ctx添加对数据库的应用**
 */
app.context.db = db();
app.use(async ctx => {
  console.log(ctx.db)
})