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
        <div class="grid-content test"></div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content"></div>
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
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss">
@import './_mixin.scss';
@import '~@/styles/animate.scss';

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

