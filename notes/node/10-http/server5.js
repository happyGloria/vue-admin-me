const http = require('http'),
  url = require('url'),
  fs = require('fs');

var users = {};

var server = http.createServer((req, res) => {
  var data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    var {
      pathname,
      query
    } = url.parse(req.url, true);
    if (pathname == '/user') {
      switch (query.action) {
        case 'reg':
          if (users[query.user]) {
            res.write(JSON.stringify({
              ok: false,
              msg: '此用户已存在'
            }));
          } else {
            users[query.user] = query.pass;
            res.write(JSON.stringify({
              ok: true,
              msg: '注册成功'
            }));
          }
          break;
        case 'login':
          if (users[query.user] == null) {
            res.write(JSON.stringify({
              ok: false,
              msg: '此用户不存在'
            }))
          } else if (users[query.user] != query.pass) {
            res.write(JSON.stringify({
              ok: false,
              msg: '用户名或密码错误'
            }))
          } else {
            res.write(JSON.stringify({
              ok: true,
              msg: '登录成功'
            }))
          }
          break;
        default:
          res.write(JSON.stringify({
            ok: false,
            msg: '未知错误'
          }))
      }
    } else {
      var filename = './www' + pathname;
      fs.readFile(filename, (err, data) => {
        if (err) {
          res.write('404');
        } else {
          res.write(data);
        }
        res.end();
      });
    }
  })
});

server.listen(9031);
