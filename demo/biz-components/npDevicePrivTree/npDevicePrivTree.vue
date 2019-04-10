<template>
	<div class="np-device-priv-tree" :class="{viewer: mode=='view'}">
		<np-priv-tree :data='treeData' :privs='privs' :value='treePrivs'
				@setPriv = 'setPriv'
				@load = 'openGroup'>
			<input :placeholder='$i(holder)' v-model='searchKey'
				   @keyup.enter = 'search' />
			<a class="icon icon-search" @click='search'></a>
		</np-priv-tree>
	</div>
</template>
<script>
import npPrivTree from '../../components/npTree/npPrivTree';
import DevicePermission from './devicePermission';

var CameraPrivs = [
	{ name: 'live', text: '实时视频查看' },
	{ name: 'history', text: '历史录像调阅' },
	{ name: 'download', text: '历史录像下载' },
	{ name: 'ptz', text: '云台控制' },
	{ name: 'manual-record', text: '手动录像' }
];

var Privs = {
	camera: CameraPrivs,
	iod: CameraPrivs
};
var Tips = {
	camera: '请输入您要搜索的摄像机名称',
	iod: '请输入卡口名称'
};

/* eslint-disable no-alert */
/**
 * props : [
 * 		ifQuery： 是否查询权限信息数据
 *		mode : 权限树工作模式： 'view' or other 
 * 		type : 权限设备类型： 'camera'/'monitor'/...
 *		serviceCaller : 数据读取函数： function(name, params, cbFn)
 *			name :[ 'listGroup'， 无参数，列出全部非设备节点，
 *					'listResource'， {id}, 列出某节点下的设备列表
 *					'search', {key}, 列出符合条件的主要设备列表，返回数据携带设备所在节点ID
 *					'listPermissiom', 无参数, 取得缺省权限信息
 *				]
 * ]
 * events : [
 *		query : 权限数据查询结果返回
 * ]
 *
 * 关键数据格式：
 * 	listGroup返回的非设备结点数据：[{id, type, name, children: [{id,type,name,children:[...]}]
 * 	listResoutce返回的设备列表：[{id,name}, ...]
 * 	search返回的设备列表：[{id,name, gid},...]
 *	 	权限信息数据：[{
 * 		type: "resource"/"group"/"self",  
 * 		group: 'groupId' //仅当type== "resource"
 * 		ids: [id,....], 
 * 		perm:["privName1",....]
 * 	}, ...]
 *
 */
export default {
	props: {
		ifQuery: { type: Boolean, default: false },
		mode: { type: String, default: 'view' },
		type: { type: String, default: 'camera' },
		serviceCaller: { type: Function }
	},
	data: function () {
		var _type = this.type || 'camera';
		return {
			holder: Tips[_type],
			searchKey: '',
			treeData: [],
			privs: [].concat(Privs[_type]),
			treePrivs: {}
		};
	},
	watch: {
		type: function (t) {
			this.holder = Tips[t];
			this.searchKey = '';
			this.treeData = [];
			this.privs = [].concat(Privs[t]);
			this.treePrivs = {};

			this.init();
		},
		ifQuery: function (val) {
			if (val) this.postData();
		}
	},
	methods: {
		_setData: function (result) {
			this.treeData = result.data;
			this.treePrivs = result.privs;
		},
		_closeOpenedGroup: function () {
			var oldNode = this.openedDeviceContainer;
			if (oldNode) { // 注意：代码不可修改，否则可能不会激发子组件的load事件
				oldNode.isOpen = false;
				oldNode.childLoaded = false;
				oldNode.children = [];
			}
		},

		init: function () {
			var _type = this.type || 'camera';

			this.openedDeviceContainer = null;
			this.initialized = false;

			this.dp = new DevicePermission(_type, IX.map(Privs[_type], function (priv) {
				return priv.name;
			}), this.serviceCaller, function (res) {
				this._setData(res);
				this.initialized = true;
			}.bind(this));
		},
		openGroup: function (node, cbFn) {
			var nodeId = node.id;
			if (this.inOpenGroup)
				return alert('设备数据加载中,请稍候再操作');

			this.inOpenGroup = true;
			this._closeOpenedGroup();
			this.dp.openGroup(nodeId, function () {
				this.openedDeviceContainer = node;
				this.treePrivs = this.dp.queryGroupPrivs(nodeId);
				this.inOpenGroup = false;
				cbFn();
			}.bind(this));
		},
		postData: function () {
			var privData = this.dp.getPrivData();
			if (!privData)
				alert('数据还未处理完毕，请稍后提取授权数据！');
			else
				this.$emit('query', privData);
		},
		setPriv: function (nodeId, privName) {
			if (this.mode == 'view')
				return;
			if (!this.dp.setPriv(nodeId, privName))
				return alert('数据更新中,请稍候再操作');

			if (this.searchResult) { // 搜索模式；
				this.treePrivs = this.dp.queryDevicePrivs(this.searchResult).privs;
				return;
			}
			// 非搜索模式
			this.treePrivs = this.dp.queryGroupPrivs(
				$XP(this.openedDeviceContainer, 'id', null)
			);
		},
		search: function () {
			var key = this.searchKey;
			if (!this.initialized || this.inOpenGroup)
				return alert('设备数据尚在加载中，请您稍候再搜索！');

			if (!key) { // 退出搜索模式
				this.searchResult = null;
				this._setData(this.dp.queryTreePrivs(
					$XP(this.openedDeviceContainer, 'id', null)
				));
				return;
			}
			this.serviceCaller('search', { key: key }, function (devices) {
				this.searchResult = devices;
				this._setData(this.dp.queryDevicePrivs(devices, true));
			}.bind(this));
		}
	},
	components: {
		'np-priv-tree': npPrivTree
	},
	mounted: function () {
		this.init();
	}
};
</script>

<style lang="less">
.np-device-priv-tree {
	.np-priv-tree { width:935px;height:504px;}
	.np-priv-tree >.np-tree-nodelist {height:474px;overflow-y:auto;}
}
.np-device-priv-tree.viewer {
	.icon-check, .privs .circle-check {display:none;}
	.privs .checked {display:inline-block;}
}
</style>

