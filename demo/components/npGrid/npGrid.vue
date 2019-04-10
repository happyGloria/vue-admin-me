<template>
<div class="np-grid" :class="clz">
	<div class="np-grid-title" v-if="title">{{title}}</div>
	<div class="np-grid-base">
		<ul class="hdr">
			<li :class="`col-${col.name}`" v-for="(col, index) of colmuns">
				<np-check-box @check="checkFn" :is-selected="rootSelected" name="root" 
					v-if="col.name == '_check'"
				></np-check-box>
				<span v-if="col.name == '_no'">
					<span>{{col.title}}</span>
					<span class="pic-hide"></span>
				</span>
				<span v-else>
					<span>{{col.title}}</span>
					<span class="pic-hide"></span>
				</span>
			</li>
			<li class="col-actions rt" v-if="actions.length">操作</li>
		</ul>
		<div class="b-body">
			<ul class="b-row" v-for="(item, index) of items" :key="item[track]" @click.stop="clickRowFn(item, $event)">
				<li :class="`col-${col.name}`" v-for="col of colmuns">
					<np-check-box :is-selected="selected(item.id)" :name="item.id" 
						@check="checkFn" 
						v-if="col.name == '_check'"
					></np-check-box>
					<span v-if="col.name == '_no'">{{params.pageNo * params.pageSize + (index + 1)}}</span>
					<slot :name="col.name" :item="item" v-if="col.slot"></slot>
					<span :title="item[col.name]" v-else>{{item[col.name]}}</span>
				</li>
				<li class="col-actions rt" v-if="actions.length">
					<a :class="`btn action-${action.name}`" v-for="action of actions" :title="action.title" 
						@click.stop="actionFn(action.name, item)" 
						v-if="!item.actions"
					></a>
					<a :class="`btn action-${action.name}`" v-for="action of item.actions" :title="action.title" 
						@click.stop="actionFn(action.name, item)" v-else
					></a>
				</li>
			</ul>
		</div>
	</div>
	<div class="np-grid-foot">
		<np-pagination :params="params" @page="page"></np-pagination>
	</div>
</div>	
</template>
<script>
/**
 * props: {
 * 	clz: 'my-grid',	//表格class名称
 * 	title: '数据表格',	//表格title	
 * 	params: {
 * 		pageNo: 0,		//当前页数
 * 		pageSize: 20,	//每页个数
 * 		total: 200		//表格数据总数
 * 	},
 * 	track: 'id',			//表格渲染时指定key, 默认为id
 * 	colmuns: [		//表格中列的集合数组
 * 		{
 * 			name: userName,		//此列对应数据中对象中的key值
 * 			title: '用户名',			//用于显示在表格header中的文字
 * 			solt: Boolean			//此列是否使用插槽
 * 		}
 * 	],
 * 	items: [{
 * 		actions: [{name, title}]	//此列单独操作
 * 	}]		//数据		
 * 	actions: [		//统一操作
 * 		{
 * 			name: 'add',
 * 			title: '添加'
 * 		}
 * 	]
 * }
 * events: {
 * 	check: () => {return Array},			//勾选表格复选框，返回选中id数组
 * 	clickRow: () => {return {item}},		//单击表格某一行，返回本行数据
 * 	action: () => {return {name, item}}	//action操作时，返回name及数据
 * 	page: () => {return {pageNo, pageSize}}	//分页选择，返回选择页数
 * }
 *  slot: [	//具名插槽
 *	name: colmun.name  (props : {item})
 * ]
 */
	import npCheckBox from '../npCheckBox';
	import npPagination from '../npPagination';
	import gridMixin from './npGridMixin';

	export default {
		props: {
			clz: { type: String, default: '' },
			title: { type: String, default: '' },
			params: { 
				type: Object, 
				default: function () { 
					return { pageNo: 0, pageSize: 20, total: 0 }; 
				}
			},
			track: { type: String, default: 'id' },
			colmuns: { type: Array, default: () => [] },
			items: { type: Array, default: () => [] },
			actions: { type: Array, default: () => [] }
		},
		mixins: [gridMixin],
		data: function () {
			return {
				rootSelected: false,
				selectArr: []
			};
		},
		methods: {
			selected: function (id) {
				if (this.selectArr.indexOf(id) > -1)
					return true;
				return false;
			},
			checkFn: function (name, value) {
				if (name === 'root') {
					if (value)
						this.selectArr = this.items.map(item => item.id);
					else 
						this.selectArr = [];
				} else if (value) 
					this.selectArr.push(name);
				else 
					this.selectArr.splice(this.selectArr.indexOf(name), 1);
				if (this.selectArr.length !== 0 && this.selectArr.length === this.items.length) 
					this.rootSelected = true;
				else 
					this.rootSelected = false;
				this.check(this.selectArr);
			},
			clickRowFn: function (item, e) {
				const elClass = e.target.className;
				if (elClass.indexOf('col-_check') === -1 && elClass.indexOf('col-actions') === -1)
					this.clickRow(item);
			}
		},
		components: {
			'np-check-box': npCheckBox,
			'np-pagination': npPagination
		},
		watch: {
			items: function () {
				this.rootSelected = false;
				this.selectArr = [];
				this.check(this.selectArr);
			}
		}
	};
</script>
<style lang="less">
	.np-grid{
		.np-grid-title{
			padding-left: 10px;
			height: 50px;
			line-height: 50px;
			text-align: left;
			font-weight: bold;
			background: #98b7ef;
		}
		.np-grid-base{
			text-align: left;
			ul.hdr{
				position: relative;
				background: rgba(0, 0, 0, 0.2);
				border: 1px solid transparent;
				span{
					color: #fff;
					font-weight: bold;
				}
			}
			[class^="col-"] {
				display: inline-block;
				text-align: left;
				vertical-align: middle;
				min-width: 56px;
				line-height: 34px;
				height: 34px;
				padding: 0px 8px;
				white-space:nowrap; 
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.col-_check{
				line-height: 34px;
				min-width: 20px;
			}
			.col-actions{
				line-height: 34px;
				text-align: center;
				padding: 0 10px;
				color: #fff;
				font-weight: bold;
				&.rt{
					float: right;
				}
			}
			.b-body{
				overflow-x: hidden;
				.b-row:nth-child(even) {
					background: rgba(0, 0, 0, 0.06);
				}
				.b-row{
					transition: opacity 0.7s, border 0.05s, background 0.05s;
					border: 1px solid transparent;
					&:after{
						content: "";
						clear: both;
					}
					&:hover{
						background: rgba(0, 226, 255, 0.2);
						border: 1px solid #12c5df;
						cursor: pointer;
						.col-actions{
							display: block;
						}
					}
				}
				.col-actions{
					display: none;
					line-height: 29px;
					.btn{
						width: 24px;
						height: 24px;
						margin: 4px 10px 0 0;
						position: relative;
						background: #fff;
						border-radius: 3px;
						&:hover{
							background-color: #3eb6e3;
						}
					}
				}
			}
		}
		.np-grid-foot{
			margin-top: 15px;
			text-align: center;
			height: 28px;
		}
	}
</style>
