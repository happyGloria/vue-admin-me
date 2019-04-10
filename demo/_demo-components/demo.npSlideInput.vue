<template>
	<div class="p1">
		<np-slide-input :min = "0" :max = "90" v-model = 'angle'
				:valueFormat = '"f.2"' :title = '"任意旋转"' 
				:unitLabel = '"度"' >
			<span>AAA</span>
		</np-slide-input>
	</div>
</template>

<script>
import npSlideInput from '../../components/npSlideInput';

/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {angle : 0}
	},
	components: {
		'np-slide-input': npSlideInput
	}
};
</script>

<style lang="less">
.p1 {display:block; width:270px; padding:20px; background: #f6f6f6;}
</style>
