const http = require('http'),
  fs = require('fs'),
  qs = require('querystring'),
  url = require('url');
var server = http.createServer((req, res) => {
  var data = '';
  var {
    pathname,
    query
  } = url.parse(req.url, true);
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    var post = qs.parse(data);
    var filename = './www' + pathname;
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.write('404');
      } else {
        res.write(data);
      }
      res.end();
    })
  });
})

server.listen(9029);
