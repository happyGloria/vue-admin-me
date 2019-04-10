# 标签名
np-slide-ratio

# Description :
左右滑动的放大缩小倍数组件， 带加减号和倍数转为百分数的文字示意

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
	min : float, // 最小, default : 0.1, 
	max : float, // 最大, default : 10
	value: float, // default : 1
]
events : [
	input : value位置改变事件
]
</pre>

# 特别说明:
1. images/下的图片icon16-decrease*.png和icon16-increase*.png等6张小图片 复制到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npSlideRatio.vue中对该图标的对应的less mixin进行替换即可。

# Used log: 
2017-3-14 components/npGrid
