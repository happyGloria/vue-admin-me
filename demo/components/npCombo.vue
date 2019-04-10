<template>
<div class = "np-combo" :class = "[{disabled : disabled}, npclass]">
	<div class = "trigger" @click = 'toggleList'>
		<span class = "unit">{{ unitTxt }}</span>	
		<span class = "value">{{ value }}</span>
	</div>
	<div class = "list" v-show = 'ifPop' >
		<div :style = '{marginTop: marginTop + "px"}' /> 
		<a v-for = '(item, idx) in items' :class = '{selected: item.selected}'
			@click.stop = 'click(idx)' >{{ item.value }}</a>
	</div>
</div>
</template>

<script>
function listenOnMousewheel(el, fn) {
	var evtFn = function (event) {
		var evt = event || window.event;
		fn({ dx: evt.wheelDeltaX / 10, dy: evt.wheelDeltaY / 10 }, evt);
	};
	el.onmousewheel = evtFn;
	return {
		remove: function () {
			el.onmousewheel = null;
		}
	};
}

/**
 * props : [
 *		npclass :  附加样式类
 *		unitTxt : 标题
 *		disabled : true, // default : false,
 *		options : [String], 
 *		value: String
 * ]
 * events : [
 *		input : value位置改变事件
 * ]
 */
export default {
	props: {
		npclass: { type: String, default: '' },
		unitTxt: { type: String, default: '' },
		disabled: { type: Boolean, default: false },
		options: { type: Array },
		value: { type: [Number, String] }
	},
	data: function () {
		return {
			ifPop: false,

			total: 0, 
			chosedIdx: 0,
			marginTop: 0,

			unitH: 0,
			totalMargin: 0
		};
	},
	computed: {
		items: function () {
			var selectedValue = this.value;
			var chosedIdx = 0;
			var items = (this.options || []).map(function (option, idx) {
				/* eslint-disable eqeqeq */
				var ifSelected = option == selectedValue;
				/* eslint-enable eqeqeq */
				if (ifSelected)
					chosedIdx = idx;
				return {
					value: option,
					selected: ifSelected
				};
			});
			this.total = items.length;
			this.chosedIdx = chosedIdx;
			return items;
		}
	},
	methods: {
		toggleList: function () {
			if (!this.disabled)
				this.ifPop = !this.ifPop;
			if (this.ifPop)
				setTimeout(() => { this.initScroll(); }, 0);
		},
		click: function (idx) {
			var item = this.items[idx];
			if (item.selected) return;
			this.ifPop = false;
			this.$emit('input', item.value);
		},
		scroll: function (pos) {
			this.marginTop = 0 - Math.max(0, Math.min(this.totalMargin, pos));
		},

		initScroll: function () {
			var aEl = $XD.first(this.popEl, 'a');
			this.unitH = aEl.offsetHeight;
			this.totalMargin = this.total * this.unitH - this.popEl.offsetHeight;
			this.scroll(this.chosedIdx * this.unitH);
		}
	},
	mounted: function () {
		if (this.disabled) return;
		this.clickEvtRemover = $Xw.listen('click', (e) => {
			if ($XD.isAncestor(e.target, this.$el)) return;
			this.ifPop = false;
		});
		this.popEl = $XH.first(this.$el, 'list');
		this.scrollEvtRemover = listenOnMousewheel(this.popEl, (delta) => {
			this.scroll((IX.isMac ? 1 : -1) * delta.dy - this.marginTop);
		});
	},
	beforeDestroy: function () {
		if (this.clickEvtRemover) this.clickEvtRemover.remove();
		if (this.scrollEvtRemover) this.scrollEvtRemover.remove();
	}
};
</script>

<style lang="less">
.np-combo{
	position: relative; cursor: pointer; 
	font-size: 12px; color: #7c7c7c;
	height: 24px; width: 44px;

	&.disabled {color: #a8a8a8;cursor: default;}

	.trigger{
		padding: 3px; border: 1px solid #d5d5d5; border-radius: 3px;
	}

	span {display: block; height: 100%;}
	.unit {float: right; width: 18px; text-align: center;}
	.value {margin-right: 18px; text-align: right }

	.list {
		position: absolute; z-index: 10000; overflow: hidden; background: white;
		top: 26px; left: 0; height:98px; width: 100%; 
		border: 1px solid #d5d5d5; border-radius: 3px;
	}
	a {
		display: block; text-align: center;
		height: 24px; padding: 4px 0;
		border-radius: 2px; text-decoration: none;
	}
	a.selected {color: #40a4ff; font-weight: bold;}
	a:hover {background: #9cd0ff; color: #fff;}
}
</style>
