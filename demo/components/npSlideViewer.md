# 标签名
np-slide－viewer

# Description :
图片集的横向排列，可滚动和点击，删除

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
	images : [ {id, url, width, height }], // 显示的图片集，包含id/url/width/height四项信息
	unitW: 图片最大显示宽度，default: 105 // 单张图片显示区域的最大宽度，如不是用缺省值，需要配合样式覆盖
	unitH: 图片最大显示高度，default: 80 // 单张图片显示区域的最大高度，如不是用缺省值，需要配合样式覆盖
]
events : [
	click : 图片点击事件
	delete :  图片删除事件
]
</pre>

# 特别说明:

1. images/下的图片icon24-delete*.png,  con20x30-prev*.png和con20x30-next*.png等8张小图片 复制到项目根目录下的/_assets/pic目录，然后运行npm run preless后即可正常使用；
如需要更换图片，只需要保持图片尺寸和文件名不变即可；
如出现重名需要修改文件名，请将npSlideViewer.vue中对该图标的对应的less mixin进行替换即可。

# Used log: 
2017-3-14 components/npGrid
