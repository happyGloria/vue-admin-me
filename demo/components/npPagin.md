# 标签名
np-pagin

# Description :
通用分页

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
赵丹

# Created :
2017-3-11

# API :

<pre>
调用数据 props : [
	total : Number,  //总页码
	value : Number	 //当前页
]

触发事件 events : [ 
	jump : 跳转按钮点击或页码输入框输入时触发事件;
	changePageNo : 点击分页数字按钮时，触发事件;
]

</pre>

# 特别说明: 
# 1.调用组件时，使用watch，监控当前页码的变化;
# 2.页码从0开始;

# Used log: 
