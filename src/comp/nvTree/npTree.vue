<template>
	<div class="np-tree" :class="clz">
		<el-input v-if="showFilter"
			icon="search"
			placeholder="输入检索信息"
			v-model="filterText" >
    </el-input>
		<el-tree
			ref="tree"
			node-key="id"
			auto-expand-parent
			highlight-current
			:data="data"
			:props="props"
			:default-expanded-keys="curNodeKey"
			:show-checkbox="showCheckbox"
			@node-click="handleNodeClick"
			@check-change="handleCheckChange"
			:lazy="lazy"
			:load="load"
			:render-content="renderContent"
			:filter-node-method="filterNode"
			:indent="30">
    </el-tree>
	</div>
</template>
<script>
export default {
  name: 'nv-tree',
  props: {
    clz: { type: String, default: '' },
    curNodeKey: { type: Array, default: [] }, // 当前选中节点
    defaultCheckedKeys: { type: Array, default: () => { return [] } }, // 默认选中节点
    handleCheckChange: { type: Function, default: function () {} },
    load: { type: Function, default: function () {} }, // 记载
    showCheckbox: { type: Boolean, default: false }, // 是否显示选中框
    search: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    data: {
      type: Array,
      default: []
    },
    showFilter: { type: Boolean, default: false },
    render: {
      type: Function,
      default: () => {
      }
    }
  },
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    setCurrentNode (key) {
      this.$refs.tree.setCurrentKey(key)
    },
    getActive () {
      return this.$refs.tree.getCurrentNode()
    },
    handleNodeClick (data, node) {
      this.$emit('changeNode', { id: data.id, name: data.name }, data)
    },
    renderContent ($$, params) {
      var node = params.node
      return $$(
        'span',
        {
          attrs: {
            class: 'node'
          }
        },
        [
          $$('i', {
            attrs: {
              class: 'icon icon-' + node.data.icon
            }
          }),
          $$('span', node.label)
        ]
      )
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setCurrentNode(this.curNodeKey[0])
    })
  }
}
</script>
<style lang="less">
.np-tree {
  height: 100%;
  .el-input__icon {
    right: 15px;
    top: 4px;
    color: #2d87f9;
    font-size: 16px;
  }
  .el-input {
    padding: 20px 20px 10px;
    input {
      border-radius: 0;
      height: 28px;
      padding: 0 5px;
    }
  }
  .el-tree {
    background: transparent;
    border: none;
    height: calc(~"100% - 58px");
    overflow: auto;
    .el-tree-node__content {
      height: 30px;
      line-height: 30px;
    }
    .el-tree-node.is-current>.el-tree-node__content {
      background-color: rgba(115, 211, 255, 0.4);
    }
    .node {
      [class^="icon"] {
        width: 16px;
        height: 14px;
        margin-right: 6px;
        position: relative;
        top: 2px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
