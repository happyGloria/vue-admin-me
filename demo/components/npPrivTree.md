# 标签名
np-priv-tree

# Description :
通用结构树

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
葛伟

# Created :
2017-4-1

# API :

<pre>
调用数据 props : [
		data : 节点数据 : [{id,name,type,status, // basic attribute for all node;
 			isLeaf, 			// tree attribute for all node
 			children,isOpen,childLoaded	// attribute for node only if not isLeaf
 		}],
 		privs : 权限列表: [{name, text}]
 		value : 权限描述数据{id : {privName:boolean} }
  ]
触发事件 events : [ 
 		load : 父节点展开，引发加载数据事件
 		setPriv : 更改Priv事件
  ]
</pre>

# 特别说明:

1. 将npTree/pic下的图片移到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npTreeNodelist.vue中对该图标的对应的less mixin进行替换即可。

2. 注意查看项目中是否已经注册过滤器“truncLongString”，类似如下代码。

//过滤器-截取字符串
Vue.filter('truncLongString', function(value, num) {
	if (!value) { return '' }
	return value.substrByLength(num || 8).reString;
});

如果没有注册请将此代码添加到合适的地方

# Used log: 
2017-4-1 biz-components/npDevicePrivTree

