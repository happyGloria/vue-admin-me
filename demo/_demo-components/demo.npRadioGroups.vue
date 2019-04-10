<template>
	<div class="p1">
		<np-radio-groups :options = 'options' v-model="selectedOption" />
		<span>Option: {{selectedOption}}</span>
	</div>
</template>

<script>
import npRadioGroups from '../../components/npRadioGroups';

var Options = [
	{ name: "replace-odd", text: "替代奇数行" },
	{ name: "replace-even", text: "替代偶数行" },
	{ name: "remove-odd", text: "移除奇数行" },
	{ name: "remove-even", text: "移除偶数行" }
];

export default {
	name: 'samplePage',
	data: function () {
		return {
			selectedOption : "",
			options: [].concat(Options)
		}
	},
	components: {
		'np-radio-groups': npRadioGroups
	}
};
</script>

<style lang="less">

</style>
