<template>
	<div class="p1">
		<np-checkbox :value='locked' :text = '"锁定裁剪比例"' @input = 'doLock' />
	</div>
</template>

<script>
import npCheckbox from '../../components/npCheckbox0';

/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			locked: false,
		}
	},
	methods: {
		doLock: function (v) {
			this.locked = v;
			//....
		},
	},
	components: {
		'np-checkbox': npCheckbox
	}
};
</script>

<style lang="less">
</style>
