export const arr = [
  {
    type: 0,
    'id': '1',
    'checked': false,
    'text': '上地',
    icon: 'Station',
    isIndeterminate: false,
    checkAll: false,
    act: '全选',
    children: [
      {
        type: 1,
        'id': 6,
        'text': '分区1',
        icon: 'Zone',
        'parentId': '1',
        'checked': false,
        selectchecked: ['50'],
        checkAll: false,
        isIndeterminate: false,
        children: [
          {
            type: 1,
            id: '50',
            parentId: '6',
            text: '摄像机50',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          },
          {
            type: 1,
            id: '51',
            parentId: '6',
            text: '摄像机51',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          },
          {
            type: 1,
            id: '52',
            parentId: '6',
            text: '摄像机52',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          }
        ]
      },
      {
        type: 1,
        'id': 13,
        'text': '分区2',
        'parentId': '-1',
        'checked': false,
        icon: 'Zone',
        selectchecked: ['60', '61', '62'],
        checkAll: false,
        isIndeterminate: false,
        children: [
          {
            type: 1,
            id: '60',
            parentId: '13',
            text: '摄像机60',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          },
          {
            type: 1,
            id: '61',
            parentId: '13',
            text: '摄像机61',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          },
          {
            type: 1,
            id: '62',
            parentId: '13',
            text: '摄像机62',
            icon: 'Camera-1',
            checkAll: false,
            isIndeterminate: false,
            checked: true
          }
        ]
      }
    ]
  }
  /* {
    type: 0,
    'id': '2',
    'checked': false,
    'text': '分区3',
    isIndeterminate: false,
    checkAll: false,
    act: '全选',
    children: [
      {
        type: 1,
        'id': 6,
        'text': '设备列表',
        'parentId': '-1',
        'checked': false,
        selectchecked: [],
        checkAll: false,
        isIndeterminate: false,
        'child': [
          {
            type: 2,
            'id': '17',
            'text': '设备新增',
            'parentId': '6',
            'checked': false
          },
          {
            type: 2,
            'id': '18',
            'text': '设备修改',
            'parentId': '6',
            'checked': false
          },
          {
            type: 2,
            'id': '19',
            'text': '设备删除',
            'parentId': '6',
            'checked': false
          }
        ]
      }]
  } */
]
