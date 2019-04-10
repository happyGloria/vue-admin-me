<template>
	<div class="p1">
		<div class="test-box">
			<np-combo :npclass = '"year-combo"' :unitTxt='"年"' :options='years' v-model='vYear' :disabled = 'true'/>
			<np-combo :unitTxt='"月"' :options='months' v-model='vMonth' />
			<np-combo :unitTxt='"日"' :options='days' v-model='vDay' />
		</div>	
		<div> current Day : {{ curDay }}</div>
	</div>
</template>

<script>
/** Comments for Common Page Sample
	......
 */
import npCombo from '../../components/npCombo';

/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {

			years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
			months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
			days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],

			vYear: '2017',
			vMonth: '03',
			vDay: '5'
		};
	},
	computed: {
		curDay: function () {
			return [this.vYear, this.vMonth, this.vDay].join('-');
		}
	},
	components: {
		'np-combo' : npCombo
	}
};
</script>

<style lang="less">
.test-box{
	width:400px; height:100px;padding:10px;
	background-color: white;

	.np-combo {display:inline-block;margin-left:5px;}
	.year-combo {width:60px;margin-left:0;}
}
</style>
