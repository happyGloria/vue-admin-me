export default {
  listDevice(params) {
    if (params.deviceId) {
      return {
        'data': {
          'items': []
        },
        'retCode': 1
      }
    }
    return { 'data': { 'items': [], 'total': 0 }, 'retCode': 1 }
  },
  addDevice(params) {
    return { 'message': '添加成功', 'retCode': 1 }
  },
  editDevice(params) {
    return { 'message': '编辑成功', 'retCode': 1 }
  },
  listDevice4Type(params) {
    var data = {}
    params.deviceType.forEach((item) => {
      data[item] = [
        { 'id': 1, 'name': '1' },
        { 'id': 2, 'name': '2' },
        { 'id': 3, 'name': '3' }
      ]
    })
    return {
      'data': data,
      'retCode': 1
    }
  }
}
