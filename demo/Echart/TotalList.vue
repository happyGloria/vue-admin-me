<template>
  <div class="total-list">
    <div class="total-item" v-for="item in dataSet" :key="item.name">
      <span>
        <count-to class="card-panel-num"
          :start-val="0" 
          :end-val="Number(item.cur)" 
          :duration="3000" 
          :decimals="item.name == 'faultRate' ? 2 : 0"/>
        <i v-if="item.name == 'faultRate'">%</i>
      </span>
      <span>{{item.text}}</span>
      <i :class="`icon icon-index-${item.name}`"></i>
    </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    dataSet: Array
  }
}
</script>

<style lang="less">
@import "~@/less/mixin.less";
@import (less) "~static/img/sprite.css";

.total-list {
  .total-item {
    position: relative;
    height: 23%;
    margin-bottom: 10px;
    background-color: #eee;
    border-radius: 5px;
    color: #fff;
    padding: 10px 0 0 30px;
    & > span {
      display: block;
    }
    span:nth-of-type(1) {
      font-size: 40px;
      font-weight: 600;
      height: 50px;
      line-height: 50px;
    }
    span:nth-of-type(2) {
      font-size: 20px;
      line-height: 28px;
    }
    .icon {
      position: absolute;
      right: 40px;
      top: 16px;
      font-size: 60px;
    }
  }
  .total-item:last-child {
    margin-bottom: 0;
  }
  .total-item:nth-of-type(1) {
    background: linear-gradient(130deg, #f7b34d, #fcc967, #ffd878);
  }
  .total-item:nth-of-type(2) {
    background: linear-gradient(130deg, #98d25c, #a0d26e, #a7d279);
  }
  .total-item:nth-of-type(3) {
    background: linear-gradient(130deg, #fa7255, #f88c73, #f89f8a);
  }
  .total-item:nth-of-type(4) {
    background: linear-gradient(130deg, #1499f5, #45b5f8, #7dd6fb);
  }
}
</style>

