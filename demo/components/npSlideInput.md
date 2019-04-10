# 标签名
np-slide-input

# Description :
可以输入，拖动方式改变数值的组件

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
葛伟

# Created :
2017-5-5

#refer : 
components/npSlideIndicator

# API :

<pre>
props : [
	disabled : true, // default : false,
	min : float, // 最小, default : 0, 
	max : float, // 最大, default : 100
	value: float, // default : 0
	valueFormat: 'n', // n(整数) or f.m（带m位小数的实数） 用于格式化数值的格式串
	title: string, // default: ""   左侧标题
	unitLabel: string, // default: ""  数值单位
]
events : [
	input : value改变事件
]
slots:  可以携带一个缺省的slot，用于对数值信息区域进行装饰。

</pre>

# 特别说明:


# Used log: 
