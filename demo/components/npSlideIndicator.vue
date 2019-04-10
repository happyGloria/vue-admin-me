<template>
<div class = "np-slide-indicator" :class = "{disabled : disabled}"
		@mousemove = 'mousemove' 
		@mousedown.stop = 'mousedown'
		@mouseup.stop = 'mouseup'
		@mouseout = 'mouseout'>
	<div class = "bar"/>
	<a class = "ind" :style = "{left: pos}" />
</div>
</template>

<script>
/**
 * props : [
 *		disabled : true, // default : false,
 *		min : Int, // 最小, default : 0,
 *		max : Int, // 最大, default : 100
 *		value: Int
 * ]
 * events : [
 *		slide : value正在改变事件
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		min: { type: Number, default: 0 },
		max: { type: Number, default: 100 },
		value: { type: Number }
	},
	data: function () {
		return {
			val: 0,
			pos: 0,
		};
	},
	watch: {
		value: function (v) { this.setValue(v); },
		min: function (v) { this.resetRange(v, this.max); },
		max: function (v) { this.resetRange(this.min, v); },
	},
	methods: {
		setValue: function (v) {
			this.val = Math.min(this.range, Math.max(0, v - this.begin));
			this.pos = Math.floor(1000 * this.val / this.range) / 10 + '%';
		},
		resetRange: function (min, max) {
			this.begin = Math.min(min, max);
			this.range = Math.abs(max - min); // !!NEVER range == 0;
			this.setValue(this.value);
		},

		markInd: function (e) {
			var rect = this.barRect;
			var pos = Math.max(0, Math.min(rect[2], e.x - rect[0]));
			this.val = this.range * pos / rect[2];
			this.$emit('slide', this.val + this.begin);
			// console.log("markInd:", this.val);
		},
		markDown: function () {
			this.dragEvt = null;
			// if (this.val + this.begin !== this.value) 
			this.$emit('input', this.val + this.begin);
			// console.log("markDown:", this.val);
		},

		mousemove: function (e) {
			if (this.dragEvt)
				this.markInd(e);
		},
		mousedown: function (e) {
			if (this.disabled)
				return;
			this.dragEvt = e;
			this.barRect = $XH.getPosition(this.barEl);
		},
		mouseup: function (e) {
			if (this.disabled)
				return;
			this.markInd(e);
			if (this.dragEvt)
				this.markDown();
		},
		mouseout: function (e) {
			if (this.dragEvt && !$XH.ancestor(e.toElement, 'np-slide-indicator'))
				this.markDown();
		}
	},
	mounted: function () {
		var areaEl = this.$el;

		this.barEl = $XH.first(areaEl, 'bar');
		this.barRect = $XH.getPosition(this.barEl);
		this.dragEvt = null;

		this.resetRange(this.min, this.max);
	}
};
</script>

<style lang="less">
.np-slide-indicator {
	position: relative; cursor:pointer;padding:5px 0;

	.bar {
		background: #dbdbdb; height: 6px; 
		border-top: 1px solid #d0d0d0; border-radius: 3px;
	}
	a {
		position:absolute; background:white; top:0;
		height:16px; width:16px; margin-left:-8px;
		border:4px solid #86c5ff; border-radius:8px;
	}
	a:hover{border-color:#40a4ff;}

}
.np-slide-indicator.disabled {
	color:#666; cursor: no-drop;
	.bar {background: #eaeaea;}
	.ind {border-color: #c9e0ff;}
}
</style>
