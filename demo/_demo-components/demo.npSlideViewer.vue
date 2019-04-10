<template>
	<div class="p1">
		<np-slide-viewer :images="images" @click="clickImage" @delete="removeImage" />
	</div>
</template>

<script>
import npSlideViewer from '../../components/npSlideViewer';

var Images = [];
for (var i=1; i<=13; i++)
	Images.push({
		id: i, url:  '/static/images/cars/' + i + '.jpg',

		width: (i==3 || i==8 || i==11 || i==12) ? 1600 : 1616, 
		height:(i==2 || i==5 || i==11 || i==12) ? 1328 : (i==8?1232:(i==10?1292:1280))
	 });
/* eslint-disable */
export default {
	name: 'samplePage',
	data: function () {
		return {
			images: IX.map(Images, function(img){ return IX.inherit(img); })
		}
	},
	methods: {
		clickImage: function(imgId){
			console.log("click on image:", imgId);
		},
		removeImage: function(imgId){
			console.log("delete image:", imgId);
			this.images = IX.Array.remove(this.images, imgId, function(id, img){
				return img.id == id;
			});
		}
	},
	components: {
		'np-slide-viewer': npSlideViewer
	}
};
</script>

<style lang="less">
@import '../../less/ixwpre.less';
.p1{
	.np-slide-viewer {width:800px;}
}
</style>
