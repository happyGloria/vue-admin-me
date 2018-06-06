<template>
	<div v-if="itemObj.hasData" @mouseover="showOption(true)" @mouseleave="showOption(false)">
		<div class="icon-rack-frontEl" v-show="front">
			<div class="column0" >
				<div :class="{
					'element-available': (item.level == 0),
					'element-inavailable': (item.level != 0)
				}" v-for="(item, index) of columnFaultList(0)">
					<div class="icon-rack-element"></div>
				</div>
			</div>
			<div class="column1" >
				<div :class="{
					'element-available': (item.level == 0),
					'element-inavailable': (item.level != 0)
				}" v-for="(item, index) of columnFaultList(1)">
					<div class="icon-rack-element"></div>
				</div>
			</div>
			<div class="column2" >
				<div :class="{
					'element-available': (item.level == 0),
					'element-inavailable': (item.level != 0)
				}" v-for="(item, index) of columnFaultList(2)">
					<div class="icon-rack-element"></div>
				</div>
			</div>
			<div class="column3" >
				<div :class="{
					'element-available': (item.level == 0),
					'element-inavailable': (item.level != 0)
				}" v-for="(item, index) of columnFaultList(3)">
					<div class="icon-rack-element"></div>
				</div>
			</div>
			<div class="icon-rack-element-mask" v-show="isMask">
				<span :class="{
					'icon-rack-edit': !editHover,
					'icon-rack-edit-hover': editHover
				}" @click="clickEdit('edit')" @mouseover="editHover=true" @mouseleave="editHover=false" :style="{left: '45px'}"></span>
				<span :class="{
					'icon-rack-delete': !deleteHover,
					'icon-rack-delete-hover': deleteHover
				}" @click="clickEdit('deleteDevice')" @mouseover="deleteHover=true" @mouseleave="deleteHover=false" :style="{left: '100px'}"></span>
			</div>
		</div>
		<div :class="{'icon-rack-backEl':itemObj.type==36,
			'icon-rack-elementBack': itemObj.type==24}" v-show="!front">
			<div v-show="itemObj.type==36">
				<div class="column0">
					<div :class="{
						'element-available': (item.level == 0),
						'element-inavailable': (item.level != 0)
					}" v-for="(item, index) of columnFaultList(0)">
						<div class="icon-rack-element"></div>
					</div>
				</div>
				<div class="column1">
					<div :class="{
						'element-available': (item.level == 0),
						'element-inavailable': (item.level != 0)
					}" v-for="(item, index) of columnFaultList(1)">
						<div class="icon-rack-element"></div>
					</div>
				</div>
				<div class="column2">
					<div :class="{
						'element-available': (item.level == 0),
						'element-inavailable': (item.level != 0)
					}" v-for="(item, index) of columnFaultList(2)">
						<div class="icon-rack-element"></div>
					</div>
				</div>
				<div class="column3">
					<div :class="{
						'element-available': (item.level == 0),
						'element-inavailable': (item.level != 0)
					}" v-for="(item, index) of columnFaultList(3)">
						<div class="icon-rack-element"></div>
					</div>
				</div>
			</div>
			<div class="icon-rack-element-mask" v-show="isMask">
				<span :class="{
					'icon-rack-edit': !editHover,
					'icon-rack-edit-hover': editHover
				}" @click="clickEdit('edit')" @mouseover="editHover=true" @mouseleave="editHover=false" :style="{left: '45px'}"></span>
				<span :class="{
					'icon-rack-delete': !deleteHover,
					'icon-rack-delete-hover': deleteHover
				}" @click="clickEdit('deleteDevice')" @mouseover="deleteHover=true" @mouseleave="deleteHover=false" :style="{left: '100px'}"></span>
			</div>
		</div>
	</div>
	<div v-else @click="clickEdit('add')" @mouseover="showOption(true, true)" @mouseleave="showOption(false, true)">
		<div class="rack-blank" v-show="isMask&&editPage"></div>
	</div>
</template>
<script>
export default {
  props: {
    editPage: Boolean,
    front: Boolean,
    itemObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      editHover: false,
      deleteHover: false,
      isMask: false,
      isDetail: false
    }
  },
  methods: {
    showOption(bShow, empty) {
      // 获取元素的纵坐标
      function getTop(e) {
        var offset = e.offsetTop
        if (e.offsetParent != null) { offset += getTop(e.offsetParent) }
        return offset
      }
      // 获取元素的横坐标
      function getLeft(e) {
        var offset = e.offsetLeft
        if (e.offsetParent != null) { offset += getLeft(e.offsetParent) }
        return offset
      }
      // 显示空element mask
      if (!_.isUndefined(empty) && empty) {
        this.isMask = bShow
      } else {
        // 显示详情、操作
        if (this.editPage) {
          this.isMask = bShow
        } else {
          this.isDetail = bShow
          this.$emit('onShowElementDetail', this.isDetail, { offsetLeft: getLeft(this.$el), offsetTop: getTop(this.$el), type: this.itemObj.type, rackId: this.itemObj.rackId, id: this.itemObj.id })
        }
      }
    },
    findFault(id) {
      for (let i = 0; i < this.itemObj.faultList.length; i++) {
        if (this.itemObj.faultList[i].id == id) {
          return true
        }
      }
      return false
    },
    columnFaultList(col) {
      let colItems = []
      if (this.front) {
        for (let i = 5; i >= 0; i--) {
          let id = '8:' + (6 * col + i)
          colItems.push({ id: id, level: this.findFault(id) ? 1 : 0 })
        }
      } else {
        for (let i = 2; i >= 0; i--) {
          let id = '9:' + (3 * col + i)
          colItems.push({ id: id, level: this.findFault(id) ? 1 : 0 })
        }
      }

      return colItems
    },
    clickEdit(type) {
      if (this.editPage && this.isMask) {
        this.$emit('onEditOneElement', type, { rackId: this.itemObj.rackId, id: this.itemObj.id })
      }
    }
  },
  computed: {
    showBackElement() {
      return (this.itemObj.type == 36) && !this.itemObj.front
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">

	[class^="icon-"] {
		position: relative;
		vertical-align: top;
	}

	.icon-rack-frontEl, .icon-rack-backEl, .icon-rack-elementBack{
		position: relative;
		display: inline-block;
		width: 179px;
		height: 69px;

		[class^='column'] {
			position: absolute;
			vertical-align: top;
			display: inline-block;
			&>* {
				width: 40px;
				height: 10px;
				margin-top: 1px;
			}
			.element-available {
				background-color: #00FFFF;
			}
			.element-inavailable {
				background-color: red;
				-webkit-animation: twinkling 1.5s infinite 0.6s ease-in-out alternate;
				animation: twinkling 1.5s infinite 0.6s ease-in-out alternate;
			}
		}
		.column0 {
			left: 5px;
		}
		.column1 {
			left: 47px;
		}
		.column2 {
			left: 90px;
		}
		.column3 {
			left: 134px;
		}
	}

	.icon-rack-frontEl {
		top: 1px;
		[class^='column'] {
			top: 1px;
		}
	}

	.icon-rack-backEl, .icon-rack-elementBack {
		top: 1px;
		[class^='column'] {
			top: 34px;
		}
	}

	.icon-rack-element-mask {
		position: absolute;
		left: -10px;
		right: -10px;
		height: 69px;
		box-shadow: 0 0 10px #16bbff;
		border: 1px solid #27b0ff;
		background-color: rgba(0, 21, 50, 0.8);
		[class^='icon-rack-'] {
			top: 23px;
		}
	}

	.rack-blank {
		width: 199px;
		margin-left: -10px;
		height:69px;
		box-shadow: 0 0 10px #16bbff;
		border: 1px solid #27b0ff;
		background-color: rgba(6, 188, 255, 0.1);
	}

	@-webkit-keyframes twinkling {
		100%{ background-color: #440000; }
		0%{ background-color: #ff0000; }
	}
	@keyframes twinkling {
		100%{ background-color: #440000; }
		0%{ background-color: #ff0000; }
	}

</style>
