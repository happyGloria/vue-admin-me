<template>
  <div class="page-block page-d3-chart">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="module grid-content"></div>
        <div class="grid-content"></div>
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
  data () {
    return {}
  }
}
</script>
<style lang="scss">
.page-d3-chart {
  background: url(~@assets/bg/bg.jpg) no-repeat;
  background-size: cover;

  .grid-content {
    .title {
      height: 40px;
      top: 0;
      left: 1px;
      right: 1px;
      position: absolute;
      line-height: 40px;
      padding-left: 10px;
      color: #00c6ff;
      font-family: "\5B8B\4F53";
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid #030b11;
    }
  }
}
</style>

