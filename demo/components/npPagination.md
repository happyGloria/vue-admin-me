# 标签名
np-pagination

# Description :
通用分页

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
叶智

# Created :
2017-3-14

# API :

<pre>
 props: {
 	params: {
 		pageNo: 0,		//当前分页数
 		pageSize: 20,	//每页显示数据数量
 		total: 200		//数据总数
 	}
 }
 events: {
 	page: () => {pageNo, pageSize}	//返回当前切换的分页数，及每页显示数据数
 }
</pre>

# 特别说明:


# Used log: 
2017-3-14 components/npGrid
