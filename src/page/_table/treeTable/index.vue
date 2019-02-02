<template>
  <div class="page-container">
    <tree-table :data="data"
                :columns="columns"
                border />
  </div>
</template>

<script>
import { array2tree } from '@/utils/arr.js'
import treeTable from '@/comp/TreeTable'
export default {
  components: {
    treeTable
  },
  data () {
    return {
      columns: [
        {
          name: '节点名称',
          value: 'name',
          width: 200
        },
        {
          name: '云台控制',
          value: 'ptz',
          width: '100'
        },
        {
          name: '实时视频',
          value: 'real',
          width: '100'
        }
      ],
      data: []
    }
  },
  mounted () {
    Service.getTableTree().then(({ items }) => {
      this.data = array2tree(items, 'id', 'parentId')
      console.log('this.data:', this.data)
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
