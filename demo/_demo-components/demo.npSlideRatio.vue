<template>
	<div class="p1">
		<np-slide-ratio v-model="imgRatio" />
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */

import npSlideRatio from '../../components/npSlideRatio';
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {imgRatio: 1}
	},
	methods: {
		check(name, value) {
			console.log('check', name, value);
		}
	},
	components: {
		'np-slide-ratio': npSlideRatio
	}
};
</script>

<style lang="less">
.p1 {display:block; width:270px; padding:20px; background: #f6f6f6;}
</style>
