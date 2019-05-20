/**
 * 1. 自动扫描controllers目录， 找到所有js文件，然后注册每个URL;
 * 2. 抽离： 将扫描controller目录和创建router的代码， 从app.js抽离， 封装中间件， 命名为 controller.js
 */
let fs = require('fs'),
  Koa = require('koa'),
  controller = require('./controller'),
  app = new Koa();
app.use(controller())
app.listen(3000)




