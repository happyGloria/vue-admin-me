# 标签名
np-simple-module-selector

# Description :
简化模块组选器

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
葛伟

# Created :
2017-3-21

＃ Updated :
2017-4-24

#refer : 
components/npModuleSelector

# API :

<pre>
props : [
	mode : 展示模式 : 'view' or other
	modules : 节点数据 : [{
		id,name, // basic attribute for all modules and sub-modules;
		children			// attribute for node if not isLeaf
	}],
 	value : ["id", ... ]// 选中的叶子ID集合
]
events : [
	input : 数据改变事件: // data: 选中的叶子ID集合
]
</pre>

# 特别说明:

将npModuleSelector/pic下的图片移到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npModuleSelector.vue中对该图标的对应的less mixin进行替换即可。

除了传入参数value的格式之外，其他和组件npModuleSelector相同

# Used log: 
2017-3-21 解析系统

