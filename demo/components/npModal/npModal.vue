<template>
<transition :name="transition === true ? 'fall' : transition">
	<div class="np-modal" :id="id" :class="clz" v-show='visible'>
		<div class="header" v-if="$slots.header">
			<slot name="header" :id="id"/>
		</div>
		<div class="header" v-else-if="title">
			<span class="title" v-html="title" />
			<a class="op-close" @click="close">
				<span class="pic"></span><span>关闭</span>
			</a>
		</div>
		<div class="body">
			<slot :id="id" />
		</div>
		<div class="footer" v-if="$slots.footer">
			<slot name="footer" :id="id"/>
		</div>
		<div class="footer" v-else-if="footer">
			<a class="btn btn-cancel" @click="close"><span>取消</span></a>
			<a class="btn btn-ok" @click="confirm"><span>确定</span></a>
		</div>
	</div>
</transition>
</template>

<script>
import modalMixin from './npModalMixin';

/** Modal常规标签
 * props : [
 *      // modalMixin， 接受自this.$modal.create({id, options:{visible},props:{}})
 * 		id: Modal的唯一标识
 *		visible: 窗体是否可见, 受调用控制
 *		transition: 窗体显示/隐藏的样式组名称，如'fall'
 *		// 可接受的
 *		clz: 除 np_modal外的附加样式 
 *	 	title: 在没有slots.header的情况下，可以简单定义头部；如果两个都没有，则没有头部
 *		footer: 在没有slots.footer的情况下，可以简单使用cancel/ok按钮； 如果都不要，则没有footer
 * ]
 * events : [
 *		confirm : 使用缺省footer时，点击OK按钮出发给上级的事件，带当前模块id
 * ]
 * slot : [
 *		缺省插槽：pros : {id}
 *		header插槽：	pros : {id}
 *		footer插槽：pros : {id}
 * ]
 */
export default {
	mixins: [modalMixin],
	props: {
		clz: { type: String },
		title: { type: String },
		footer: { type: Boolean, default: true }
	// },
	// data: function(){
	// 	debugger;
	// 	return {};
	}
};
</script>

<style lang="less">
.np-modal {
	position: fixed; background:white;

	.header {
		height:40px; padding:10px 20px;
		.title {float: left;font-size:14px;}
		.op-close {float:right; font-size:10px;}

	}
	.body {min-height:100px;}
	.footer {
		height:50px; padding:10px 20px;
		.btn {
			float:right;display:inline-block;text-align:center;
			width:76px; height:30px;margin-left:20px;
		}
	}
}

.fall-enter {
	transform: scale(0.2);
}
.fall-enter-active{
	transition: all 0.3s ease;
}
.fall-leave-active{
	transition: all .4s ease;
	transform: scale(0.2);
	opacity: 0.3;
}
</style>
