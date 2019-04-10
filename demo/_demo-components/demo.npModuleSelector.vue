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
import npModuleSelector from '../../components/npModuleSelector/npModuleSelector';

var testModules = IX.map('abcdefg'.split(""), function(c){
	var s1 = '123456789'.substring(0, 2+Math.floor(8*Math.random())).split("");
	return {id: c, name: '模块' + c, children: IX.map(s1, function(c1){
		var s2 = 'ABCDEFGHI'.substring(0, 2+Math.floor(8*Math.random())).split("");
		return {id: c+c1, name: '模块'+c +c1, children: IX.map(s2, function(c2){
			return {id: c+c1 +c2, name: '模块'+c +c1+c2};
		})};
	})};
});
var testCheckedModules = ["all", [], ["a/a1/a1A","a/a2/a2A"]];
console.log("Test Modules", testModules);

export default {
	data: function() {
		return {
			mode: 'view',
			modules: [].concat(testModules),
			values: []
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
