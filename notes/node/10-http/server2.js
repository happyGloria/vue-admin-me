var http = require('http'),
  require('url');
// get请求 http://localhost:9028/login?user=zhangsan&pass=123456
http.createServer((req, res) => {
  let {
    pathname,
    query
  } = url.parse(req.url, true);
  res.write(req.url);
  res.end();
}).listen(9028)
