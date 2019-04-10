<template>
	<div class="np-pagination">
		<div class="page-items" v-if="params.total !== 0">
			<a :class="{ 'previous pbtn': true, 'disable': pno === 0 }" @click="change(-1, $event)">&lt;上一页</a>
			<a :class="{ 'pbtn': true, 'disable': item === '...', 'active': item === pno + 1}"
				:style="{'width':`${pageItemLevel(item)*4 + 24}px`}"
				v-for="item of items" @click="jump(item)"
			>{{item}}</a>
			<a :class="{ 'next pbtn': true, 'disable': pno === pages -1 }" @click="change(1, $event)">下一页&gt;</a>
			<div class="jump" v-if="pages > 6">
				到第<input type="text" v-model="jumpNo" class="page-jump" v-on:keyup.enter="jump(jumpNo)">页
				<a class="go pbtn" @click="jump(jumpNo)">跳转</a>
			</div>
		</div>
	</div>
</template>
<script>
/**
 * props: {
 * 	params: {
 * 		pageNo: 0,		//当前分页数
 * 		pageSize: 20,	//每页显示数据数量
 * 		total: 200		//数据总数
 * 	}
 * }
 * events: {
 * 	page: () => {pageNo, pageSize}	//返回当前切换的分页数，及每页显示数据数
 * }
 */
	export default {
		props: {
			params: {
				type: Object,
				default: function () {
					return { pageNo: 0, pageSize: 20, total: 0 };
				}
			}
		},
		data: function () {
			return { jumpNo: '', pno: this.params.pageNo };
		},
		computed: {
			pages: function () {
				return Math.ceil(this.params.total / this.params.pageSize); 
			},
			items: function () {
				if (this.pages <= 6)
					return '0'.multi(this.pages).split('').map(function (item, idx) { return idx + 1; });
				if (this.pno < 4)
					return [1, 2, 3, 4, 5, '...', this.pages];
				if (this.pno > this.pages - 5) 
					return [1, '...', this.pages - 4, this.pages - 3, this.pages - 2, this.pages - 1, this.pages];
				return [1, '...', this.pno, this.pno + 1, this.pno + 2, '...', this.pages];
			}
		},
		methods: {
			jump: function (no) {
				if (no === '...') return;
				if (isNaN(Number(no)) || Number(no) <= 0 || no > this.pages) 				
					return;
				this.pno = no - 1;
				this.$emit('page', this.pno, this.params.pageSize);
			},
			change: function (no, e) {
				if (e.target.className.indexOf('disable') !== -1) 
					return;
				this.pno = Math.max(0, Math.min(this.pages - 1, this.pno + no));
				this.$emit('page', this.pno, this.params.pageSize);
			},
			pageItemLevel: function (item) {
				if (IX.isNumber(item) && item >= 1000) 
					return Math.floor(Math.log10(item) + 1);
				return 1;
			}
		},
		watch: {
			params: function (newValue) {
				this.pno = newValue.pageNo;
			}
		}
	};
</script>
<style lang="less">
	.np-pagination{
		width: 100%;
		height: 28px;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		.page-items{
			font-size: 0;
			color: #bbb;
			line-height: 28px;
		}
		.go{
			width: 30px;
			&.pbtn{
				width: 48px;
				margin-left: 3px;
			}
		}
		.pbtn {
			font-size: 12px;
			text-align: center;
			display: inline-block;
			height: 28px;
			line-height: 28px;
			border: 1px solid #ccc;
			margin-left: -1px;
			color: #999;
			cursor: pointer;
			&:hover{
				color: #2587f9;
				border: 1px solid #2587f9;
				position: relative;
				z-index: 1;
			}
			&.active{
				background: #2d87f9;
				color: #fff;
				border: 1px solid #2587f9;
				position: relative;
				z-index: 1;
			}
		}
		.previous, .next{
			width: 70px;
			&.disable{
				background: #efefef;
				opacity: 0.8;
				cursor: default;
			}
		}
		.next{
			margin-right: 10px;
		}
		.jump{
			font-size: 12px;
			display: inline-block;
		}
		.page-jump{
			display: inline-block;
			width: 32px;
			height: 28px;
			margin: 0  8px 0 8px;
			vertical-align: top;
			color: #999;
			border: 1px solid #999;
			text-align: center;
			padding: 4px;
			&:focus{
				border: 1px solid #2587f9;
			}
		}
	}
</style>
