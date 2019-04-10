# 标签名
np-modals
np-modal

# Description :
统一管理的Modal窗口构造器

# 浏览器兼容性 :
Chrome，Firefox 

# Author :
葛伟

# Created :
2017-4-20

# API :

<pre>
np-modals: Modal容器标签，一般只在app.vue中作为#app的最后一个子元素被调用；
调用后将在所有vue对象上绑定$modal属性，主要使用三个方法：
	
	var modal = this.$modal.create({id, component, options: {
			mask :  是否使用背景遮罩
			visible : 产生是否可见
		}, props: { 
			transition: 'fall' // 窗体显示/隐藏时的动画效果
			// 其他窗体自定义的参数
		}
	});
	this.$modal.destroy(modalId); // modalId可不提供，将销毁最上面的窗体
	this.$modal.clean(); //清楚当前的所有窗体

create返回的结果modal内含四个方法:

	show: function () {}, // 显示窗体
	hide: function () {}, // 隐藏窗体
	animateDestory: function (ms) {}, // 动画效果销毁窗体
	destroy: function () {} // 简单销毁窗体


np-modal：Modal常规标签： 一般作为基类标签，被包含和扩展
调用数据 props : [
	// modalMixin， 接受自this.$modal.create({id, options:{visible},props:{}})
 	id: Modal的唯一标识
	visible: 窗体是否可见, 受调用控制
	transition: 窗体显示/隐藏的样式组名称，如'fall'
	// 可接受的
	clz: 除 np_modal外的附加样式 
 	title: 在没有slots.header的情况下，可以简单定义头部；如果两个都没有，则没有头部
	footer: 在没有slots.footer的情况下，可以简单使用cancel/ok按钮； 如果都不要，则没有footer
]
触发事件 events : [ 
	confirm : 使用缺省footer时，点击OK按钮出发给上级的事件，带当前模块id
]
模板插槽 slot : [
	缺省插槽：pros : {id}
	header插槽：	pros : {id}
	footer插槽：pros : {id}
]

</pre>

# 特别说明:

两组标签是配合使用的，

1. 首先在app.vue中引入np-modals标签；

2. 然后在需要产生modal窗体的地方使用如下代码：

<pre>
import testModal from './testModal';

openModal: function(){
	var self = this;
	var modal = this.$modal.create({
		component: testModal,
		options: {

			mask: true
		},
		props: {
			transition: 'fall',
			onOK: function () {
				console.log("OK!");
				//self.openModal();
				modal.animateDestory(400);
			}
		}
	});
}
</pre>

详细代码示例参看_demo-components/demo.npModal.vue

除基本样式外，其他样式需要自行定义；

# Used log: 
2017-3-7 biz-components/npDeviceTree

