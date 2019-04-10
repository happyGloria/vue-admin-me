# 标签名
np-device-tree

# Description :
带组织和设备的结构树

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
赵丹,葛伟

# Created :
2017-3-6

# Refer :
2017-3-6 components/npTree/npTree

# API :

<pre>
调用数据 props : [
	data : 节点数据 : [{id,name,type,status, // basic attribute for node;
		isLeaf, 			// attribute for tree 
		children,    		// attribute for tree only if not isLeaf
		isOpen,childLoaded  // inner-reserved and only if not isLeaf
	}]
	onlineStatus : {"org-id" : {id, onlineCnt, offlineCnt},...}
]

触发事件 events : [ // see in components/np-tree/np-tree-mixin.js
	load : 父节点展开，引发加载数据事件
	dbclickOnLeaf  : 叶子节点双击事件
	clickOnLeaf : 叶子节点单击事件	
]
</pre>

# 特别说明:

将npDeviceTree/pic下的图片移到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npDeviceTree.vue中对该图标的对应的less mixin进行替换即可。

# Used log : 
2017-3-7 张愉 解析系统

