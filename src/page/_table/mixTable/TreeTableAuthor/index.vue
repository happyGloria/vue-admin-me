<template>
  <div>
    <el-table :data="formatData"
              :row-style="showRow"
              v-bind="$attrs">
      <el-table-column v-for="(col, index) in columns"
                       :key="col.name"
                       :label="col.text"
                       :width="col.width"
                       :align="index === 0 ? 'left' : 'center'"
                       header-align="center">
        <template slot-scope="scope">
          <!-- 缩进 && 展开与收缩按钮 -->
          <div v-if="index === 0">
            <span v-if="index === 0"
                  v-for="space in scope.row._level"
                  :key="space"
                  class="ms-tree-space" />
            <span v-if="iconShow(index, scope.row)"
                  class="tree-ctrl"
                  @click="toggleExpanded(scope.$index)">
              <i v-if="!scope.row._expanded"
                 class="el-icon-plus" />
              <i v-else
                 class="el-icon-minus" />
            </span>
            <div style="display:inline-block;">
              <el-checkbox :indeterminate="scope.row.isIndeterminate"
                           v-model="scope.row.checkAll"
                           @change="handleCheckAll(scope.$index, scope.row, col)">
              </el-checkbox>
              <span v-if="index === 0">
                <i :class="`icon icon-${scope.row.icon}`"
                   style="color: #29d;" />
              </span>
              <span>{{scope.row[col.name]}}</span>
            </div>
          </div>
          <div v-if="index > 0"
               style="display:inline-block;">
            <el-checkbox :indeterminate="scope.row.isIndeterminate"
                         v-model="scope.row[col.name]"
                         :disabled="isDisabled(scope.row, col)"
                         @change="checkAttr(scope.$index, scope.row, col)" />
          </div>
        </template>
      </el-table-column>
      <slot />
    </el-table>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 格式化数据源
    formatData: function () {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  /* created () {
    this.defaultSelcet()
  }, */
  methods: {
    isDisabled (row, col) {
      return [2, 3].indexOf(row.cameraType) > -1 && col.name == 'ptz'
    },
    showRow (row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    cc () {
      this.data.forEach(val => {
        let checkAllArr = []
        let isIndeterminateArr = []
        if (val.children) {
          val.children.forEach(el => {
            checkAllArr.push(el.checkAll)
            isIndeterminateArr.push(el.isIndeterminate)
          })
        }
        if (new Set(checkAllArr).size === 1) { // && new Set(isIndeterminateArr).size !== 1
          if (checkAllArr[0] && isIndeterminateArr[0] === false) {
            val.isIndeterminate = false
            val.checkAll = true
          } else if (checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
            val.isIndeterminate = false
            val.checkAll = true
          } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size !== 1) {
            val.isIndeterminate = true
            val.checkAll = false
          } else if (!checkAllArr[0] && new Set(isIndeterminateArr).size === 1) {
            if (!isIndeterminateArr[0]) {
              val.isIndeterminate = false
              val.checkAll = false
            } else {
              val.isIndeterminate = true
              val.checkAll = false
            }
          } else {
            val.isIndeterminate = false
            val.checkAll = false
          }
        } else {
          val.isIndeterminate = true
          val.checkAll = false
        }
      })
    },
    getAuth () {
      this.$emit('getAuth', this.data)
    },
    checkAttr () {

    },
    setAttr (obj, val) {
      this.columns.slice(1).forEach(col => {
        if (!this.isDisabled(obj, col)) {
          obj[col.name] = val
        }
      })
    },
    handleCheckAll (index, row, col) {
      var me = this
      let setChild = function (list, val, arr = []) {
        list.forEach(item => {
          if (val) {
            if (item.children && item.children.length > 0) {
              item.children.forEach(el => arr.push(el.id))
            }
            item.selectchecked = arr
          } else {
            item.selectchecked = []
          }
          item.checkAll = val
          item.isIndeterminate = false
          me.setAttr(item, val)
          if (item.children && item.children.length > 0) {
            setChild(item.children, val, arr)
          }
        })
      }
      me.setAttr(row, row.checkAll)
      if (row.children) {
        setChild(row.children || [], row.checkAll)
      } else {
        row.checkAll = row.checkAll
        row.isIndeterminate = false
        row[col.name] = false
      }
    }
  }
}
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.el-table__body {
  text-align: left;
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>
