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
        id: 6,
        text: '分区1',
        icon: 'Zone',
        parentId: '1',
        children: [
          {
            id: 7,
            text: '站台',
            parentId: '1',
            checked: false,
            icon: 'Zone',
            selectchecked: ['50'],
            checkAll: false,
            isIndeterminate: false,
            children: [{
              id: '50',
              cameraType: 1,
              parentId: '6',
              text: '球机1',
              icon: 'Camera-1'
            },
            {
              id: '51',
              parentId: '6',
              text: '摄像机51',
              cameraType: 3,
              icon: 'Camera-3'
            },
            {
              id: '52',
              parentId: '6',
              text: '摄像机52',
              icon: 'Camera-3',
              cameraType: 3
            }
            ]
          }
        ]
      },
      {
        id: 13,
        text: '分区2',
        parentId: '-1',
        icon: 'Zone',
        children: [
          {
            id: '60',
            parentId: '13',
            text: '摄像机60',
            icon: 'Camera-3',
            cameraType: 3
          },
          {
            id: '61',
            parentId: '13',
            text: '摄像机61',
            icon: 'Camera-3',
            cameraType: 3
          },
          {
            id: '62',
            parentId: '13',
            text: '摄像机62',
            icon: 'Camera-3',
            cameraType: 3
          }
        ]
      }
    ]
  }
]
