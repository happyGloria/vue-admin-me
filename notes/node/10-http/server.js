const http = require('http'),
  fs = require('fs');
var server = http.createServer((req, res) => {
  console.log(req.url); //客户端访问地址
  var filename = './www' + req.url;
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.write('404');
    } else {
      res.write(data);
    }
    res.end();
  });
});
server.listen(9028);

//请求静态文件 http://localhost:9028/login?name=zhangsan&pass=123456
