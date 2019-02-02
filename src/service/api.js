module.exports = function (prefix) {
  prefix = prefix || '/api'
  return [
    // 登录 登出
    ['login', '/user/login', 'post'], // 登录
    ['logout', '/user/logout', 'post'], // 登出
    ['loginByUsername', 'loginByUsername', 'post'],
    ['getUserInfo', '/getUserInfo', 'post'],
    ['getTableTree', '/getTableTree', 'post']

  ].map(function (v) {
    v[1] = prefix + v[1]
    /* if (v[2] === 'post' || v[2] === 'put') {
      // v[3] = v[3] || 'text/plain'
      v[3] = v[3] || 'application/x-www-form-urlencoded;charset=UTF-8'
    } */
    return v
  })
}
