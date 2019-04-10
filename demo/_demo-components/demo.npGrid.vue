<template>
	<div class="p1">
		<np-grid :params="params" :colmuns="colmuns" :items="items" :actions="actions" title="表格"
			@action="action"
			@clickRow="clickRow"
			@check="check"
			@page="page"
		>
			<template slot="type" scope="props">
				<np-check-box :text="props.item['type']"></np-check-box>
			</template>
			<template slot="detail" scope="props">
				<span :title="props.item['detail']+2">{{props.item['detail']+2}}</span>
			</template>
		</np-grid>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npGrid from '../../components/npGrid/npGrid';
import npCheckBox from '../../components/npCheckBox';
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			colmuns: [
				{ name: '_check' },
				{ name: '_no', title: '序号' },
				{ name: 'name', title: '名称' },
				{ name: 'type', title: '类型', slot: true },
				{ name: 'detail', title: '详细内容', slot: true }
			],
			params: { pageNo: 0, pageSize: 20, total: 300 },
			items: IX.map('0'.multi(20).split(''), function (item, idx) {
				return {
					id: idx + 1,
					name: '名称' + idx,
					type: '摄像机',
					detail: '内容'
				};
			}),
			actions: [{
				name: 'edit',
				title: '修改'
			}, {
				name: 'delete',
				title: '删除'
			}]
		};
	},
	methods: {
		action(name, item) {
			console.log('action', name, item);
		},
		clickRow(item) {
			console.log('clickRow', item);
		},
		check(arr) {
			console.log('check', arr);
		},
		page (no, size) {
			console.log('page', no, size);
		}
	},
	components: {
		'np-grid': npGrid,
		'np-check-box': npCheckBox
	}
};
</script>

<style lang="less">
@import '../../less/ixwpre.less';
.p1{
	width: 1600px;
	margin: 0 auto;
	.col-name, .col-type{
		width: 100px;
	}
}
</style>
