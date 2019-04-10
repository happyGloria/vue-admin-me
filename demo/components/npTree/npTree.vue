<template>
<div class="np-tree" v-if='data'>
	<np-tree-nodelist :data = 'data'
			@load ='load'
			@clickOnNode = 'clickOnNode'
			@dbclickOnLeaf = 'dbclickOnLeaf'
			@clickOnLeaf = 'clickOnLeaf' >
		<template slot='pre' scope='props'>
			<slot name='pre' :id='props.id' />
		</template>
		<template scope="props">
			<slot :id="props.id" :isLeaf="props.isLeaf" :level="props.level" />
		</template>
	</np-tree-nodelist>
</div>
</template>
<script>
import treeMixin from './npTreeMixin';
import npTreeNodelist from './npTreeNodelist';
/**
 * props : [
 * 		data : 节点数据 : [{id,name,type,status, // basic attribute for all node;
 *			isLeaf, 			// tree attribute for all node
 *			isFocused,			// node is focused
 *			children,isOpen,childLoaded	// attribute for node only if not isLeaf
 *		}]
 * ]
 * events : [// see in np-tree-mixin.js
 *		load : 父节点展开，引发加载数据事件
 *		clickOnNode : 父节点单击事件
 *		dbclickOnLeaf  : 叶子节点双击事件
 *		clickOnLeaf : 叶子节点单击事件
 * ]
 * slot : [
 *		缺省插槽：pros : {id, level, isLeaf}
 * ]
 */
export default{
	mixins: [treeMixin],
	components: {
		npTreeNodelist
	}
};
</script>
