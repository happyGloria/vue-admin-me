<template>
	<div class="p1">
		<div class="test-box">
			<np-slider :label='"时"' :max='23' v-model='vHour' :disabled = 'true'/>
			<np-slider :label='"分"' :max='59' v-model='vMin' />
			<np-slider :label='"秒"' :max='59' v-model='vSec' />
		</div>	
		<div> current Time : {{ curTime }}</div>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */
import npSlider from '../../components/npSimpleSlider';

export default {
	name: 'samplePage',
	data: function () {
		return {
			vHour: 23,
			vMin: 0,
			vSec: 32
		};
	},
	computed: {
		curTime: function () {
			return [this.vHour, this.vMin, this.vSec].join(':');
		}
	},
	components: {
		'np-slider': npSlider
	}
};
</script>

<style lang="less">
.test-box{
	width:400px; height:400px;
	background-color: white;
}
</style>
