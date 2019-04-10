<template>
<ul class="np-tree-nodelist">
	<li v-for='node in data' :class="['level-'+level]">
		<div class="node"
				:class="['type-'+node.type,'status-'+node.status, {focused: node.isFocused}]">
			<slot name='pre' :id='node.id' />
			<a class="icon icon-expand" :class="{'icon-collapse': node.isOpen}"
					v-if='!node.isLeaf'
					@click.stop='expandNode(node)'/>
			<a class="name"
					@click.stop='clickNode(node)'
					@dblclick.stop='dbclickNode(node)' >
				<span class="icon icon-type" :class="{'icon-leaf':node.isLeaf}" /><span class="node-name" :title='node.name'>{{node.name }}</span>
			</a>
			<slot :id='node.id' :isLeaf='node.isLeaf' :level='level' />
		</div>
		<np-tree-nodelist v-if='!node.isLeaf' v-show='node.isOpen'
				:data='node.children' :autoCollapse='autoCollapse' :level='level+1'
				@load='load'
				@clickOnNode='clickOnNode'
				@dbclickOnLeaf='dbclickOnLeaf'
				@clickOnLeaf='clickOnLeaf'>
			<template slot='pre' scope='props'>
				<slot name='pre' :id='props.id' />
			</template>
			<template scope='props'>
				<slot :id='props.id' :isLeaf='props.isLeaf' :level='props.level' />
			</template>
		</np-tree-nodelist>
	</li>
</ul>
</template>
<script>
import treeMixin from './npTreeMixin';

/**
 * props : [
 * 		data : 节点数据 : [{id,name,type,status, // basic attribute for all node;
 *			isLeaf, 			// tree attribute for all node
 *			isFocused,			// node is focused when needed
 *			children,isOpen,childLoaded	// attribute for node only if not isLeaf
 *		}]
 *		autoCollapse: 当打开folder节点时，是否自动关闭其他同级folder节点
 * 		level : 层级: 根节点的level开始累加；
 * ]
 * events : [ // see in np-tree-mixin.js
 *		load : 父节点展开，引发加载数据事件
 *		clickOnNode : 父节点单击事件
 *		dbclickOnLeaf  : 叶子节点双击事件
 *		clickOnLeaf : 叶子节点单击事件
 * ]
 * slot : [
 *		缺省插槽：pros : {id, level, isLeaf}
 * ]
 * 内部方法: {
 * 		nodeClick : 节点点击事件处理函数，（加载数据、点击收起、抛出双击或单击叶子节点）
 * 		expandNode : 兄弟节点关闭/展开
 * 		nodeDBClick : 处理判断双击事件
 * }
 */
var dbclickTimer = null;
export default {
	name: 'npTreeNodelist',
	mixins: [treeMixin],
	props: {
		level: { type: Number, default: 1 }
	},
	methods: {
		expand: function (node) {
			if (node.isOpen) {
				node.isOpen = false;
				return;
			}
			// console.log("this.autoCollapse", this.autoCollapse);
			if (this.autoCollapse)
				this.data.forEach(function (item) { item.isOpen = false; });
			node.isOpen = true;
		},
		expandNode: function (node) {
			// console.log("expand:", node, node.name, node.childLoaded);
			if (!node.childLoaded) { // 加载数据
				this.load(node, function () {
					node.childLoaded = true;
					this.expand(node);
				}.bind(this));
			} else
				this.expand(node);
		},
		clickNode: function (node) {
			clearTimeout(dbclickTimer);
			dbclickTimer = setTimeout(function () {
				if (node.isLeaf)
					this.clickOnLeaf(node);
				else
					this.clickOnNode(node);
			}.bind(this), 300);
		},
		dbclickNode: function (node) {
			clearTimeout(dbclickTimer);
			if (node.isLeaf)
				this.dbclickOnLeaf(node);
			else
				this.expandNode(node);
		}
	}
};
</script>
<style lang="less">
@import '../../less/ixwpre.less';
@levelPadding: 22px;

.np-tree-nodelist{
	padding:0;

	li {list-style: none;}
	li > .node{height:26px;line-height:26px;}
	li > .node:hover{background-color: #f6f6f6;font-weight:bold;}
	li > .node.focused {font-weight:bold;}
	.name > span{color: #23527c;cursor:pointer;vertical-align: top;}

	.level-1 > div{padding-left:@levelPadding;}
	.level-2 > div{padding-left:@levelPadding*2;}
	.level-3 > div{padding-left:@levelPadding*3;}
	.level-4 > div{padding-left:@levelPadding*4;}
	.level-5 > div{padding-left:@levelPadding*5;}

	.icon{.x-pic;width:12px;height:12px;cursor:pointer;}
	.icon-expand{.x-pic-icon12-expand;}
	.icon-collapse{.x-pic-icon12-collapse;}
	.icon-type{.x-pic-icon12-folder;}
	.icon-leaf{.x-pic-icon12-file;}
}
</style>
