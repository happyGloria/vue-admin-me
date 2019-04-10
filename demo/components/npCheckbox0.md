# 标签名
np-checkbox

# Description :
独立勾选框

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
葛伟

# Created :
2017-5-5

# API :
<pre>
props : [
	disabled : true, // default : false,
	value : true, 是否选中, // default : false, 
	text: string, // default : null
]
events : [
	input : value位置改变事件
]
</pre>

# 特别说明:

1. images/下的图片icon13-checked.png和icon13-unchecked.png移到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npCheckbox0.vue中对该图标的对应的less mixin进行替换即可。

一般用于独立行的勾选框，如果是一批checkbox，可以循环使用npCheckBox，或者新建组件npCheckboxGroup

# Used log: 

