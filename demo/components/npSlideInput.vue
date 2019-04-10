<template>
<div class = "np-slide-input" :class = "{disabled : disabled}">
	<div class="label">
		<span class="text">{{ title }}</span>
		<span class="value">
			<slot />
			<input :value='val' @input='input' @blur='confirm' @keyup.enter='confirm'/>
			<span class="unit" v-if="unitLabel">{{ unitLabel }}</span>
		</span>
	</div>	
	<np-indicator :disabled = 'disabled' 
			:value = 'val' :min = 'min' :max = 'max'
			@input = 'change'
			@slide = 'slide'  />
</div>
</template>

<script>
import npIndicator from './npSlideIndicator';

/* eslint-disable no-restricted-properties */
function getValueFormatter(format) {
	var arr = format.split('.');
	var n = Math.pow(10, arr[0] == 'f' ? parseInt(arr[1], 10) : 0);
	
	return function (v) {
		// console.log(v, n);
		return Math.floor(v * n) / n;  
	};
}
/**
 * props : [
 *		disabled : true, // default : false,
 *		min : float, // 最小, default : 0, 
 *		max : float, // 最大, default : 100
 *		value: float, // default : 0
 *		valueFormat: 'n', // n(整数) or f.m（带m位小数的实数）
 * 		title: string, // default: ""
 *		unitLabel: string, // default: ""
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 * slots: default
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		min: { type: Number, default: 0 },
		max: { type: Number, default: 100 },
		value: { type: Number, default: 0 },
		valueFormat: { type: String, default: 'n' },
		title: { type: String, default: '' },
		unitLabel: { type: String, default: '' }
	},
	data: function () {
		return {
			val: 0
		};
	},
	watch: {
		valueFormat: function (f) {
			this.formatter = getValueFormatter(f);
		},
		value: function (v) { this.val = v; }
	},
	methods: {
		slide: function (v) {
			this.val = this.formatter(v);
		},
		change: function (v) {
			this.slide(v);
			this.$emit('input', this.val);
		},
		input: function (e) {
			this.slide(Math.max(this.min, Math.min(this.max, e.target.value)));
		},
		confirm: function (e) {
			this.change(Math.max(this.min, Math.min(this.max, e.target.value)));
			e.target.value = this.val;
		}
	},
	components: {
		'np-indicator': npIndicator
	},
	mounted: function () {
		this.val = this.value;
		this.formatter = getValueFormatter(this.valueFormat);
	}
};
</script>

<style lang="less">
.np-slide-input{
	.label {display:block;margin-bottom:12px; padding:0; color: #666;height:18px;vertical-align:top;}
	span {display:inline-block;}
	.text {float: left;padding: 2px 0;}
	.value {float:right;}
	input {background:white; width:40px; height:18px;padding:1px;text-align:center;font-weight:normal;} 
	.unit {margin-left:3px;}
}
</style>
