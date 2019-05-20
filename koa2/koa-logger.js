module.exports = async function(ctx, next) {
  const start = new Date().getTime()
  await next()
  const end = new Date().getTime()
  console.log(ctx.request.url, end - start, ctx.body.length)
}