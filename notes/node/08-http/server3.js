var http = require('http'),
  qs = require('querystring');
http.createServer((req, res) => {
  var data = '';
  var idx = 0;
  req.on('data', (chunk) => { //该data事件可能会被触发很多次
    console.log(`第${idx}次收到数据`);
    data += chunk;
  });
  req.on('end', () => { //数据全部到达,
    var post = qs.parse(data);
    console.log(post);
  });
}).listen(9028);
