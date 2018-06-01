export default {
  listFaultRule() {
    return {
      'items': [{
        'id': 1,
        'name': '服务器',
        'detectionInterval': 15,
        'alertCount': 3,
        'alertInterval': 5,
        'dealDelayed': 30,
        'deviceType': 'Server'
      }],
      'retCode': 1
    }
  },
  listProbe() {
    return {
      'encoder': {
        '12': 1
      },
      'retCode': 1
    }
  },
  dealFault() {
    return {
      'retCode': 1
    }
  },
  getTop10Fault() {
    return {
      'items': [{
      }],
      'retCode': 1
    }
  },
  getTop100Fault() {
    return { 'items': [{ 'dealStatus': 0, 'deviceId': 'Probe-127.0.0.1', 'deviceName': '系统默认探针(系统自动生成)', 'deviceType': '探针服务', 'faultDesc': '探针服务连接失败！', 'faultFirstTime': 1525426458000, 'faultLastTime': 1525426518000, 'faultLevel': 1, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1943, 'siteId': 0 }, { 'dealStatus': 0, 'deviceId': 'Storage-55.77.88.99', 'deviceName': 'c-1', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418523000, 'faultLastTime': 1525426379000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1591, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Storage-88.99.88.88', 'deviceName': 'c-2', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418523000, 'faultLastTime': 1525426379000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1592, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Storage-188.188.188.188', 'deviceName': '22', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418822000, 'faultLastTime': 1525426378000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1669, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Storage-12.33.55.55', 'deviceName': 'dd', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418822000, 'faultLastTime': 1525426378000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1670, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Storage-22.22.33.55', 'deviceName': '22.22.33.55', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525342553000, 'faultLastTime': 1525426378000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1427, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Storage-12.23.34.52', 'deviceName': '11', 'deviceType': '存储设备', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418822000, 'faultLastTime': 1525426377000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1671, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-192.168.121.12', 'deviceName': '史蒂夫', 'deviceType': '服务器', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418905000, 'faultLastTime': 1525426377000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1704, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-44.44.44.44', 'deviceName': '44', 'deviceType': '服务器', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418905000, 'faultLastTime': 1525426377000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1705, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-192.168.121.11', 'deviceName': '史蒂夫', 'deviceType': '服务器', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418905000, 'faultLastTime': 1525426376000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1703, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'PDU-192.168.22.33', 'deviceName': '测试PDU', 'deviceType': 'PDU', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418641000, 'faultLastTime': 1525426375000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1612, 'siteId': 951 }, { 'dealStatus': 0, 'deviceId': 'PDU-88.88.99.100', 'deviceName': 'pdu-1', 'deviceType': 'PDU', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418903000, 'faultLastTime': 1525426375000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1691, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-1.1.1.1', 'deviceName': 'tvr1', 'deviceType': '服务器', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418904000, 'faultLastTime': 1525426375000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1698, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Encoder-2.2.2.2', 'deviceName': 'decoder1', 'deviceType': '编码器', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418701000, 'faultLastTime': 1525426374000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1634, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-89.89.89.89', 'deviceName': 'cc-1', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418760000, 'faultLastTime': 1525426373000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1648, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Camera-55.66.77.88', 'deviceName': '7898', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418760000, 'faultLastTime': 1525426373000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1649, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-3.3.3.3', 'deviceName': '3.3.3.3', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418760000, 'faultLastTime': 1525426372000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1647, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-2.2.2.2-2', 'deviceName': 'cam5', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418902000, 'faultLastTime': 1525426372000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1682, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-2.2.2.2-1', 'deviceName': 'cam4', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418902000, 'faultLastTime': 1525426372000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1683, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-192.168.12.238', 'deviceName': '192.168.12.238', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418902000, 'faultLastTime': 1525426371000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1687, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Camera-192.168.12.236', 'deviceName': '192.168.12.236', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418902000, 'faultLastTime': 1525426371000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1688, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Camera-12.12.12.12', 'deviceName': '12', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418819000, 'faultLastTime': 1525426370000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1665, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Camera-12.55.88.99', 'deviceName': 'dd', 'deviceType': '摄像机', 'faultDesc': '设备无法ping通[探针上报:192.168.12.89]', 'faultFirstTime': 1525418819000, 'faultLastTime': 1525426370000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 1666, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-44.44.44.44', 'deviceName': '44', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525426051000, 'faultLastTime': 1525426138000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1926, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-192.168.121.12', 'deviceName': '史蒂夫', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525426047000, 'faultLastTime': 1525426134000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1925, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-192.168.121.11', 'deviceName': '史蒂夫', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525426044000, 'faultLastTime': 1525426131000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1924, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-192.168.12.128', 'deviceName': 'test001', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525343271000, 'faultLastTime': 1525426128000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1446, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-172.16.35.151', 'deviceName': '172.16.35.151', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525343267000, 'faultLastTime': 1525426127000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1445, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-172.16.35.149', 'deviceName': '172.16.35.149-172.16.35.149', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525343264000, 'faultLastTime': 1525426126000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1442, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-172.16.35.148', 'deviceName': '172.16.35.148', 'deviceType': '服务器', 'faultDesc': '部分或全部性能指标，snmp协议获取失败！请检查！[探针上报:192.168.12.89]', 'faultFirstTime': 1525343264000, 'faultLastTime': 1525426125000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': 'SNMP连接失败', 'id': 1443, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'Server-172.16.35.148', 'deviceName': '172.16.35.148', 'deviceType': '服务器', 'faultDesc': 'rofs3 transaction engine running.[tvs上报]', 'faultFirstTime': 1525347685000, 'faultLastTime': 1525399343000, 'faultLevel': 0, 'faultStatus': 1, 'faultType': '未知告警类型(32804)', 'id': 1447, 'siteId': 1 }, { 'dealStatus': 0, 'deviceId': 'PDU-192.168.111.111', 'deviceName': 'PDU-192.168.111.111', 'deviceType': 'PDU', 'faultDesc': 'ping设备[探针上报:192.168.12.89]', 'faultFirstTime': 1524881519000, 'faultLastTime': 1524914280000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '设备离线', 'id': 732, 'siteId': 1289 }, { 'dealStatus': 0, 'deviceId': 'Server-172.16.35.148', 'deviceName': '172.16.35.148', 'deviceType': '服务器', 'faultDesc': '存储服务172.16.35.148连接异常[tvs上报]', 'faultFirstTime': 1524814615000, 'faultLastTime': 1524822042000, 'faultLevel': 2, 'faultStatus': 1, 'faultType': '服务连接异常', 'id': 727, 'siteId': 1 }], 'retCode': 1, 'total': 33 }
  },
  getRealFaultList() {
    return {
      'items': [{
        'id': 1,
        'faultType': 13158,
        'faultLevel': 0,
        'siteId': 1358,
        'deviceType': 'Server',
        'deviceName': 'server_192.168.125.44',
        'faultFirstTime': 1524225000000,
        'faultLastTime': 1524225000000,
        'dealTime': 1524229000000,
        'dealStatus': 1,
        'dealUser': 'u1',
        'dealPlanDesc': '重启服务器',
        'faultDesc': '服务器离线'
      },
      {
        'id': 1,
        'faultType': 13158,
        'faultLevel': 1,
        'siteId': 1358,
        'deviceType': 'Server',
        'deviceName': 'server_192.168.125.44',
        'faultFirstTime': 1524223000000,
        'faultLastTime': 1524223000000,
        'dealTime': 1524226000000,
        'dealStatus': 1,
        'dealUser': 'u1',
        'dealPlanDesc': '重启服务器',
        'faultDesc': '服务器离线'
      },
      {
        'id': 1,
        'faultType': 13158,
        'faultLevel': 2,
        'siteId': 1358,
        'deviceType': 'Server',
        'deviceName': 'server_192.168.125.44',
        'faultFirstTime': 1524222000000,
        'faultLastTime': 1524222000000,
        'dealTime': 1524232000000,
        'dealStatus': 1,
        'dealUser': 'u1',
        'dealPlanDesc': '重启服务器',
        'faultDesc': '服务器离线'
      }],
      'total': 2,
      'retCode': 1
    }
  },
  getHistoryFaultList() {
    return {
      'items': [{
        'code': 10005,
        'desc': '摄像机192.168.12.236录像恢复！',
        'deviceId': 1000003,
        'deviceIp': '192.168.12.236',
        'deviceName': '192.168.12.236',
        'deviceType': 22,
        'faultDate': 1524166429,
        'handlerDate': null,
        'handlerId': null,
        'id': 28590,
        'isHandled': false,
        'faultLevel': 0,
        'siteId': 1
      },
      {
        'code': 10004,
        'desc': '摄像机192.168.12.236录像停止！',
        'deviceId': 1000003,
        'deviceIp': '192.168.12.236',
        'deviceName': '192.168.12.236',
        'deviceType': 22,
        'faultDate': 1524155629,
        'handlerDate': null,
        'handlerId': null,
        'id': 28589,
        'isHandled': false,
        'faultLevel': 2,
        'siteId': 1
      }
      ],
      'total': 2,
      'retCode': 1
    }
  }
}
