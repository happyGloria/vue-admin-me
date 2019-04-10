# 标签名
np-grid

# Description :
通用表格

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
叶智

# Created :
2017-3-14

# API :

<pre>
props: {
	clz: 'my-grid',	//表格class名称
	title: '数据表格',	//表格title	
	params: {
		pageNo: 0,		//当前页数
		pageSize: 20,	//每页个数
		total: 200		//表格数据总数
	},
	track: 'id',			//表格渲染时指定key, 默认为id
	colmuns: [		//表格中列的集合数组
		{
			name: userName,		//此列对应数据中对象中的key值
			title: '用户名',			//用于显示在表格header中的文字
			solt: Boolean			//此列是否使用插槽
		}
	],
	items: [{
		actions: [{name, title}]	//此列单独操作
	}]		//数据		
	actions: [		//统一操作
		{
			name: 'add',
			title: '添加'
		}
	]
}
events: {
	check: () => {return Array},			//勾选表格复选框，返回选中id数组
	clickRow: () => {return {item}},		//单击表格某一行，返回本行数据
	action: () => {return {name, item}}	//action操作时，返回name及数据
	page: () => {return {pageNo, pageSize}}	//分页选择，返回选择页数
}
slot: [	//具名插槽
	name: colmun.name  (props : {item})
]
</pre>

# 特别说明:

此组件再次封装时，具名slot可能会不生效，建议不要作为子组件再次封装。

# Used log: 

