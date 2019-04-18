/** 针对不同的url，返回不同的处理结果, koa-router */

const Koa = require('koa'),
  app = new Koa(),
  router = require('koa-router')(); // 注意此处 require后是函数调用；
// log request url
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  await next();
});

// 注册一个GET请求
router.get('/hello/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>hello ${name}!!</h1>`;
})

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
})

app.use(router.routes())  // 添加rouer middleware
app.listen(3000)

console.log('app started at port 3000')