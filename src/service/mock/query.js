import data from '../data/index.js'
const db = data

export default {
  'fr': function(data) {
    data = data || {}
    return {
      retCode: 1,
      message: '成功',
      data: data
    }
  },
  'fa': function(code) {
    return {
      retCode: code || 400,
      message: 'error'
    }
  },
  'random': function() {
    const length = arguments.length
    const max = (length).toString(16)
    const index = $.random16((max + '').length, 0, length - 1)
    return arguments[$.int('0x' + index)]
  },
  'getFirst': function(modal) {
    for (const key in db[modal]) {
      return db[modal][key]
    }
  },
  'getModal': function(modal) {
    return db[modal]
  },
  'getObj': function(modal, id) {
    return $.extend(true, {}, db[modal][id])
  },
  'getModalTemplate': function(modal) {
    return $.extend({}, this.getFirst(modal))
  },
  'getByAttr': function(modal, attrs, filter) {
    const data = db[modal]
    c: for (const id in data) {
      const obj = data[id]
      if (attrs) {
        for (let i = 0; i < attrs.length; i++) {
          let key = attrs[i][0],
            value = attrs[i][1]
          if (obj[key] !== value) {
            continue c
          }
        }
      }
      if (filter && !filter.call(obj)) {
        continue c
      }
      return obj
    }
  },
  'getAllByAttr': function(modal, attrs, filter) {
    let data = $.extend(true, {}, db[modal]),
      list = []
    c: for (const id in data) {
      const obj = data[id]
      if (attrs) {
        for (let i = 0; i < attrs.length; i++) {
          let key = attrs[i][0],
            value = attrs[i][1]
          if (obj[key] !== value) {
            continue c
          }
        }
      }
      if (filter && !filter.call(obj)) {
        continue c
      }
      list.push(obj)
    }
    return list
  },
  'page': function(modal, args, attrs) {
    let data = $.extend(true, {}, db[modal]),
      list = [],
      filter = function(obj) {
        if (args.search) {
          if (typeof args.searchType !== 'undefined') {
            if (obj.searchType !== args.searchType) {
              return false
            }
          }
          for (const attrName in obj) {
            const attr = obj[attrName]
            if (typeof attr === 'string' && attr.indexOf(args.search) >= 0) {
              return true
            }
          }
          return false
        }
        return true
      }

    c: for (const id in data) {
      const obj = data[id]
      if (filter(obj)) {
        if (attrs) {
          for (let i = 0; i < attrs.length; i++) {
            let key = attrs[i][0],
              value = attrs[i][1]
            if ($.isArray(value)) {
              let flag = true
              value.forEach(function(v) {
                if (obj[key] === v) {
                  return flag = false
                }
              })
              if (flag) {
                continue c
              }
            } else if (obj[key] !== value) {
              continue c
            }
          }
        }
        list.push(obj)
      }
    }

    let pageNo = $.int(args.pageNo),
      pageSize = $.int(args.pageSize),
      start = ((pageNo || 1) - 1) * (pageSize || 10),
      end = start + (pageSize || 10)
    return this.fr({
      pageNo: pageNo || 1,
      total: list.length,
      pageSize: pageSize || 10,
      items: list.slice(start, end)
    })
  },
  'get': function(modal, id) {
    return this.fr({
      object: $.extend(true, {}, db[modal][id])
    })
  },
  'save': function(modal, obj, flag) {
    let old = db[modal][obj.id]
    if (old) {
      $.extend(old, obj)
    } else {
      obj.id = $.uuid()
      old = obj
    }
    db[modal][obj.id] = $.str2json($.json2str(old))
    return flag ? {
      id: obj.id
    } : this.fr({
      id: old.id
    })
  },
  'getGroupChildren': function(modal, args) {
    const d = this.getAllByAttr('groups', [])
    const arr = []
    for (let i = 0; i < d.length; i++) {
      if (d[i].parentId === args.id) {
        arr.push(d[i])
      }
    }
    return arr
  },
  // modal为数据文件名 可传数组或字符串  多个页面调用同一接口时可传数组
  'del': function(modal, id) {
    if (modal instanceof Array) {
      for (let i = 0; i < modal.length; i++) {
        if (db[modal[i]][id]) {
          delete db[modal[i]][id]
        }
      }
    } else {
      delete db[modal][id]
    }
    return this.fr()
  },
  'delByAttr': function(modal, attrs) {
    const list = this.getAllByAttr(modal, attrs)
    list.forEach(function(obj) {
      delete db[modal][obj.id]
    })
    return this.fr()
  },
  'delByIds': function(modal, ids) {
    for (let i = 0; i < ids.length; i++) {
      delete db[modal][ids[i]]
    }
    return this.fr()
  }
}
