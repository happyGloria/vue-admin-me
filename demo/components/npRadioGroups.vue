<template>
<div class = "np-radio-groups" :class = "{disabled : disabled}">
	<a v-for="opt in options" :class='{checked: opt.name == value}'
			@click.stop = 'select(opt.name)'>
		<span class = "icon" />
		<span>{{ opt.text }}</span>
	</a>
</div>
</template>

<script>
/**
 * props : [
 *		disabled : true, // default : false,
 *		options : [{name, text}], // default : [], 
 *		value: string, // default : null
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		options: { type: Array, default: [] },
		value: { type: [String, Number], default: null }
	},
	methods: {
		select: function (name) {
			if (!this.disabled)
				this.$emit('input', name);
		}
	}
};
</script>

<style lang="less">
@import "../less/ixwpre.less";

.np-radio-groups{
	a {
		display: inline-block; cursor: pointer; text-align: left;text-decoration:none;
		width: 115px; margin-bottom:10px;
	}
	span {line-height:17px;vertical-align:top;}
	.icon {.x-pic; width:17px; height:17px; .x-pic-icon17-radio; }
	.checked .icon {.x-pic-icon17-radio-checked;}

	&.disabled a{cursor: default;}
}
</style>
