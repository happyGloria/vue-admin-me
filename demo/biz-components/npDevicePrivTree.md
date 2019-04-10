# 标签名
np-device-priv-tree

# Description :
带组织和设备的权限设置结构树

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
赵丹,葛伟

# Created :
2017-4-1

# Updated :
2017-4-25

# Refer :
2017-4-1 components/npTree/npPrivTree

# API :

<pre>
调用数据 props : [
 	ifQuery： 是否查询权限信息数据
  	mode : 树查看模式：‘view' or other
  	type : 权限设备类型： 'camera'/'monitor'/...
	serviceCaller : 数据读取函数： function(name, params, cbFn)
		name :[ 'listGroup'， 无参数，列出全部非设备节点，
				'listResource'， {id}, 列出某节点下的设备列表
				'search', {key}, 列出符合条件的主要设备列表，返回数据携带设备所在节点ID
				'listPermissiom', 无参数, 取得缺省权限信息
			]
 ]
触发事件 : [
	query : 权限数据查询结果返回
 ]
 
关键数据格式：
  	listGroup返回的非设备结点数据：[{id, type, name, children: [{id,type,name,children:[...]}]
  	listResoutce返回的设备列表：[{id,name}, ...]
  	search返回的设备列表：[{id,name, gid},...]
 	权限信息数据：[{
 		type: "resource"/"group"/"self",  
 		group: 'groupId' //仅当type== "resource"
 		ids: [id,....], 
 		perm:["privName1",....]
 	}, ...]

</pre>

# 特别说明:

# Used log : 
2017-4-1 张愉 解析系统

