<template>
	<div>
		<span>测试</span>
		<np-module-selector :modules= 'modules' :mode='mode' v-model='values'/>
		<a @click="changeValue"> change</a>
		<a @click="changeMode">change mode</a>
	</div>
</template>

<script>
/* eslint-disable */
import npModuleSelector from '../../components/npModuleSelector/npSimpleModuleSelector';
function getLeafModulesId(module){
	var ids = [];
	var children = $XP(module, "children", []);

	if (children.length===0)
		return [module.id];
	IX.iterate(children, function(mod){
		ids = ids.concat(getLeafModulesId(mod));
	});
	return ids;
}
var testModules = IX.map('abcdefg'.split(""), function(c){
	var s1 = '123456789'.substring(0, 1+Math.floor(9*Math.random())).split("");
	return {id: c, name: '模块' + c, children: IX.map(s1, function(c1){
		var s2 = 'ABCDEFGHI'.substring(0, Math.floor(10*Math.random())).split("");
		return {id: c+c1, name: '模块'+c +c1, children: IX.map(s2, function(c2){
			return {id: c+c1 +c2, name: '模块'+c +c1+c2};
		})};
	})};
});
var testCheckedModules = [['a1A', 'a2A'], getLeafModulesId(testModules[0]), 
	[].concat(getLeafModulesId(testModules[2]), getLeafModulesId(testModules[3]))];
console.log("Test Modules", testModules);

export default {
	data: function() {
		return {
			mode: 'viewer',
			modules: [].concat(testModules),
			values: ["a1A","a2A"]
		}
	},
	watch: {
		values: function(val){
			console.log("value changed:", val);
		}
	},
	methods: {
		changeMode: function(){
			this.mode = this.mode == 'view' ? 'edit' : 'view';
		},
		changeValue: function(){
			var v = testCheckedModules[Math.floor(3*Math.random())];
			console.log(" for click value changed to:", v);
			this.values = v;
		}
	},
	components: {
		npModuleSelector
	}
}
</script>

<style lang="less">
	.np-module-selector { width:960px; margin:20px;}
</style>
