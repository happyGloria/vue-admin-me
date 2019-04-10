<template>
  <div class="pie-list" :style="{top: `${top}px`}">
    <div class="pie-item" 
      v-for="(item, idx) in showDataList" :key="idx"
      :style="{height: `${perHeight}%`}">
      <!-- <div class="stat-title">{{item.name}}</div>
      <div class="stat-main">
        <div class="pie-wrapper">
          <echart-pie ref="pieChart" :setting="pieSetting" :pieData="item" @pieClick="pieClickFn"></echart-pie>
          <div class="clip-center"></div>
          <div class="center">
            <count-to :start-val="0" :end-val="Number(item.total)" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </div>
      <el-row class="stat-foot">
        <el-col :span="12" class="legend">
            <span class="dia"></span>
            <span>正常：{{item.normal}}</span>
        </el-col>
        <el-col :span="12" class="legend">
            <span class="dia"></span>
            <span>异常：{{item.fault}}</span>
        </el-col>
      </el-row> -->
    </div>
    <div class="btn-more" @click="moreFn" v-if="isShowBtn">
      <i class="icon" :class="`icon-${openedFlag ? 'less' : 'more'}`"></i>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import EchartPie from '@/comp/Echart/Pie.vue'
import EventListener from '@/util/eventListener.js'
import d3Pie from '@/comp/d3/Pie.vue'
export default {
  components: {
    CountTo,
    EchartPie,
    d3Pie
  },
  props: {
    dataList: Array
  },
  data() {
    return {
      pieSetting: {},
      openedFlag: false,
      perHeight: 50,
      perCols: 5,
      defaultLen: 10
    }
  },
  computed: {
    top() {
      return this.openedFlag ? -5 : 455
    },
    isShowBtn() {
      return !this.$parent.pieLoading
    },
    showDataList: {
      get() {
        if (!this.openedFlag) {
          if (this.dataList.length < this.defaultLen) {
            return this.dataList
          }
          let newArr = []
          for (var i = 0; i < this.defaultLen; i++) {
              let item = this.dataList[i]
              newArr.push(item)
          }
          return newArr
        }
        return this.dataList
      },
      set(val) {
        this.showDataList = val
      }
    }
  },
  watch: {
    $route(val) {
      if (this.$route.name !== 'site-line') {
        this.clearTimer()
      }
      this.openedFlag = !1
    },
    dataList(newVal) {
      if (this.$refs.pieChart) {
        this.$refs.pieChart.forEach(item => {
          item.setData()
        })
      }
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) clearInterval(this.timer)
    },
    pieClickFn(val) {
      console.log('pieData:', val)
    },
    moreFn() {
      this.openedFlag = !this.openedFlag
      var len = this.showDataList.length
      this.perHeight = Math.floor(100 / Math.ceil(len / this.perCols)) - 2
    },
    init() {
      if (document.body.clientHeight <= 768) {
        this.perHeight = 90
        this.defaultLen = 5
      } else {
        this.perHeight = 46
        this.defaultLen = 10
      }
    }
  },
  mounted() {
    this.init()
    EventListener.listen(window, 'resize', (e) => this.init())
  }
}
</script>

<style lang="less">

@import "~@/less/mixin.less";
@import (less) "~static/img/sprite.css";

.pie-list {
  position: absolute;
  left: 0;
  right: 0px;
  bottom: 20px;
  transition: all 500ms ease-in;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  z-index: 1000;
  margin: 0 -10px;
  .pie-item {
    width: calc(~"20% - 20px");
    /* height: calc(~"50% - 20px"); */
    border-radius: 5px;
    margin: 0 10px 20px 10px;
    box-shadow: 0 0 15px rgba(212, 212, 212, 1);
    .stat-title {
      height: 30px;
      line-height: 30px;
      color: rgb(102,102,102);
      text-indent: 20px;
    }
    .stat-main {
      height: calc(~"100% - 60px");
      .x-y-center-parent();
      .pie-wrapper {
        width: 120px;
        height: 120px;
        position: relative;
        .x-y-center-parent();
        .clip-center {
          position: absolute;
          width: calc(~"75% + 6px");
          height: calc(~"75% + 6px");
          border-radius: 50%;
          background-color: rgba(255,255,255,1);
        }
        .center {
          position: absolute;
          width: 78px;
          height: 78px;
          line-height: 78px;
          border-radius: 50%;
          text-align: center;
          color: rgb(17,30,55);
          font-size: 26px;
          box-shadow: 0 0 10px rgba(212, 212, 212, 0.8);
        }
      }
    }
    .stat-foot {
      height: 30px;
      line-height: 30px;
      text-align: center;
      .legend{
        text-align: center;
        .dia {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 4px solid #ccc;
          vertical-align: middle;
          margin-right: 10px;
        }
        span:ntn-of-type(2) {
          color: rgb(102, 102, 102);
          font-size: 16px;
        }
      }
      .legend:nth-of-type(1) .dia {
        border-color: rgb(35,177,254);
      }
      .legend:nth-of-type(2) .dia {
        border-color: rgb(254,86,96);
      }
    }
  }
  .btn-more {
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform:translate(-50%, 0);
    cursor: pointer;
    .icon {
      font-size: 36px;
      color: rgb(219,219,222);
    }
  }
}
</style>
