<template>
	<div class="p1">
		<np-pagination :params="params" @page="page"></np-pagination>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npPagination from '../../components/npPagination';
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			params: {
				pageNo: 0,
				pageSize: 20,
				total: 300
			}
		}
	},
	methods: {
		page(pageNo, pageSize) {
			console.log('page', pageNo, pageSize);
		}
	},
	components: {
		'np-pagination': npPagination
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
