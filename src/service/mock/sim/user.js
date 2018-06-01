var items = [
  {
    id:	1,
    name: 'admin',
    account: 'admin',
    password:	'admin',
    access:	['perf-history']
  },
  {
    id:	2,
    name: '普通用户',
    account: 'user1',
    password:	'user1',
    access:	['perf-history']
  }
]
export default {
  listUser(param) {
    if (param && param.id) {
      return {
        items: items[0]
      }
    } else {
      return {
        items: items,
        total: 2,
        retCode: 1
      }
    }
  },
  addUser() {
    return { retCode: 1 }
  },
  editUser() {
    return { retCode: 1 }
  },
  delUser() {
    return { retCode: 1 }
  }
}
