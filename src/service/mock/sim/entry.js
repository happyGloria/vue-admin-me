var Test = {}
Test.logout = function(params) {
  return {
    'retCode': 1
  }
}
Test.isKicked = function() {
  return {
    data: {
      status: 0
    },
    'retCode': 0 /* Math.random() > 0.5 ? 1 : 0 */
  }
}
Test.login = function(params) {
  return {
    'data': {
      'id': 951000003,
      'lineInfo': {
        'id': 1,
        'name': '某城市一号线',
        'sites':
        [
          { 'id': 9701, 'level': 2, 'name': '八通线/01四惠站', 'no': 9701, 'type': 3 },
          { 'id': 9702, 'level': 2, 'name': '八通线/02四惠东站', 'no': 9702, 'type': 3 },
          { 'id': 9703, 'level': 2, 'name': '八通线/03高碑店站', 'no': 9703, 'type': 3 },
          { 'id': 9704, 'level': 2, 'name': '八通线/04传媒大学站', 'no': 9704, 'type': 3 },
          { 'id': 9705, 'level': 2, 'name': '八通线/05双桥站', 'no': 9705, 'type': 3 },
          { 'id': 9706, 'level': 2, 'name': '八通线/06管庄站', 'no': 9706, 'type': 3 },
          { 'id': 9707, 'level': 2, 'name': '八通线/07八里桥站', 'no': 9707, 'type': 3 },
          { 'id': 9708, 'level': 2, 'name': '八通线/08通州北苑站', 'no': 9708, 'type': 3 },
          { 'id': 9709, 'level': 2, 'name': '八通线/09果园站', 'no': 9709, 'type': 3 },
          { 'id': 9710, 'level': 2, 'name': '八通线/10九棵树站', 'no': 9710, 'type': 3 },
          { 'id': 9711, 'level': 2, 'name': '八通线/11梨园站', 'no': 9711, 'type': 3 },
          { 'id': 9712, 'level': 2, 'name': '八通线/12临河里站', 'no': 9712, 'type': 3 },
          { 'id': 9713, 'level': 2, 'name': '八通线/13土桥站', 'no': 9713, 'type': 3 },
          { 'id': 9717, 'level': 2, 'name': '八通线/主用控制中心', 'no': 9717, 'type': 1 }
        ]
      },
      'name': params.username,
      'siteId': 951,
      'type': 1,
      'access': ['perf', 'perf-history']
    },
    'retCode': 1
  }
}
Test.listConst = () => {
  return {
    retCode: 1,
    items: {
      faultType: [ // 告警类型
        { 'id': 380001, 'name': '设备离线' }
      ],
      deviceType: [ // 设备类型
        { 'id': 'Server', 'name': '服务器' },
        { 'id': 'Camera', 'name': '摄像机' },
        { 'id': 'Switch', 'name': '交换机' },
        { 'id': 'PowerCrate', 'name': '电源机箱' },
        { 'id': 'OpticalTransReceiver', 'name': '光端机' },
        { 'id': 'Firewall', 'name': '防火墙' },
        { 'id': 'PcTerminal', 'name': 'PC终端' },
        { 'id': 'IPS', 'name': '入侵防御设备' },
        { 'id': 'ScreenSplitter', 'name': '画面分割器' },
        { 'id': 'PDU', 'name': 'PDU' },
        { 'id': 'KVM', 'name': 'KVMSwitcher' },
        { 'id': 'Encoder', 'name': '解码器' },
        { 'id': 'Decoder', 'name': '编码器' }
      ],
      faultLevel: [
        { 'id': 0, 'name': '提示' },
        { 'id': 1, 'name': '一般' },
        { 'id': 2, 'name': '严重' }
      ],
      dealStatus: [
        { 'id': 0, 'name': '未处理' },
        { 'id': 1, 'name': '处理中' },
        { 'id': 2, 'name': '已处理' },
        { 'id': 3, 'name': '人工消除' }
      ],
      deviceStatus: [
        { 'id': 0, 'name': '不在线' },
        { 'id': 1, 'name': '在线' }
      ]
    }
  }
}

Test.resetPwd = () => {
  return {
    retCode: 1
  }
}
export default Test
