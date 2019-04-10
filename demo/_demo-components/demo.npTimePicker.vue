<template>
	<div class="p1">
		<np-time-picker v-model='time0' />
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */
import npTimePicker from '../../components/npTimePicker';

/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			time0: "02:31:37"
		};
	},
	watch: {
		time0 : function(v){
			console.log("accept:", v);
		}
	},
	components: {
		'np-time-picker': npTimePicker
	}
};
</script>
