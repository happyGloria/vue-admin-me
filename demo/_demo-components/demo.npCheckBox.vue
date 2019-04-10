<template>
	<div class="p1">
		<np-check-box text="摄像机" name="camera" @check="check"></np-check-box>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npCheckBox from '../../components/npCheckBox';
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {}
	},
	methods: {
		check(name, value) {
			console.log('check', name, value);
		}
	},
	components: {
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
