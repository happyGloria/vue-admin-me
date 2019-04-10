<template>
<div class = "np-slide-viewer" :class = "{disabled : disabled}">
	<a class = "icon-prev" :class="{disabled: disablePrev}" @click.stop = "slide(-1)"/><!--	
	--><div :style="{width: areaWidth + 'px'}"><!--	
		--><a v-for = "img in imgs" class="img" 
				:class="{focused: focusedId == img.id}" 
				:style="{left: img.left + 'px'}" 
				@click.stop = "clickImg(img)">
			<img :src="img.url" :width="img.w" :height="img.h" :style="{margin:img.margin}"/>
			<span class="icon-delete" @click.stop = "deleteImg(img)" />
		</a><!--
	--></div><!--
	--><a class = "icon-next" :class="{disabled: disableNext}" @click.stop = "slide(1)"/>
</div>
</template>

<script>
/**
 * props : [
 *		disabled : true, // default : false,
 *		images : [ {id, url, width, height }]
 *		unitW: 图片最大显示宽度，default: 105
 *		unitH: 图片最大显示高度，default: 80
 * ]
 * events : [
 *		click : 图片点击事件
 *		delete :  图片删除事件
 * ]
 */
export default {
	props: {
		disabled: { type: Boolean, default: false },
		images: { type: Array, default: [] },
		unitW: { type: Number, default: 105 },
		unitH: { type: Number, default: 80 }
	},
	data: function () {
		// console.log("data:");
		return {
			areaWidth: 0,
			disablePrev: false,
			disableNext: false,

			focusedId: null,
			imgs: []
		};
	},
	watch: {
		unitW: function (w) { this.offsetWidth = w + 12; },
		images: function (arr) {
			this._reset(arr);
			this._resize();
		}
	},
	methods: {
		deleteImg: function (img) {
			this.$emit('delete', img.id);
		},
		clickImg: function (img) { 
			this.focusedId = img.id;
			this.$emit('click', img.id); 
		},

		_reset: function (arr) {
			var unitW = this.unitW, unitH = this.unitH,
				offsetWidth = this.offsetWidth,
				offsetLeft = 0 - this.offsetLeft;
			this.imgs = IX.map(arr, function (img, idx) {
				var r = Math.min(1, unitW / img.width, unitH / img.height);
				var w = img.width * r, h = img.height * r;
				var marginW = (unitW - w) / 2, marginH = (unitH - h) / 2;
				return {
					id: img.id, 
					url: img.url,
					w: w, 
					h: h,
					left: offsetLeft + idx * offsetWidth,
					margin: marginH + 'px ' + marginW + 'px'
				};
			});
			this.totalWidth = arr.length * offsetWidth;
		},
		_slide: function (_offsetLeft) {
			var offsetWidth = this.offsetWidth,
				offsetLeft = 0 - Math.max(0, Math.min(this.slideW, _offsetLeft));
			IX.iterate(this.imgs, function (img, idx) {
				img.left = offsetLeft + idx * offsetWidth;
			});
			this.offsetLeft = 0 - offsetLeft;
			this.disablePrev = this.offsetLeft == 0;
			this.disableNext = this.offsetLeft == this.slideW;
		},
		_resize: function () {
			this.slideW = Math.max(0, this.totalWidth - this.areaWidth);
			this._slide(this.offsetLeft);
		},

		resize: function () {
			this.areaWidth = this.$el.offsetWidth - 80;
			this._resize();
		},
		slide: function (delta) {
			// console.log("call: slide", delta);
			this._slide(this.offsetLeft + delta * this.offsetWidth);
		}
	},
	mounted: function () {
		this.offsetLeft = 0;
		this.offsetWidth = this.unitW + 12;

		this._reset(this.images);
		this.resizeEvtRemover = $Xw.listen('resize', function () {
			this.resize();
		}.bind(this));
		this.resize();
	},
	beforeDestroy: function () {
		if (this.resizeEvtRemover)
			this.resizeEvtRemover.remove();
	}
};
</script>

<style lang="less">
@import "../less/ixwpre.less";

.np-slide-viewer{
	height:100px;

	[class ^= "icon"] {
		margin: 35px 10px; cursor:pointer;
		.x-pic; width: 20px; height: 30px; .x-pic-icon20x30-prev;
	}
	.icon-prev:hover {.x-pic-icon20x30-prev-hover;}
	.icon-prev.disabled {.x-pic-icon20x30-prev-disabled;cursor: default;visibility:hidden;}
	.icon-next {.x-pic-icon20x30-next;}
	.icon-next:hover {.x-pic-icon20x30-next-hover;}
	.icon-next.disabled {.x-pic-icon20x30-next-disabled;cursor: default;visibility:hidden;}

	div {position: relative; display: inline-block; overflow-x: hidden; height:100%;}
	.img {
		position:absolute; display:block; 
		padding: 1px; border: 2px solid transparent;
		transition: all 0.5s ease-in;
	}
	.icon-delete {
		position:absolute; display: none; bottom: 4px; right:4px; margin:0;
		width: 24px; height: 24px; .x-pic-icon24-delete;
	}
	.icon-delete:hover {.x-pic-icon24-delete-hover;}
	.img:hover{
		border-color: #40A4FF;
		.icon-delete {display: block; }
	}
	.img.focused {border-color: #40A4FF;}
}
</style>
