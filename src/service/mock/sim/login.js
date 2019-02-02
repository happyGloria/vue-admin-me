var Test = {}
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

Test.logout = function (params) {
  return {
    'retCode': 1
  }
}
Test.login = function (params) {
  return {
    data: userMap[params['username']],
    retCode: 1
  }
}
Test.loginByUsername = function (param) {
  return {
    data: userMap[param.username],
    retCode: 1
  }
}

Test.getUserInfo = function (token) {
  // const { token } = param2Obj(params.url)
  if (userMap[token]) {
    return {
      data: userMap[token],
      retCode: 1
    }
  } else {
    return {
      retCode: 0
    }
  }
}
export default Test
