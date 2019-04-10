# 标签名
np-radio-groups

# Description :
Radio祖选

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
	options : [{name, text}], // default : [], 
	value: string, // default : null
]
events : [
		input : value改变事件
］
</pre>

# 特别说明:

1. images/下的图片icon17-radio.png和icon17-radio-checked.png移到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npRadioGroups.vue中对该图标的对应的less mixin进行替换即可。


# Used log: 
