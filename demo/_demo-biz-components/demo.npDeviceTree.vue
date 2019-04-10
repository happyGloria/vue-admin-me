<template>
	<div class="grid-box">
		<div class="tree-box">
			<np-device-tree
				:data = 'dataList' :onlineStatus = 'onlineStatus'
				@load = 'load'
				@clickOnLeaf = 'clickOnLeaf'
				@dbclickOnLeaf = 'dbclickOnLeaf' />
		</div>
	</div>
</template>
<script>
import npDeviceTree from '../biz-components/npDeviceTree';
// import serviceFactory from '../../service';

export default {
	data: function () {
		return {
			dataList: [],
			onlineStatus: {},
		};
	},
	methods: {
		initDataList: function () {
			// serviceFactory.treeModel('getTreeMsg', { id: '', type: 'org' }, (d) => {
			// 	this.dataList = d.map((item) => {
			// 		item.children = [];
			// 		item.isOpen = true;
			// 		item.childLoaded = true;
			// 		item.isLeaf = false;
			// 		item.status = 'on';
			// 		this.load(item);
			// 		return item;
			// 	});
			// }, (info) => {
			// 	console.log('err :', info);
			// });
		},
		load: function (nodeData, cbFn) {
			/* 为了数据模拟-start */
			var type = 'group';
			if (cbFn) {
				type = 'camera';
			}
			/* 为了数据模拟-end */
			// serviceFactory.treeModel('getTreeMsg', { id: nodeData.id, type: type }, (d) => {
			// 	nodeData.children = d.map((item) => {
			// 		if (item.type === 'group') {
			// 			item.children = [];
			// 			item.isOpen = false;
			// 			item.childLoaded = false;
			// 			item.isLeaf = false;
			// 			item.status = 'on';
			// 		} else {
			// 			item.isLeaf = true;
			// 			item.status = Math.random() * 2 > 1 ? 'on' : 'off';
			// 		}
			// 		return IX.inherit(item, {
			// 			id: nodeData.id + '-' + item.id
			// 		});
			// 	});
			// }, (info) => {
			// 	console.log('err :', info);
			// });
			if (IX.isFn(cbFn))
				cbFn();
		},
		clickOnLeaf: function (node) {
			console.log('单击', node);
		},
		dbclickOnLeaf: function (node) {
			console.log('双击', node);
		},
		loadonlineStatus: function () {
			// serviceFactory.treeModel('onlineStatus', {}, (d) => {
			// 	this.onlineStatus = d;
			// });
		}
	},
	components: { 
		npDeviceTree
	},
	created: function () {
		// this.initDataList();
		// setTimeout(() => this.loadonlineStatus(), 500);
	},
};
</script>
<style lang="less">
.tree-box{
	width:300px;
	background-color: #E0E0E0;
}
</style>
