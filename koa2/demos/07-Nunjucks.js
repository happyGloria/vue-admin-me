/**
 * 模板引擎：基于模板配合数据构造出字符串输出的一个组件;
 * 最常见的输出是输出网页，也就是html文本，当然也可以输出任意格式的文本，如Text, XML, Markdown等
 * 输出HTML有几个问题，需考虑：
 * 1. 转义， 避免xss攻击
 * 2. 格式化， 对不同类型的变量要格式化， 货币需要变成12, 345.00 这样的格式， 日期需要变成2016 - 01 - 01 这样的格式
 * 3. 简单的逻辑
 *  */

const nunjucks = require('nunjucks')

function createEnv(path, opts) {
  let autoescape = opts.autoescape === undefined ? !0 : opts.autoescape,
    noCache = opts.noCache || !1,
    watch = opts.watch || !1,
    throwOndefined = opts.throwOndefined || !1,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache,
        watch
      }, {
        autoescape,
        throwOndefined
      })
    )
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f])
    }
  }
  return env
}

var env = createEnv('views', {
  watch: true,
  filter: {
    hex: (n) => {
      return 'Ox' + n.toString(16)
    }
  }
})

env.render(__dirname + '/views/hello.html', {
  name: '小明'
})