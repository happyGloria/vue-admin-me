<template>
	<div class="p1">
		<np-indicator  :value = 'val'
			@input = 'change'
			@slide = 'slide'  />
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npSlideIndicator from '../../components/npSlideIndicator';
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			val: 1
		}
	},
	methods: {
		slide: function (v) {
			this.val = Math.floor(v * 100) / 100;
		},
		change: function (v) {
			this.slide(v);
			console.log('value:', this.val);
		}
	},
	components: {
		'np-indicator': npSlideIndicator
	}
};
</script>

<style lang="less">

</style>
