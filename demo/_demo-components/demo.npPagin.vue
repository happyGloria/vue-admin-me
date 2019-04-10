<template>
	<div class="grid-demo">
		<div class="wraper">
			<np-pagin
				:totalPages="totalPages"
				v-model="curNo"
			></np-pagin>
		</div>
	</div>
</template>
<script>
import npPagin from "../../components/npPagin.vue";
export default{
	data() {
		return {
			totalPages : 20,
			curNo : 0
		}
	},
	watch : {
		curNo(){
			console.log("改变后的pageNo:",this.curNo);
		}
	},
	methods:{

	},
	components: {npPagin}
}
</script>
<style lang="less">
.grid-demo{
	height:100%;
	.wraper{
		width:100%;height:100%;
		border: 1px solid rgba(21,63,94,.8);
	}
}
</style>