<template>
<ul class="np-module-list" :class="'level' + level" v-if='modules && modules.length>0'>
	<li v-for='mod in modules' :class="['li-' + mod.checkType]">
		<slot :mod='mod' />
		<np-module-list :level='level+1' :modules='mod.children'>
			<template scope='props'><slot :mod='props.mod' /></template>
		</np-module-list>
	</li>
</ul>
</template>
<script>
/**
 * props : [
 * 		level: 当前模块的级别
 * 		modules : 节点数据 : [{id,text, // basic attribute for all modules and sub-modules;
 *			children			// attribute for node if not isLeaf
 *		}]
 * ]
 */
export default {
	name: 'npModuleList',
	props: {
		level: { type: Number, default: 1 },
		modules: { type: Array, default: function () { return []; } }
	}
};
</script>
