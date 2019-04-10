var express = require('express')
var app = express();
/** 接口
 * /login?user=**&pass=**
 * 返回 {ok: true/false, msg: 'reason'}
 */
var users = {
  'zhangsan': '123456',
  'lisi': '111',
  'wangwu': '222'
};
app.get('/login', (req, res) => {
  //获取请求参数 
  console.log(req.query)
  var user = req.query['user'];
  var pass = req.query['pass'];
  if (users[user] == null) {
    res.send({
      ok: false,
      msg: '该用户不存在'
    });
  }
    if (!user || !pass) {
      res.send({
        ok: false,
        msg: '参数错误'
      });
    }
  for (var key in users) {
    if (key == user && users[key] == pass) {
      res.send({
        ok: true,
        msg: '登录成功'
      });
      break;
    }
  }
  res.send({
    ok: false,
    msg: '登录失败，用户名或密码错误'
  });
  res.end();
})

app.listen(9028, () => {
  console.log('服务9028开启');
});