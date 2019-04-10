<template>
	<div class="np-device-tree">
		<np-tree :data = 'data'
				@load ='load'
				@dbclickOnLeaf = 'dbclickOnLeaf'
				@clickOnLeaf = 'clickOnLeaf' >
			<template scope="props">
				<span class="device-status" v-if="props.level==1" >
					[ 在线：<i class="on">{{getOnlineCount(props.id)}}</i> / 离线：<i class="off">{{getOfflineCount(props.id)}}</i> ]
				</span>
				<span class="device-status" v-else-if="!props.isLeaf" >
					[ <i class="on">{{getOnlineCount(props.id)}}</i>/<i class="off">{{getOfflineCount(props.id)}}</i> ]
				</span>
			</template>
		</np-tree>
	</div>
</template>
<script>
import treeMixin from '../components/npTree/npTreeMixin';
import npTree from '../components/npTree/npTree';
/**
 * props : [
 * 		data : 节点数据 : [{id,name,type,status, // basic attribute for node;
 *			isLeaf, 			// attribute for tree 
 *			children,    		// attribute for tree only if not isLeaf
 *			isOpen,childLoaded  // inner-reserved and only if not isLeaf
 *		}]
 *		onlineStatus : {"org-id" : {id, onlineCnt, offlineCnt},...}
 * ]
 * events : [// see in components/tree/np-tree-mixin.js
 *		load : 父节点展开，引发加载数据事件
 *		dbclickOnLeaf  : 叶子节点双击事件
 *		clickOnLeaf : 叶子节点单击事件	
 * ]
 * 计算属性: total : 总在线／离线统计
 * 内部方法: {
 * 		getOnlineCount : 节点的在线设备数
 * 		getOfflineCount : 节点的离线设备数
 * }
 */
export default {
	mixins: [treeMixin],
	props: {
		onlineStatus: { type: Object, default: {} }
	},
	methods: {
		getOnlineCount: function (id) {
			return $XP(this.onlineStatus, id + '.onlineCnt', 0);
		},
		getOfflineCount: function (id) {
			return $XP(this.onlineStatus, id + '.offlineCnt', 0);
		}
	},
	components: {
		npTree
	}
};
</script>
<style lang="less">
@import "../less/ixwpre.less";
.np-device-tree {
	.device-status{
		color:#999;
		i {font-style:normal;}
		.on{color:#47ab00;}
		.off{color:#e24332;}
	}
	.np-tree-nodelist{
		.icon{.x-pic;}
		.icon-type{width:16px;height:14px;.x-pic-icon16x14-police;}
		.level-1>.node .icon-type{.x-pic-icon16x14-org;}
		.node.type-camera .icon-type{.x-pic-icon16x14-camera;}
		.status-off .icon-leaf{.x-pic-icon16x14-camera-disabled;}
	}
}
</style>
