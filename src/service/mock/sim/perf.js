export default {
  /** params: {
    from
    to
    siteId
  }*/
  listStorage: function() {
    return {
      'items': [
        {
          'alertFlag': false,
          'cameraId': '1000014',
          'cameraName': '192.168.5.42',
          'fileSize': '0',
          'frameSum': '0',
          'fullRate': '0.0',
          'loseInfo': [
            { 'missEnd': 1524067200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523980800000, 'missStartStr': '2018-04-18 00:00:00' }
          ],
          'loseSum': '1天0小时0分钟',
          'recordInfo': [],
          'recordStatus': '0',
          'siteId': '1',
          'storageCycle': '30天0小时0分钟',
          'storageTime': '0天0小时0分钟',
          'type': 20,
          'zoneId': 'null',
          'zoneName': ''
        },
        {
          'alertFlag': false,
          'cameraId': '1000003',
          'cameraName': '192.168.12.236',
          'fileSize': '0',
          'frameSum': '0',
          'fullRate': '0.0',
          'loseInfo': [
            { 'missEnd': 1524067200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523980800000, 'missStartStr': '2018-04-18 00:00:00' }
          ],
          'loseSum': '1天0小时0分钟',
          'recordInfo': [],
          'recordStatus': '1',
          'siteId': '1',
          'storageCycle':
            '30天0小时0分钟',
          'storageTime': '0天0小时0分钟',
          'type': 22,
          'zoneId': 'null',
          'zoneName': ''
        }
      ],
      'total': 2,
      'retCode': 1
    }
  },
  /* params: {
      siteId:
      cameraId:
      endTime:
      startTime:
  } */
  getVideoStorageInfo: function(params) {
    return {
      'data': {
        'items': [
          {
            'alertFlag': false,
            'cameraId': '1000003',
            'cameraName': '192.168.12.236',
            'fileSize': '0',
            'frameSum': '0',
            'fullRate': '0.0',
            'loseInfo': [
              { 'missEnd': 1524307200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523300800000, 'missStartStr': '2018-04-18 00:00:00' },
              { 'missEnd': 1524407200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523400800000, 'missStartStr': '2018-04-18 00:00:00' },
              { 'missEnd': 1524507200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523500800000, 'missStartStr': '2018-04-18 00:00:00' },
              { 'missEnd': 1524607200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523600800000, 'missStartStr': '2018-04-18 00:00:00' },
              { 'missEnd': 1524707200000, 'missEndStr': '2018-04-19 00:00:00', 'missStart': 1523700800000, 'missStartStr': '2018-04-18 00:00:00' }
            ],
            'loseSum': '1天0小时0分钟',
            'recordInfo': [],
            'recordStatus': '1',
            'siteId': '1',
            'storageCycle': '30天0小时0分钟',
            'storageTime': '0天0小时0分钟',
            'type': 22,
            'zoneId': 'null',
            'zoneName': ''
          }
        ], 'total': 1
      }, 'retCode': 1
    }
  }
  /* params: {
    from
    isHandled
    level
    name
    pageNo
    pageSize
    siteId
  } */
}
