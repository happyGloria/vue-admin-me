<template>
<div class = "np-checkbox" :class = "{disabled : disabled}">
	<a :class='{checked: value}' @click.stop = 'click'>
		<span class = "icon" />
		<span>{{ text }}</span>
	</a>
</div>
</template>

<script>
/**
 * props : [
 *		disabled : true, // default : false,
 *		value : true, 是否选中, // default : false, 
 *		text: string, // default : null
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		value: { type: Boolean, default: false },
		text: { type: String, default: '' }
	},
	methods: {
		click: function () {
			this.$emit('input', !this.value);
		}
	}
};
</script>

<style lang="less">
@import "../less/ixwpre.less";

.np-checkbox{
	a {
		display: inline-block; cursor: pointer; text-align: left;text-decoration:none;
		width: 100%; margin-bottom:10px;
	}
	span {line-height:17px;vertical-align:top;}
	.icon {.x-pic; width:13px; height:13px;margin:2px; .x-pic-icon13-uncheck; }
	.checked .icon {.x-pic-icon13-checked;}

	&.disabled a{cursor: default;}
}
</style>
