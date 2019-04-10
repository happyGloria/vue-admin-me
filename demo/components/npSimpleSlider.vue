<template>
<div class = "np-simple-slider" :class = "{disabled : disabled}">
	<span class = "text">{{ label }}</span>
	<span class = "value">{{ valueTxt }}</span>
	<span class = "area"
			@mousemove = 'mousemove' 
			@mousedown.stop = 'mousedown'
			@mouseup.stop = 'mouseup'
			@mouseout = 'mouseout'>
		<div class = "bar"/>
		<div class = "ind" :class='{hover:hovered}' :style = "{left: pos}" />
	</span>
</div>
</template>

<script>
/**
 * props : [
 *		label : 标题
 *		disabled : true, // default : false,
 *		min : Int, // 最小, default : 0, 
 *		max : Int, // 最大, default : 100
 *		value: Int
 *		valueFormat : function(Int) // 值文字转换
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		min: { type: Number, default: 0 },
		max: { type: Number, default: 100 },
		label: { type: String, default: '' },
		value: { type: Number },
		labelFormat: {
			type: Function,
			default: function (v) {
				var s = '00' + Math.floor(v);
				return s.substring(s.length - 2);
			}
		}
	},
	data: function () {
		var begin = Math.min(this.min, this.max);
		var range = Math.abs(this.max - this.min); // !!NEVER range == 0;
		var v = Math.min(range, Math.max(0, this.value - begin));
		return {
			hovered: false,

			begin: begin,
			range: range,

			val: v,
			pos: Math.floor(1000 * v / range) / 10 + '%',
			valueTxt: this.labelFormat(v + begin)
		};
	},
	watch: {
		value: function (v) {
			this.val = Math.min(this.range, Math.max(0, v - this.begin));
		},
		val: function (v) {
			this.pos = Math.floor(1000 * v / this.range) / 10 + '%';
			this.valueTxt = this.labelFormat(v + this.begin);
		}
	},
	methods: {
		moveInd: function (e) {
			var rect = this.barRect;
			var pos = Math.max(0, Math.min(rect[2], e.x - rect[0]));
			this.val = Math.round(this.range * pos / rect[2]);
		},
		markDown: function () {
			this.dragEvt = null;
			if (this.val + this.begin !== this.value) 
				this.$emit('input', this.val + this.begin);
		},

		mousemove: function (e) {
			this.hovered = true;
			if (this.dragEvt)
				this.moveInd(e);
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
			this.moveInd(e);
			if (this.dragEvt)
				this.markDown();
		},
		mouseout: function (e) {
			this.hovered = false;
			if (this.dragEvt && !$XH.ancestor(e.toElement, 'area'))
				this.markDown();
		}
	},
	mounted: function () {
		var areaEl = $XH.first(this.$el, 'area');
		
		this.indEl = $XH.first(areaEl, 'ind');
		this.barEl = $XH.first(areaEl, 'bar');
		this.barRect = $XH.getPosition(this.barEl);

		this.dragEvt = null;
	}
};
</script>

<style lang="less">
.np-simple-slider{
	height:16px; margin:5px 15px;

	span {display: block; height:100%;}
	.text {float: left; width: 15px; text-align: right;}
	.value {float: right; width: 19px;}
	.area {position: relative; margin: 0 25px; padding: 5px 0;cursor:pointer;}
	.bar {
		background: #dbdbdb; height: 6px; 
		border-top: 1px solid #d0d0d0; border-radius: 3px;
	}
	.ind {
		position:absolute;background:white;top:0;
		height:16px;width:16px;margin-left:-8px;
		border:4px solid #86c5ff;border-radius:8px;
	}
	.hover{border-color:#40a4ff;}
	&.disabled {
		color:#666;
		.area {cursor: no-drop;}
		.bar {background: #eaeaea;}
		.ind {border-color: #c9e0ff;}
	}
}
</style>
