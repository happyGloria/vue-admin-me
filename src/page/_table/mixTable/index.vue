<template>
  <div class="page-wrap">
    <tree-table :data="data"
                :columns="columns"
                :selected="[7,11,12]"
                border
                @getAuth="getAuth" />
  </div>
</template>

<script>
/**
  Explain           根据花裤衩的表格改的,
  isIndeterminate   控制多选半选中状态，
  checkAll          控制全选中状态
  selectchecked     放置sonData1选中项
*/
import treeTable from './TreeTableAuthor'
import { arr as treeData } from './data.js'
export default {
  components: { treeTable },
  data () {
    return {
      columns: [
        {
          text: '列表',
          name: 'text',
          width: 200,
          option: 'children'
        },
        /* {
          text: '功能权限',
          name: 'child',
          width: 200,
          option: 'child',
          act: 'act'
        }, */
        {
          text: '实时视频',
          width: 100,
          name: 'real'
        },
        {
          text: '云台控制',
          width: 100,
          name: 'ptz'
        }
      ],
      data: treeData
    }
  },
  methods: {
    getAuth (data) {
      let opt = []
      data.forEach(val => {
        opt.push(val.id)
        if (val.children) {
          val.children.forEach(el => {
            console.log(val.id)
            if (el.selectchecked.length) {
              opt.push(el.id)
              opt.push(el.selectchecked)
            }
          })
        }
      })
      console.log(data)
      opt = opt.join().split(',').filter(n => { return n })
      console.log(opt)
    }
  }
}
</script>
