<template>
	<div class="nv-grid" v-loading.body="loading" element-loading-text="加载中...">
    <el-col :span="24" class='grid-toolbar clearfix' ref="toolbar">
      <slot name="filter"></slot>
    </el-col>
    <el-table ref="table"
      stripe border highlight-current-row resizable
      class="grid-body"
      style="width:100%"
      :data = "list"
      :height = "tBodyHeight"
      @selection-change='selectionChange'
      @row-click="rowClick">
      <el-table-column
        v-if = "selectable"
        type = "selection"
        label = "" align = "center">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for = "(item, index) in column"	:key="item.key"
        :sortable = "item.sortable ? item.sortable : false"
        :type = "item.type || ''"
        :prop = "item.key || ''"
        :label = "item.name"
        :align = "item.align || 'center'"
        :width = "item.width || ''"
        :formatter = "item.formatter && item.formatter(item)">
        <template slot-scope='scope'>
          <span v-html="getCell(item, scope)"></span></template>
      </el-table-column>
      <slot name="status"></slot>
      <el-table-column label="操作" align="center" class="operation"
        v-if="action.length"
        :width="actionWidth">
        <template slot-scope='scope'>
          <el-button  type='primary' size='mini'
            v-for="(item, idx) in action" :key="item.index"
            :icon='item.icon'
            :title='item.title'
            :disabled='item.disabledFn ? item.disabledFn(scope.row) : false'
            @click.stop='item.handleFn(scope.row, scope.$index)'>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" align="center" v-if="expandAble">
        <template slot-scope="props">
          <expand-tpl :info="props.row"></expand-tpl>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 - start -->
    <el-col
      v-show="column.length && pagination && list.length"
      class="grid-foot" :span="24">
      <el-pagination
        :layout="pager.layout"
        :page-sizes="pager.pageSizes"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="totalSize"
        @size-change="sizeChange"
        @current-change="currentChange">
      </el-pagination>
    </el-col>
	</div>
</template>
<script>
let defaults = {
  showIndex: !0,
  actionWidth: 100,
  pagination: !0,
  pager: {
    layout: 'total, prev, pager, next, sizes, jumper',
    pageSizes: [10, 20, 50, 100],
    pageNo: 1,
    totalSize: 0,
    pageSize: 20
  },
  rowClick(row, column, cell, event) { },
  expandAble: false
}
export default {
  name: 'nv-table',
  props: {
    setting: Object
  },
  data: function() {
    let {
      ajax,
      selectable,
      pagination,
      column,
      action,
      pager,
      showIndex,
      actionWidth,
      rowClick,
      expandAble
    } = this.setting
    return {
      expandAble: expandAble || defaults.expandAble,
      rowClick: rowClick || defaults.rowClick,
      search: '', // 搜索字段
      aChecked: [], // 选中行
      list: [], // 列表数据
      loading: false,
      ajax: ajax,
      actionWidth: actionWidth || defaults.actionWidth,
      showIndex: showIndex || defaults.showIndex,
      pagination: pagination,
      selectable: selectable,
      action: action || [],
      column: column || [],
      pager: pager || defaults.pager,
      pageNo: pager ? pager.pageNo : defaults.pager.pageNo, // 当前页
      pageSizes: pager ? pager.pageSizes : defaults.pager.pageSizes, // 每页显示多少条options
      pageSize: pager ? pager.pageSize : defaults.pager.pageSize, // 每页显示多少条
      totalSize: pager ? pager.totalSize : defaults.pager.totalSize,
      tBodyHeight: 0 // 总页数
    }
  },
  mounted() {
    this.resizeFn()
    window.onresize = this.resizeFn
  },
  methods: {
    resizeFn() {
      var $contaner = this.$el
      var $toolBar = this.$el.children[0],
        $foot = this.$el.children[2]
      function getFootHeigt() {
        var h =  $($foot).is(':hidden') ? 40 : $foot.clientHeight
        return 42
      }
      this.tBodyHeight = $contaner.clientHeight - $toolBar.clientHeight - getFootHeigt()
    },
    getCell(item, scope) {
      if (item.type == 'index') {
        return this.pageSize * (this.pageNo - 1) + (scope.$index + 1)
      } else if (item.format) {
        return item.format(scope.row[item.key], scope)
      } else {
        return scope.row[item.key]
      }
    },
    init(args) {
      var pageInfo = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (args) {
        Object.assign(pageInfo, args)
      }
      this.loading = !0
      this.ajax.init(pageInfo).then((res) => {
        this.totalSize = res.total
        this.list = res.items
        this.loading = !1
      })
    },
    clear(cbFn) {
      this.list = []
      this.pageNo = 1
      this.pageSize = defaults.pager.pageSize
      cbFn && cbFn()
    },
    sizeChange(size) {
      this.pageSize = size
      this.init({
        pageNo: 1,
        pageSize: size
      })
    },
    setColumn(column) {
      this.column = column
    },
    currentChange(num) {
      this.pageNo = num
      this.init({
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
    },
    getChecked() {
      return this.aChecked
    },
    selectionChange(arr) {
      this.aChecked = arr
    }
  }
}
</script>
<style lang="less">
.nv-grid {
  position: relative;
  width: 100%;
  height: 100%;
  .empty-column-info {
    width: 100%;
    border: 1px solid #d3dce6;
    text-align: center;
    display:flex;
    justify-content:center;
    align-items:center;
    .desc {
      font-weight: 900;
      color: #4cb1ff;
      font-size: 14px;
      display: inline-block;
      height: 60px;
      line-height: 60px;
    }
  }
  .grid-toolbar {
    padding-bottom: 10px;
  }
  .grid-body {
    .el-button{
      padding: 3px 4px;
    }
  }
  .grid-foot {
    padding-top: 10px;
    font-size: 12px;
    .el-pagination {
      button,span {
        display: inline-block;
        font-size: 13px;
        min-width: 28px;
        height: 28px;
        line-height: 28px;
        vertical-align: top;
        box-sizing: border-box;
      }
      button {
        padding: 0 6px;
      }
      button:hover {
        color: #20a0ff;
      }
      button.disabled {
        color: #e4e4e4;
        background-color: #fff;
        cursor: not-allowed;
      }
      .btn-prev, .btn-next {
        border-radius: 2px 0 0 2px;
        border-right: 0;
        background: 50% no-repeat #fff;
        background-size: 16px;
        border: 1px solid #d3dce6;
        cursor: pointer;
        margin: 0;
        color: #99a9bf;
      }
    }
    .el-pager {
      li {
        padding: 0 4px;
        border: 1px solid #d3dce6;
        border-right: 0;
        background: #fff;
        font-size: 13px;
        min-width: 28px;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        text-align: center;
        font-weight: normal;
      }
      li.active {
        border-color: #20a0ff;
        background-color: #20a0ff;
        color: #fff;
        cursor: default;
      }
    }
    .el-pagination__sizes .el-input .el-input__inner  {
      font-size: 12px;
    }
    .el-pagination{
      padding: 2px 0px;
      .tip{ background-color: transparent; }
      .el-pagination__sizes{
        float:left;
      }
      .el-icon-arrow-left:before {
        content: "< 上一页";
      }
      .el-icon-arrow-right:before {
        content: "下一页 >";
      }
      .el-pagination__jump{
        .el-pagination__editor {
          width: 50px;
          border: none;
          padding: 0 5px;
        }
        .el-input__inner{
          padding: 0 10px;
          height: 28px;
        }
      }
    }
  }

  .el-table {
    font-size: 12px;
    thead {
      border-top: 1px solid #eef1f6;
      border-right: 1px solid #dfe6ec;
    }
    th, td {
      padding: 4px 0;
    }
    th {
      background-color: rgb(238, 241, 246);
      border-bottom: 1px solid #eef1f6;
      border-right: 1px solid #dfe6ec;
    }

    .cell{
      text-align: center;
    }
  }
}
</style>
