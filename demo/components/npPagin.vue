<template>
<div class="np-pagin" v-if="totalPages>1">
	<div class="page-items">
		<a v-for="item in items" class="page-btn" :class="item.clz" 
				@click="changePageNo(item.key)">{{item.text}}</a>
	</div>
	<div class="go">
		<span>到第</span><input type="text" @keyup.enter="jump($event)" v-model="handInput"><span>页</span>
		<a class="page-btn jump-btn" @click="jump($event)">跳转</a>
	</div>
</div>
</template>
<script>
function getArrowData(arrow, ifDisable) {
	return {
		clz : (ifDisable? " disabled" : ""),
		key : arrow,
		text : arrow == 'prev' ? '< 上一页' : '下一页 >'
	}
}
function getNumData(idx, ifActive) {
	return {
		clz : (ifActive? "actived" : ""),
		key : idx,
		text : idx
	}
}
function getDotted() {
	return {
		clz : "dotted",
		key : "dotted",
		text : "..."
	}
}
function getPageTpl(totalPages,curNo){
    var arr = [];
    var curIdx = curNo + 1, 
    	isFirst = curIdx == 1, isLast = curIdx == totalPages;
	arr.push(getArrowData("prev", isFirst));	//上一页
	arr.push(getNumData(1, isFirst));	//第一页
	if (totalPages <= 7){
		for (var i=2; i<totalPages; i++)
			arr.push(getNumData(i, i==curIdx));
	}else{
		if(curIdx<5){
			for(var i=2;i<=6;i++){
				arr.push(getNumData(i, i==curIdx));
			}
			arr.push(getDotted());
		}else if(curIdx >= totalPages-3){
			arr.push(getDotted());
			for(var i=totalPages-5;i<totalPages;i++){
				arr.push(getNumData(i, i==curIdx));
			}
		}else{
			arr.push(getDotted());
			for(var i=curIdx-2;i<=curIdx+2;i++){
				arr.push(getNumData(i, i==curIdx));
			}
			arr.push(getDotted());
		}
	}
	arr.push(getNumData(totalPages, isLast));	//最后一页
	arr.push(getArrowData("next", isLast));		//下一页
	return arr;
}


export default {
	props: {
		totalPages : { type: Number, default: 0 },
		value : { type: Number, default: 0 }
	},
	data () {
		return {
			handInput : this.value+1,
			curPageNo : ''
		};
	},
	computed: {
		items () {
	    	return  getPageTpl(this.totalPages,this.value);
		}
	},
	methods: {
		jump(ev){
			if(!ev.target.value){
				this.changePageNo(this.handInput);
			}else{
				this.changePageNo(Number(ev.target.value));
			}
		},
		changePageNo (pageValue) {
			var pageNo = pageValue;
			if (pageValue == "next" || pageValue == "prev")
				pageNo = this.value - (pageValue == "next"? -1 : 1);
			else if(isNaN(Number(pageValue)) || Number(pageValue) <= 0 || pageValue > this.totalPages)
				return;
			else
				pageNo = pageValue-1;
			if(pageNo < 0)
				pageNo = 0;
			else if(pageNo >= this.totalPages-1)
				pageNo = this.totalPages-1;
			this.handInput = pageNo+1;
			if(this.curPageNo != pageNo){
				this.$emit('input',pageNo);
				this.curPageNo = pageNo;
			}
		}
	}
}
</script>
<style lang="less">
.np-pagin{
	&>div{display:inline-block;}margin:20px 20px;
	font-size:12px;font-family: Arial;color:#989898;
	.page-items{margin-right:20px;}
	.page-btn{
		display: inline-block;height:28px;line-height:28px;padding:0 8px;
		border: 1px solid #ccc;margin-left:-1px;
		color:#989898;text-align: center;cursor:default;
	}
	.page-btn:hover{
		border: 1px solid #2d87f9;color:#2d87f9;position: relative;z-index: 1;
	}
	.actived{background: #2d87f9;border: 1px solid #2d87f9;color:#fff;}
	.actived:hover{color:#fff;}
	.disabled,.disabled:hover{background-color: #f2f2f2;border:1px solid #e0e0e0;color:#c5c5c5;cursor: not-allowed;} 
	.dotted,.dotted:hover{border:none;color:#ccc;cursor: not-allowed;}
	input{
		width:35px;height:28px;padding:0 2px;margin:0 10px 0 8px;
		border: 1px solid #ccc;text-align:center;margin-top:-2px;
	}
	.jump-btn{
		padding:0 10px;margin-left:10px;color:#999;
	}	
}
</style>