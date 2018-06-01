export default {
  getDSList() {
    return {
      'data': {
        'items': [
          {
            'siteId': 1358,
            'deviceId': 'server_192.168.123.15',
            'deviceName': '西单tvs',
            'deviceIp': '192.168.123.15',
            'deviceStatus': 0,
            'statusTime': 123123123123,
            'faultLevel': 2,
            'statusInfo': {}
          }
        ],
        'total': 2
      },
      'retCode': 1
    }
  },
  listSysConf() {
    return {
      'items': {
        CurrentSite: '1',
        OCCTcmIP: '192.168.12.89',
        RealToHistorySaveDays: '1',
        HistorySaveDays: '12',
        OpLogSaveDays: '1'
      },
      'retCode': 1
    }
  },
  editSysConf() {
    return {
      'retCode': 1
    }
  },
  syncData() {
    return {
      'retCode': 1
    }
  }
}
