<template>
  <div class="page-block">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content round">
          <div class="title">动态旋转边框</div>
          <div class="content">
            <div class="ring-outer"></div>
            <div class="ring-inner"></div>
            <div class="avator"></div>
          </div>
        </div>
        <div class="grid-content test">
            <!--  <use :xlink:href="iconName"></use> -->
            <!-- <object :data="svgUrl" width="100" height="100"
                    type="image/svg+xml"
                    codebase="./" /> -->
            <!-- <embed :src="svgUrl" /> -->
            <div class="" @click="clickFn">
              <embed id="svg-icon" :src="svgUrl" width="100" height="100"></embed>
              <!-- <object id="svg-sample" :src="svgUrl" width="100" height="100" x="200" y="400"></object> -->
            </div>

        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <svg width="100%" height="100%" viewBox="-100 -100 200 200" version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- <image x="10" y="20" width="80" height="80" :xlink:href="svgUrl" /> -->
          </svg>
        </div>
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import svgUrl from '@/assets/svg/receive.svg'
  export default {
    data() {
      return {
        svgUrl: svgUrl
      }
    },
    methods: {
      clickFn() {
        alert('123')
      }
    },
    mounted() {
      var svgEl = document.querySelector('#svg-icon')
      console.log('svgEl:', svgEl.getSVGDocument())

      /*  var gEl = svgEl.querySelector('#rJlzdWC1WX_H1lTZRyZm')
      gEl.addEventListener('click', () => {
        alert('123')
      }) */
      /* document.querySelector('#svg-icon').addEventListener('click', () => {
        alert('123')
      }) */
    }
  }
</script>
<style lang="scss">
@import './_mixin.scss';

.round {
  .box, .ring-inner, .ring-outer {
    width: 220px;
    height: 220px;
  }
  .box {
    position: relative;
  }
  .ring-inner,.ring-outer {
    position: absolute;
  }
  .ring-inner {
    background: url('~@/assets/pic/ring-inner.png') no-repeat;
    background-size: 90%;
    background-position: center;
    animation: clockwise 3s linear infinite;
  }
  .ring-outer {
    background: url('~@/assets/pic/ring-outer.png') no-repeat;
    background-size: 100%;
    background-position: center;
    animation: anti-clockwise 3s linear infinite;
  }
  .avator {
    width: 160px;
    height: 160px;
    background: url('~@/assets/pic/92.jpg') no-repeat;
    border-radius: 50%;
    background-size: cover;
  }
}
</style>

