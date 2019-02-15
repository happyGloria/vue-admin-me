export const arr = [{
  type: 0,
  'checked': false,
  'id': '1',
  'text': '用户管理',
  isIndeterminate: false,
  checkAll: false,
  act: '全选',
  children: [
    {
      type: 1,
      id: 6,
      'text': '用户列表',
      'parentId': '-1',
      'checked': false,
      selectchecked: ['7'],
      checkAll: false,
      isIndeterminate: false,
      'sonData1': [
        {
          type: 2,
          'text': '用户新增',
          'parentId': '6',
          'checked': false,
          'id': '7'
        },
        {
          type: 2,
          'text': '用户修改',
          'parentId': '6',
          'checked': false,
          'id': '8'
        },
        {
          type: 2,
          'text': '用户删除',
          'parentId': '6',
          'checked': false,
          'id': '9'
        }
      ]
    },
    {
      type: 1,
      id: 13,
      'text': '角色列表',
      'parentId': '-1',
      'checked': false,
      selectchecked: ['10', '11', '12'],
      checkAll: false,
      isIndeterminate: false,
      'sonData1': [
        {
          type: 2,
          'text': '角色授权',
          'parentId': '6',
          'checked': false,
          'id': '10'
        },
        {
          type: 2,
          'text': '角色修改',
          'parentId': '6',
          'checked': false,
          'id': '11'
        },
        {
          type: 2,
          'text': '角色删除',
          'parentId': '6',
          'checked': false,
          'id': '12'
        }
      ]
    }
  ]
},
{
  type: 0,
  'checked': false,
  'id': '2',
  'text': '设备管理',
  isIndeterminate: false,
  checkAll: false,
  act: '全选',
  children: [
    {
      type: 1,
      id: 6,
      'text': '设备列表',
      'parentId': '-1',
      'checked': false,
      selectchecked: [],
      checkAll: false,
      isIndeterminate: false,
      'sonData1': [
        {
          type: 2,
          'text': '设备新增',
          'parentId': '6',
          'checked': false,
          'id': '17'

        },
        {
          type: 2,
          'text': '设备修改',
          'parentId': '6',
          'checked': false,
          'id': '18'
        },
        {
          type: 2,
          'text': '设备删除',
          'parentId': '6',
          'checked': false,
          'id': '19'
        }
      ]
    }]
}
]
