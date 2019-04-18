const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  // ctx 代表context上下文
  /**
   * 为方便起见，许多上下文的方法和访问器，直接委托给他们的ctx.request或ctx.response.
   * 如
   *   ctx.type、ctx.length 委托给response对象
   *   ctx.path、ctx.method 委托给request对象
   * 1. ctx.req  Node的request对象
   * 2. ctx.res  Node的response对象
   * 
   * 1. ctx.request koa的Request对象
   * 2. ctx.response koa 的Response对象
   * 3. ctx.state // 推荐的命名空间, 用于通过中间件传递信息和前端视图
   * 
   * 4. ctx.cookie.get(name, [opts])
   * 5. ctx.cookie.set(name, value, [opts])
   * 6. 
   * 
   * ctx.app 应用程序实例引用
   * ctx.app.emit 
   */
  ctx.state.user = await User.find(id)
})