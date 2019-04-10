<template>
	<div class="np-device-priv-tree">
		<np-priv-tree :data='treeData' :privs='privs' :value='treePrivs'
				@setPriv = 'setPriv'
				@load = 'openGroup'>
			<input :placeholder='holder' v-model='searchKey'
				   @keyup.enter = 'search' />
			<a class="icon icon-search" @click='search'></a>
		</np-priv-tree>
	</div>
</template>
<script>
import npPrivTree from '../../components/npTree/npPrivTree';

var CameraPrivs = [
	{name: 'live', text: '实时视频查看'},
	{name: 'history', text: '历史录像调阅'},
	{name: 'download', text: '历史录像下载'},
	{name: 'ptz', text: '云台控制'},
	{name: 'manual-record', text: '手动录像'}
];


/**  参看biz-component/npDevicePrivTree的使用
 */
export default {
	data: function() {
		return {
			holder : "Welcome",
			searchKey: '',
			treeData: [],
			privs: [].concat(CameraPrivs),
			treePrivs: {}
		}
	},
	methods: {
		init: function(){
			//...
		},
		openGroup: function(node, cbFn){
			//...	
		},
		setPriv: function(itemId, privName){
			 //...
		},
		search: function() {
		   //...     
		}
	},
	components: {
		'np-priv-tree': npPrivTree
	},
	mounted: function(){
		this.init();
	}
}
</script>

<style lang="less">
.np-priv-tree {
	width:935px;height:504px;
	&>.np-tree-nodelist {height:474px;overflow-y:auto;}
}
</style>

