<template>
  <div class="page-comp-1">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content"></div>
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
    data() {
      return {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/utils/mixins.scss";
  .page-comp-1 {
    width: 100%;
    height: 100%;
    background-color: #12243A;

    .el-row {
      height: 100%;
      padding: 10px;
    }
    .el-col {
      border-radius: 3px;
      height: 100%;
      .grid-content {
        height: 50%;
        border-radius: 3px;
        background-color: pink;
        background-color: rgba(30, 82, 120, 0.3);
        box-shadow:0 0 3px 1px rgba(130, 164, 197, 0.3) inset;
      }
      &>.grid-content:nth-of-type(1) {
        height: 48%;
        margin-bottom: 2%;
      }
    }
  }
</style>
