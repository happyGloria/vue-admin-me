let Koa = require('koa'),
  app = new Koa(),
  router = require('koa-router')(),
  bodyParser = require('koa-bodyparser');
/**
 * 用post处理请求时，会遇到一个问题：post请求，会发送form表单或JSON，它作为request的body发送
 * 但是koa提供的request或node体统的request对象，都不提供解析request的body的功能
 * 所以需引入另外一个中间件, koa-bodyparser, 它会把解析的参数，绑定到ctx.request.body中
 * 注意： koa-bodyparser 必须在router之前被注册到app对象上；
 * */

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
});
router.post('/signin', async (ctx, next) => {
  let name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(`sign with name: ${name}, password: ${password}`);

  if (name == 'koa' && password == '123') {
    ctx.response.body = `<h1>Welcome, ${name}</h1>`;
  } else {
    ctx.response.body = `<h1>Loged Faild</h1><p><a href="/">Try again</a></p>`
  }
})
app.use(bodyParser()); 
app.use(router.routes());
app.listen(4000);

