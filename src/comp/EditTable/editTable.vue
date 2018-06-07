<template>
  <div class="edit-table"
       :style="{
          width,
          maxHeight: height + 'px',
          height: list.length ? (list.length + 1) * (nodeHeight + 1) + 'px' : '112px'
        }">
    <div class="jt">
      <div class='jb'>
        <div class='jb-h'>
          <table :width="tableWidth">
            <colgroup><col :width="col[1]" v-for='col in colVis'></colgroup>
            <thead>
              <tr>
                <th v-for='col in colVis'>
                  <span class="ellipsis" :class="{'text-right': column[col[0]].btnCol}">{{column[col[0]].name}}</span>
                  <el-tooltip ref="tooltip" effect="light" placement="top"
                      :content="column[col[0]].help" @input="hackIE9"
                      v-if="column[col[0]].help">
                    <el-button class="btn-help" size="mini">?</el-button>
                  </el-tooltip>
                  <div class="drag" v-drag="col" v-if="column[col[0]].drag !== !1 && !column[col[0]].btnCol"></div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div @mousewheel.stop.prevent="wheelEvent" class='jb-c'>
          <table :width="tableWidth" v-if="list.length > 0">
            <colgroup><col :width="col[1]" v-for='col in colVis'></colgroup>
            <tr><th v-for='col in colVis'></th></tr>
            <tbody class="no-line">
            <tr v-for='(node, index) in blockList'>
              <td v-for='col in colVis' :class="'col-'+column[col[0]].id">
                <div class="edit" v-if="column[col[0]].btnCol">
                  <slot name="btnCol" :node="node">
                    <el-button type="primary" size="mini" class="el-icon-delete" @click="delNode(node)"></el-button>
                  </slot>
                  <slot name="footer"></slot>
                </div>
                <div v-else-if="column[col[0]].type === 'text'">
                  <el-form-item errorType="tooltip"
                                :prop="prefix + '.' + index  + '.' + column[col[0]].id"
                                :rules="column[col[0]].rule">
                    <el-input v-model="node[column[col[0]].id]"
                              :disabled="column[col[0]].disabled && column[col[0]].disabled(node)"></el-input>
                  </el-form-item>
                </div>
                <div v-else-if="column[col[0]].type === 'select'">
                  <el-form-item errorType="tooltip"
                                :prop="prefix + '.' + index + '.' + column[col[0]].id"
                                :rules="column[col[0]].rule">
                    <el-select v-model="node[column[col[0]].id]">
                      <el-option
                          v-for="item in options(column[col[0]].init(node))" :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else-if="column[col[0]].type === 'select-tree'">
                  <el-form-item errorType="tooltip"
                                :prop="prefix + '.' + index + '.' + column[col[0]].id"
                                :rules="column[col[0]].rule">
                    <el-select-tree :list="options(column[col[0]].init(node))"
                                    v-model="node[column[col[0]].id]"></el-select-tree>
                  </el-form-item>
                </div>
                <div v-else-if="column[col[0]].type === 'switch'">
                  <el-form-item errorType="tooltip"
                                :prop="prefix + '.' + index + '.' + column[col[0]].id"
                                :rules="column[col[0]].rule">
                    <el-switch active-color="#13ce66"
                              inactive-color="#ff4949"
                              :active-value = 'column[col[0]].prop.activeValue'
                              :inactive-value = 'column[col[0]].prop.inActiveValue'
                              v-model="node[column[col[0]].id]"></el-switch>
                  </el-form-item>
                </div>
                <div class="ellipsis"
                     v-else-if="column[col[0]].data"
                     v-html="column[col[0]].data(node)"></div>
                <div class="ellipsis static-text" v-else>{{node[column[col[0]].id]}}</div>
              </td>
            </tr>
            </tbody>
          </table>
          <table :width="tableWidth" class="empty-table" v-else>
            <tbody>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td style="height:70px;line-height:70px;text-align:center;" :colspan="colVis.length">没有添加数据</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div @scroll="scrollEvent" class='js'>
        <div :style="{ height: (list.length + 1) * (nodeHeight + 1) + 'px' }"></div>
      </div>
    </div>
    <div class="addBtn">
      <el-button type="primary" @click="$addEvent" class="el-icon-plus"></el-button>
    </div>
  </div>
</template>

<script>
  import { tooltips } from '@/utils/hack'
  let cache = {}
  export default {
    name: 'editTable',
    data: function() {
      let {
        autoInit,
        width,
        height,
        prefix,
        column,
        ajax,
        colVis,
        addEvent,
        delEvent
      } = this.setting
      return {
        top: 0,
        nodeHeight: 40,
        indexList: [],
        autoInit,
        width: width || '100%',
        height: height || '441px',
        prefix,
        column,
        ajax,
        colVis,
        addEvent,
        delEvent
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      setting: Object
    },
    methods: {
      hackIE9: tooltips,
      getList() {
        return this.list
      },
      init(callback) {
        let ajax = this.ajax
        let hasInitAjax = ajax && ajax.init
        let ajaxAfter = ajax && ajax.initAfter
        let formatData = (list) => {
          return $.each(list, (i, obj) => {
            this.cacheNode(obj)
          })
        }
        let initAjax = () => {
          ajax.init().then((data) => {
            this.loading = !1
            this.list = formatData(data.list)
            setTimeout(() => {
              $.fire(ajaxAfter)
              $.fire(callback)
              this.setScrollTop(this.$el.children[0].children[1].scrollTop = 0)
            }, 250)
          })
        }

        if (hasInitAjax) {
          this.loading = !0
          initAjax()
        }
      },
      cacheNode(node) {
        return $.isPlainObject(node) ? (this.cache[node.id] = node) : this.cache[node]
      },
      addNode(node) {
        let cache
        let tplNode
        if (node) {
          cache = this.cacheNode(node.id)
          if (cache) {
            return $.extend(cache, node)
          } else if (node.target) {
            tplNode = {}
          } else {
            tplNode = node
          }
        } else {
          tplNode = {}
        }

        if (!tplNode.id) {
          let column = this.column
          let length = this.list.length
          let lastNode = {}
          if (length > 0) {
            lastNode = this.list[length - 1]
          }
          $.each(column, (i, col) => {
            let id = col.id
            if ($.isUndefined(tplNode[id])) {
              if (col.type === 'checkbox') {
                tplNode[id] = 0
              } else if (col.type === 'select') {
                tplNode[id] = lastNode[id]
              } else if (col.type === 'text') {
                tplNode[id] = col.increment ? col.increment(lastNode[id], id, lastNode) : $.increment(lastNode[id])
              } else if (col.type === 'switch') {
                tplNode[id] = 1
              }
            }
          })
        } else {
          this.cacheNode(tplNode)
        }
        this.list.push(tplNode)
      },
      delNode(node) {
        let index = this.list.indexOf(node)
        if (index >= 0) {
          this.list.splice(index, 1)
        }
        delete cache[node.id]
        this.delEvent && this.delEvent(node)
      },
      $addEvent(e) {
        this.$nextTick(() => {
          setTimeout(() => {
            $(this.$el.children[0].children[1]).scrollTop(this.list.length * 40 + 40)
          }, 100)
        })
        return (this.addEvent || this.addNode)(e)
      },
      options(attr) {
        if (!attr) {
          return []
        }
        if (attr.length === 1) {
          return attr[0]
        }

        let me = this
        let [name, param] = attr
        let key = name + $.json2str(param)
        let list = cache[key]
        if (list) {
          return list
        } else {
          Service[name](param).then((r) => {
            cache[key] = r.data.list.map((obj) => {
              return {
                value: obj.id,
                label: obj.name
              }
            })
            me.ajaxKey.push(key)
            me.$forceUpdate()
          })
        }
      },
      wheelEvent(e) {
        this.$el.children[0].children[1].scrollTop -= e.wheelDelta
      },
      scrollEvent(e) {
        this.setScrollTop(e.target.scrollTop)
      },
      setScrollTop(top, delta) {
        let $js = this.$el.children[0].children[0].children[1]
        let $jsTop = $.int($js.style.top)

        top = $.isUndefined(top) ? 0 : top
        $js.style.top = (delta ? $jsTop - top : -top) + 'px'
      }
    },
    computed: {
      tableWidth() {
        let width = 0
        if (this.colVis) {
          this.colVis.forEach((obj) => {
            width += obj[1]
          })
        } else {
          width = '100%'
        }
        return $.isNumeric(width) ? width : '100%'
      },
      blockList() {
        return $.each(this.list, (i, obj) => {
          obj.i = i + 1
        })
      }
    },
    directives: {
      drag: {
        bind(el, binding) {
          let data = {
            width: 0,
            x: 0,
            y: 0
          }
          let move = (e) => {
            let width = data.width + e.pageX - data.x
            if (width > 100 && width < 400) {
              binding.value.splice(1, 1, width)
            }
          }
          let up = () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseup', up)
          }

          el.addEventListener('mousedown', function(e) {
            e.stopPropagation()
            e.preventDefault()

            data.width = binding.value[1]
            Object.assign(data, {
              left: e.target.offsetLeft,
              x: e.pageX
            })

            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
          })
        }
      }
    },
    created() {
      this.cache = {}
      this.ajaxKey = []
    },
    mounted() {
      if (this.autoInit !== !1) {
        this.init()
      }
    },
    destroyed() {
      $.for(this.ajaxKey, (key) => {
        delete cache[key]
      })
    }
  }
</script>
<style lang="less">
.edit-table {
    position: relative;
    table{
     /*  border-collapse: separate; */
      border: 1px solid #ebeef5;
    }
    th {
      border-right: 1px solid #ebeef5;
    }
    td {
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }
    .static-text {
      color: #1f2d3d;
      font-size: 14px;
    }

    .jb {
      .jb-h {
        position: absolute;
        background: #eff2f7;
        z-index: 1031;

        .btn-help {
          float: right;
          padding: 2px 5px;
          margin: 10px 5px;
          border-radius: 15px;
          color: #fff;
          background: #8bacbc;
          border: 0 solid #eee !important;
        }
      }
    }

    .jt {
      height: 100%;

      .jb-c {
        position: absolute;
      }
    }

    .jb-c {
      .el-button {
        padding: 2px;
      }
      .el-form-item {
        margin: 0 -10px;
        input {
          border: 0;
        }
      }
      .el-form-item__content {
        margin-left: 0 !important;
        line-height: 35px;
      }
      .el-select, .el-input {
        width: 100% !important;
      }
      .is-disabled {
        input {
          border-radius: 0;
          background-color: #fff;
        }
      }
    }

    .addBtn {
      position: absolute;
      right: -55px;
      bottom: 0;

      button {
        padding: 10px;
      }
    }

    .jt table tbody tr:hover input {
      background-color: #eee;
    }
  }
.jt {
  position: relative;
  width: 100%;
  height: calc(~'100% - 40px');

  &.jp {
    height: calc(~'100% - 80px');
  }

  .js, .jb, .jl {
    top: 0;
    bottom: 0;
  }

  .jb {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    z-index: 1030;
  }

  .jb-c {
    width: 100%;
    height: calc(~'100% - 41px');

    > div.center-vertical {
      height: 100%;
    }

    .add-info {
      margin-left: calc(~'50% - 70px');
      text-align: center;
      cursor: pointer;
      color: #888;
      font-size: 14px;

      div {
        margin-top: 10px;
      }

      a {
        font-size: 12px;
        color: #4cb1ff;

        &:hover {
          color: #00a2ff;

          i {
            color: #00a2ff;
          }
        }

        i {
          font-size: 12px;
          font-weight: 900;
          color: #4cb1ff;
          margin-left: 10px;
        }
      }

      > i {
        margin-left: 21px;
      }

      .ico-tip {
        position: relative;
        top: 3px;
        margin-right: 6px;
        font-weight: 900;
      }
    }
  }

  .js {
    position: absolute;
    right: -18px;
    width: 18px;
    overflow-x: hidden;
    overflow-y: auto;

    > div {
      width: 1px;
    }
  }

  .jl {
    position: absolute;
    width: 100%;
    overflow: hidden;
    z-index: 1;

    table {
      table-layout: auto;

      th {
        background-color: #eef1f6;
      }
    }
  }

  .jb-h th {
    &:hover .drag {
      visibility: visible;
    }
  }

  .drag {
    position: absolute;
    right: 4px;
    top: 10px;
    bottom: 10px;
    width: 7px;
    height: 19px;
    border-radius: 7px;
    cursor: col-resize;
    background-color: #ccc;
    visibility: hidden;
  }

  .edit {
    width: 100%;
    text-align: left;
  }

  &.readonly .color {
    cursor: default;
  }

  .color {
    width: 13px;
    height: 13px;
    display: inline-block;
    top: 2px;
    position: relative;
    background-color: #9e9e9e;
    cursor: pointer;
  }

  .blue {
    background-color: #3bc3ff;
  }

  .red {
    background-color: #ff6661;
  }

  .grey {
    background-color: #9e9e9e;
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #eee;
  }

  table tbody tr:first-child td {
    border-top: 1px solid transparent;
  }

  table thead tr th:first-child,
  table tbody tr td:first-child {
    border-left: 0;
  }

  table th {
    height: 40px;
    max-height: 40px;
    padding: 0 10px;
    color: #303845;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    border-top: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
  }

  table td {
    min-width: 50px;
    height: 40px;
    padding: 0 10px;
    font-size: 12px;
    border-left: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
  }

  table th {
    position: relative;
    overflow: hidden;
  }

  table tbody tr:hover {
    background-color: #eee;
  }

  table tbody tr.active {
    background-color: #edf7ff;
  }

  table tbody tr td .name {
    position: relative;
    width: 100%;
    vertical-align: top;
    display: inline-block;

    .el-loading-mask {
      background-color: transparent !important;
    }
    .el-loading-spinner {
      text-align: right;
    }
    .circular {
      width: 25px;
    }
  }

  table tbody tr td .name > a {
    width: auto;
    height: 39px;
    outline: 0;
    line-height: 39px;
    display: inline-block;
    color: #666;

    a {
      color: #666;
    }

    > span, a span {
      position: relative;
      top: 0;
      margin-right: 4px;
      color: #3aa8ff;
    }
  }

  table tbody tr td .name > span {
    display: inline-block;
    line-height: normal;
    padding: 10px 6px 5px;
  }

  table tbody tr td .name:hover > span.add-node,
  table tbody tr td .name:hover > span.del-node {
    visibility: visible;
  }

  table tbody tr td .name > span.add-node,
  table tbody tr td .name > span.del-node {
    visibility: hidden;
    position: absolute;
    right: -1px;
    height: 100%;
    color: #fff;
    background: #20a0ff;
  }

  table tbody tr td .name > span.add-node a,
  table tbody tr td .name > span.del-node a {
    color: #fff;
  }

  table tbody tr td .name > span > i {
    position: relative;
    top: -1px;
    color: #aaa;
    cursor: pointer;
    font-size: 10px;
  }

  table tbody tr td .name > a > span {
    position: relative;
    top: 0;
    margin-right: 5px;
    float: none;
    font-weight: 100;
    font-size: 15px;
  }

  table tbody.no-line .line-x {
    border-left: 0;
    width: 0;
  }

  table tbody.no-line .line-x:after {
    width: 0;
  }

  table tbody.no-line .line-y {
    border-left: 0;
    width: 10px;
  }

  table tbody .line-x, table tbody .line-y {
    display: inline-block;
  }

  table tbody .line-x {
    border-left: 1px dashed #999;
    vertical-align: top;
    width: 10px;
    height: 100%;
  }

  table tbody .line-x:after {
    content: '';
    display: block;
    border-bottom: 1px dashed #999;
    height: 15px;
    width: 10px;
    vertical-align: top;
  }

  table tbody .line-x.last {
    height: 12px !important;
  }

  table tbody .line-y {
    border-left: 1px dashed #999;
    height: 100%;
    width: 20px;
  }

  table tbody .line-y.last {
    border-left: 0 dashed #999;
  }

  table tbody .line-y.first {
    border-left: 0 dashed #999;
  }

  table tbody .no-open {
    height: 18px;
    padding: 0 9.22px !important;
  }

  table tbody .line-x.no-border {
    border-left: 0 dashed #999;
  }

  table tbody .line-x.no-border:after {
    border-bottom: 0 dashed #999;
  }
}
</style>

