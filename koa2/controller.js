const fs = require('fs')

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET')) {
      var path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST')) {
      var path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid url: ${path}`)
    }
  }
}


function addControllers(router, dir) {
  let files = fs.readdirSync(__dirname + '/' + dir), // 列出文件，这里用sync是因为启动时，只运行一次，不存在性能问题
    js_files = files.filter(f => f.endWidth('.js'))
  for (var f in js_files) {
    console.log(`process contoller: ${f}`)
    let mapping = require(`${__dirname}/${dir}/${f}`)
    addMapping(router, mapping)
  }
}
module.exports = function (dir) {
  let controllers_dir = dir || 'controllers',
    router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}
