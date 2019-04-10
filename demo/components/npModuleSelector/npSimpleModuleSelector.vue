<template>
	<np-module-selector :modules= 'modules' :mode='mode' :value='val'
			@input='onInput'/></template>
<script>
import npModuleSelector from './npModuleSelector';

function _check(modules, idPath, idHT) {
	var selected = [], hasAll = true;
	IX.iterate(modules, function (mod) {
		var children = $XP(mod, 'children', []);
		var result = [];
		var subIdPath = idPath + mod.id;

		if (children.length > 0)
			result = _check(children, subIdPath + '/', idHT);
		else
			result = (mod.id in idHT) ? 'all' : [];

		if (result != 'all') 
			hasAll = false;
		selected = selected.concat(result == 'all' ? subIdPath : result);
	});
	return hasAll ? 'all' : selected;
}

function checkModules(modules, idHT) {
	var selected = [], hasAll = true;
	IX.iterate(modules, function (mod) {
		var children = $XP(mod, 'children', []);
		var result = [];

		if (children.length > 0)
			result = _check(children, mod.id + '/', idHT);
		else 
			result = (mod.id in idHT) ? 'all' : [];

		if (result != 'all') 
			hasAll = false;
		selected = selected.concat(result == 'all' ? mod.id : result);
	});
	return hasAll ? 'all' : selected;
}
function getLeafModulesId(module) {
	var ids = [];
	var children = $XP(module, 'children', []);

	if (children.length === 0)
		return [module.id];
	IX.iterate(children, function (mod) {
		ids = ids.concat(getLeafModulesId(mod));
	});
	return ids;
}
function gatherModules(modules, ids) {
	var curId = ids.shift();
	var i = 0, mod = null;

	for (i = 0; i < modules.length; i += 1) {
		if (modules[i].id == curId) {
			mod = modules[i];
			break;
		}
	}
	return ids.length === 0 
			? getLeafModulesId(mod)
			: gatherModules(mod.children, ids);	
}
/**
 * props : [
 *		mode : 展示模式 : 'view' or other
 * 		modules : 节点数据 : [{id,name, // basic attribute for all modules and sub-modules;
 *			children,			// attribute for node if not isLeaf
 *		}],
 *		value : ["id", ... ]// 选中的叶子ID集合
 * ]
 * events : [
 *		input : 数据改变事件: // 选中的叶子ID集合
 * ]
 */
export default{
	props: {
		mode: { type: String, default: 'view' },
		modules: { type: Array, default: function () { return []; } },
		value: { type: Array, default: function () { return []; } }
	},
	computed: {
		val: function () {
			var ht = {};
			IX.iterate(this.value, function (id) {
				ht[id] = true;
			});
			return checkModules(this.modules, ht);
		}
	},
	methods: {
		onInput: function (_val) {
			var selected = [];
			var list = _val;
			if (list == 'all')
				list = IX.map(this.modules, function (mod) { return mod.id; });
			selected = IX.map(list, function (idPath) {
				return gatherModules(this.modules, idPath.split('/'));
			}.bind(this));
			this.$emit('input', IX.Array.flat(selected));
		}
	},
	components: {
		'np-module-selector': npModuleSelector
	}
};
</script>
