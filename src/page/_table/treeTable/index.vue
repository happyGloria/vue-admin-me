<template>
  <div class="page-container">
    <el-table :data="data"
              border
              style="width: 100%">
      <el-table-column v-for="col in columns"
                       :prop="col.prop"
                       :label="col.label"
                       :width="col.width"
                       :align="col.align">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { array2tree } from '@/utils/arr.js'
export default {
  data () {
    return {
      columns: [
        {
          prop: 'name',
          label: '节点名称',
          align: 'center',
          width: 200
        },
        {
          prop: 'ptz',
          label: '云台控制',
          align: 'center',
          width: 100
        },
        {
          prop: 'real',
          label: '实时视频',
          align: 'center',
          width: 100
        }
      ],
      data: []
    }
  },
  mounted () {
    Service.getTableTree().then(({ items }) => {
      this.data = array2tree(items, 'id', 'parentId')
      // console.log('this.data:', this.data)
    })
  }
}
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  overflow-y: auto;
}
</style>
