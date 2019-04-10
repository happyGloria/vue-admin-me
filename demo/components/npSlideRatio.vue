<template>
<div class = "np-slide-ratio" :class = "{disabled : disabled}"><!--
	--><span class = "text">{{percent}}%</span><!--
	--><a class = 'icon icon-decrease' :class="{disabled: disableDecrease}"
			@click.stop="stepRatio(-1)" /><!--
	--><np-indicator :disabled = 'disabled' 
			:value = 'ratio' :min = 'minR' :max = 'maxR'
			@input = 'setRatio'
			@slide = 'slideRatio'  /><!--
	--><a class = 'icon icon-increase' :class="{disabled: disableIncrease}"
			@click.stop="stepRatio(1)" /><!--
--></div>
</template>

<script>
import npIndicator from './npSlideIndicator';

/* eslint-disable no-restricted-properties */
/**
 * props : [
 *		disabled : true, // default : false,
 *		min : float, // 最小, default : 0.1, 
 *		max : float, // 最大, default : 10
 *		value: float, // default : 1
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		min: { type: Number, default: 0.1 },
		max: { type: Number, default: 10 },
		value: { type: Number, default: 1 }
	},
	data: function () {
		return {
			percent: 100,
			disableDecrease: false,
			disableIncrease: false,

			ratio: 0,
			minR: -1,
			maxR: 1
		};
	},
	watch: {
		value: function (v) { this.setValue(v); },
		min: function (v) { this.resetRange(v, this.max); },
		max: function (v) { this.resetRange(this.min, v); },
		ratio: function (r) {
			var v = Math.pow(10, r);
			this.percent = Math.floor(1000 * v) / 10;
			this.disableDecrease = this.ratio <= this.minR;
			this.disableIncrease = this.ratio >= this.maxR;
		}
	},
	methods: {
		setValue: function (v) {
			this.ratio = Math.min(this.maxR, Math.max(this.minR, Math.log10(v)));
		},
		resetRange: function (min, max) {
			var _min = min > 0 ? Math.log10(min) : -1, 
				_max = max > 0 ? Math.log10(max) : 1;
			this.minR = Math.min(_min, _max);
			this.maxR = Math.max(_max, _min);
			this.setValue(this.value);
		},

		slideRatio: function (r) {
			this.percent = Math.floor(1000 * Math.pow(10, r)) / 10;
		},
		setRatio: function (r) {
			this.ratio = r;
			this.$emit('input', Math.pow(10, r));
		},
		stepRatio: function (step) {
			var r = this.ratio + step * (this.maxR - this.minR) / 10;
			this.setRatio(Math.min(this.maxR, Math.max(this.minR, r)));
		}
	},
	components: {
		'np-indicator': npIndicator
	},
	mounted: function () {
		this.resetRange(this.min, this.max);
	}
};
</script>

<style lang="less">
@import "../less/ixwpre.less";

.np-slide-ratio{
	width:180px;

	&>* {display:inline-block;vertical-align:top;}

	.text {width:48px;margin-right: 4px;line-height:16px;}

	a {.x-pic; width:16px;height:16px; .x-pic-icon16-decrease;cursor:pointer;}
	a:hover {.x-pic-icon16-decrease-hover;}
	a.disabled {.x-pic-icon16-decrease-disabled;}

	.icon-increase { .x-pic-icon16-increase;}
	.icon-increase:hover { .x-pic-icon16-increase-hover;}
	.icon-increase.disabled { .x-pic-icon16-increase-disabled;}

	.np-slide-indicator {width:80px;margin:0 8px;}

	&.disabled>a {cursor: default;}
}
</style>
