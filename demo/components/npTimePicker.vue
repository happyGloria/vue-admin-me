<template>
<div class = "np-time-picker">
	<np-slider :label = '"时"' :max = '23' 
			:value = 'vHour' @input = 'changeHour'/>
	<np-slider :label = '"分"' :max = '59' 
			:value = 'vMin' @input = 'changeMin'/>
	<np-slider :label = '"秒"' :max = '59' 
			:value = 'vSec' @input = 'changeSec'/>
	<!-- span>{{ valueTxt }}</span -->
</div>
</template>

<script>
import npSlider from './npSimpleSlider';

function int2String(v, n) {
	var _n = n || 2;
	var s = '0'.multi(_n) + v;
	return s.substring(s.length - _n);
}
function int2str(v) { return int2String(v, 2); }
function checkNumber(v, min, max) {
	if (isNaN(v)) return min;
	return Math.max(min, Math.min(v - 0, max));
}
/**
 * props : [
 *		// disabled : true, // default : false,
 *		value: String, // XX:XX:XX, default : 00:00:00
 * ]
 * events : [
 *		input : value改变事件
 * ]
 */
export default {
	props: {
		// disabled: { type: Boolean, default: false },
		value: { type: String, default: '00:00:00' }
	},
	data: function () {
		var _v = this.value.split(':');
		return {
			vHour: checkNumber(_v[0], 0, 23),
			vMin: checkNumber(_v[1], 0, 59),
			vSec: checkNumber(_v[2], 0, 59)
		};
	},
	computed: {
		valueTxt: function () {
			// console.log("valutext:", [this.vHour, this.vMin, this.vSec]);
			return [this.vHour, this.vMin, this.vSec].map(int2str).join(':');
		}
	},
	watch: {
		value: function (v) {
			var _v = v.split(':');
			this.vHour = checkNumber(_v[0], 0, 23);
			this.vMin = checkNumber(_v[1], 0, 59);
			this.vSec = checkNumber(_v[2], 0, 59);
		}
	},
	methods: {
		change: function () {
			// console.log("changed:", this.valueTxt);
			if (this.valueTxt !== this.value)
				this.$emit('input', this.valueTxt);
		},
		changeHour: function (v) {
			this.vHour = v;
			this.change();
		},
		changeMin: function (v) {
			this.vMin = v;
			this.change();
		},
		changeSec: function (v) {
			this.vSec = v;
			this.change();
		}		
	},
	components: {
		'np-slider': npSlider
	}
};
</script>

<style lang="less">
.np-date-picker {

}
</style>
