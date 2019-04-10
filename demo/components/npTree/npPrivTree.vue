<template>
<div class="np-priv-tree">
	<div class="hdr">
		<span class="filter"><slot /></span>
		<ul class="privs">
			<li v-for='priv in privs' :style='{width: privWidth}'>
				<span>{{ priv.text }}</span>
			</li>
		</ul>
	</div>
	<np-tree-nodelist  v-if='data' :data = 'data' :autoCollapse = 'false' @load = 'load'>
		<template slot='pre' scope='props'>
			<a class="icon icon-check" :class='privClz[props.id]["_checked"]'
					@click.stop = 'checkNode(props.id)'/>
		</template>
		<template scope='props'>
			<ul class="privs">
				<li v-for='priv in privs' :style='{width: privWidth}'>
					<a class="circle-check" :class='privClz[props.id][priv.name]'
							@click.stop = 'checkPriv(props.id, priv.name)'/>
				</li>
			</ul>
		</template>
	</np-tree-nodelist>
</div>
</template>
<script>
import npTreeNodelist from './npTreeNodelist';

function iterateTree(items, fn) {
	IX.iterate(items, function (item) {
		fn(item);
		iterateTree(item.children || [], fn);
	});
}
function getPrivClz(data, privNames, value) {
	var _clzes = {};
	iterateTree(data, function (node) {
		var nodeId = node.id;
		var valueObj = $XP(value, nodeId, {});
		var clzObj = { _checked: '' };
		IX.iterate(privNames, function (privName) {
			var privValue = $XP(valueObj, privName, false);
			if (privValue) clzObj._checked = 'checked';
			clzObj[privName] = privValue ? 'checked' : '';
		});
		_clzes[nodeId] = clzObj;
	});
	// console.log("getPrivClz: ", data, privNames, value, _clzes);
	return _clzes;
}

function getData(list) {
	var len = list ? list.length : 0;
	return {
		privWidth: (len > 0 ? Math.floor(100 / len) : 100) + '%',
		privNames: IX.map(list, function (item) { return item.name; })
	};
}
/**
 * props : [
 * 		data : 节点数据 : [{id,name,type,status, // basic attribute for all node;
 *			isLeaf, 			// tree attribute for all node
 *			children,isOpen,childLoaded	// attribute for node only if not isLeaf
 *		}],
 *		privs : 权限列表: [{name, text}]
 *		value : 权限描述数据{id : {privName:boolean} }
 * ]
 * events : [
 *		load : 父节点展开，引发加载数据事件
 *		setPriv : 更改Priv事件
 * ]
 */
export default{
	props: {
		data: { type: Array, default: function () { return []; } },
		privs: { type: Array, default: function () { return []; } },
		value: { type: Object, default: {} }
	},
	data: function () {
		return getData(this.privs);
	},
	computed: {
		privClz: function () {
			return getPrivClz(this.data, this.privNames, this.value);
		}
	},
	watch: {
		privs: function (list) {
			var result = getData(list);
			this.privWidth = result.privWidth;
			this.privNames = result.privNames;
		}
	},
	methods: {
		load: function (node, cbFn) {
			this.$emit('load', node, cbFn);
		},
		checkNode: function (nodeId) {
			this.$emit('setPriv', nodeId, null);
		},
		checkPriv: function (nodeId, privName) {
			this.$emit('setPriv', nodeId, privName);
		}
	},
	components: {
		npTreeNodelist
	}
};
</script>
<style lang="less">
@import '../../less/ixwpre.less';
@levelPadding: 22px;

.np-priv-tree{
	.hdr {height:36px;}
	.hdr>.filter {float:left;}
	&>.np-tree-nodelist {
		&>li {background : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA2CAYAAAAGavOcAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QMbBzENbNelQwAAABxJREFUGNNj+Pnz538mBgYGhgElGP7//z8InAEAXygITwyVV+4AAAAASUVORK5CYII=) repeat;}

		li>.node {height:27px;line-height:27px;}
		li>.node:hover{background:#ddd;}
	}

	.node>a {float:left;}
	.privs {
		margin:0 0 0 280px; padding:0; border-left:1px solid #ccc;
		font-weight:bold;color:#666;
		li {display:inline-block;}
		.circle-check {display: inline-block;width:12px;height:12px;border-radius:6px;background:#ccc;}
		.circle-check.checked {background:#009900;}
	}
	.hdr .privs {height:36px;padding-bottom:12px;}
	.level-1 .privs{margin-left:280px - @levelPadding;}
	.level-2 .privs{margin-left:280px - @levelPadding*2;}
	.level-3 .privs{margin-left:280px - @levelPadding*3;}
	.level-4 .privs{margin-left:280px - @levelPadding*4;}
	.level-5 .privs{margin-left:280px - @levelPadding*5;}
	.level-6 .privs{margin-left:280px - @levelPadding*6;}

	.icon.icon-expand,.icon.icon-type{margin:7px 2px 7px 0;}
	.icon.icon-check {.x-pic-icon14-uncheck;width:14px;height:14px;margin:6px 10px 6px 0;}
	.icon.icon-check.checked {.x-pic-icon14-checked;}
}
</style>
