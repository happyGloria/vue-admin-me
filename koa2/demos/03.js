const Koa = require('koa'),
  app = new Koa();
// 对于任何请求，app将调用该异步函数处理请求；

/**
 * ctx 是由koa传入的封装了response,request的变量；
 * next 是koa传入的将要处理的下一个异步函数；\
 * async 标记的函数称为异步函数；
 * await 调用另一个异步函数；
 * 
 * ctx.request.url == ctx.url
 * ctx.response.type == ctx.type
 */
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';  // 设置response的Content-Type
  ctx.response.body  = '<h1>hello Koa2!!</h1>';
}).listen(3000);

/**
 * koa中间件原理：
 *  1. 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数；
 *  2. 为什么调用await next() ?
 *     因为koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()调用下一个async函数
 */

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();

  const ms = new Date().getTime() - start;
  console.log(`Time: ${ms}ms`);
});

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1> Koa 2!!! </h1>"
});

/**
 * middleware的顺序很重要，app.use()的顺序决定了middleware的顺序
 * 如果一个 middleware 没有调用 await next()，会怎么样？
 * 答：后续的middleware将不再执行；
 * 如：一个检测用户权限的middleware，可以决定是否继续处理请求，还是直接返回403错误；
 **/
app.use(async (ctx, next) => {
  if (await checkUserPermission(ctx)) {
    await next();
  } else {
    ctx.response.status = 403;
  }
})