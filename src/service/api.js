module.exports = function(prefix) {
  prefix = prefix || '/api'
  return [
    // 登录 登出
    ['login', '/user/login', 'post'], // 登录
    ['logout', '/user/logout', 'post'], // 登出
    ['isKicked',	'/user/iskickedout', 'post'],
    ['resetPwd', '/user/resetpassword', 'post'],
    ['listConst', '/enumeration/list', 'post'], // 常量
    ['listManufacturer', '/enumeration/manufacturers', 'post'], // 厂商

    // 用户管理
    ['listUser', '/user/list', 'post'],
    ['addUser', '/user/add', 'post'],
    ['editUser', '/user/edit', 'post'],
    ['delUser', '/user/delete', 'post'],

    // 系统配置
    ['listSysConf', '/setting/list', 'post'],
    ['editSysConf', '/setting/edit', 'post'],
    ['syncData', '/setting/dataSync', 'post'],

    // 录像监测
    ['listStorage',	'/monitor/storage', 'post'],
    ['getVideoStorageInfo',	'/monitor/storageinfo', 'post'], // 获取录像详细信息

    // 日志
    ['listLog', '/log/list', 'post'],

    // 告警
    ['getRealFaultList', '/fault/real/list', 'post'],
    ['getHistoryFaultList', '/fault/history/list', 'post'],
    ['getFaultRuleList', '/fault/rule/list', 'post'],
    ['getTop100Fault', '/fault/getTop100', 'post'],
    ['dealRealFault', '/fault/real/deal', 'post'],
    ['dealHistoryFault', '/fault/history/deal', 'post'],
    // 设备状态
    ['getDSList', '/deviceStatus/list', 'post'],

    // 设备管理
    ['listDevice', '/device/list', 'post'],
    ['listDevice4Type', '/device/devicetypelist', 'post'], // 根据设备类型过滤设备列表
    ['addDevice', '/device/add', 'post'],
    ['editDevice', '/device/edit', 'post'],
    ['delDevice', '/device/delete', 'post'],
    ['listProbe', '/probe/list', 'post'], // 探针IP

    // 告警规则
    ['addFaultRule', '/fault/rule/add', 'post'],
    ['editFaultRule', '/fault/rule/edit', 'post'],
    ['delFaultRule', '/fault/rule/delete', 'post'],
    ['listFaultRule', '/fault/rule/list', 'post'],

    // 线路
    ['getFault4Station', '/site/getFault4Station', 'post'],

    // 机柜管理
    ['listRack', '/rack', 'post'],
    ['addRack', '/rack/add', 	'POST'],
    ['editRack', '/rack/edit', 	'POST'],
    ['removeRacks', '/rack/delete', 'POST'],
    ['getDeviceDetail', '/rack/detail', 'post'],

    // 统计分析
    ['listStat', '/statistics', 'post'],

    ['exportStat', '/statistics/download', 'post', 'blob'], // 导出
    ['getAudioUrl', '/settings/getvoiceurl', 'post']
  ].map(function(v) {
    v[1] = prefix + v[1]
    /* if (v[2] === 'post' || v[2] === 'put') {
      // v[3] = v[3] || 'text/plain'
      v[3] = v[3] || 'application/x-www-form-urlencoded;charset=UTF-8'
    } */
    return v
  })
}
