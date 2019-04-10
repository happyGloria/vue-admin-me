/**
 * 获取GET请求数据源头， 是 koa 中 request 对象中的 query方法 或 queryString方法
 * query返回是格式化好的参数对象
 * querystring返回的是请求字符串
 *  */

const Koa = require('koa')
const app = new Koa()
 // 1. get请求参数获取
 app.use(async (ctx) => {
   const {
    url,
    query,
    querystring
   } = ctx
   ctx.body = {
     url,
     query,
     querystring
   }
   console.log(process.env)
 })
 app.listen(3000)

 // http://localhost:3000/?page=2&limit=10
 // 返回 {"url":"/?page=2&limit=10","query":{"page":"2","limit":"10"},"querystring":"page=2&limit=10"}

 