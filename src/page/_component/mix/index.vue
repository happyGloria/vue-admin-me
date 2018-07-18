<template>
  <div class="page-comp-1">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content">
          <cube 
            :cubeData="cubeData" 
            :translates="translates"
            :viewBox="cubeViewBox"></cube>
        </div>
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
  import cube from './cube/index.vue'
  export default {
    components: {
      cube
    },
    data() {
      return {
        cubeData: [
          { value: 7, color: '#da8d1b', title: '正常' },
          { value: 3, color: '#39d2a1', title: '故障' },
          { value: 5, color: '#da8d1b', title: '正常' },
          { value: 7, color: '#39d2a1', title: '故障' }
        ],
        translates: [
          'translate(10, 0)',
          'translate(70, 0)',
          'translate(170, 0)',
          'translate(230, 0)'
        ],
        cubeViewBox: '0, 0, 310, 265'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/utils/mixins.scss";
  .page-comp-1 {
    width: 100%;
    height: 100%;

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
        box-shadow: 0 0 3px 1px rgba(130, 164, 197, 0.3) inset;
      }
      & > .grid-content:nth-of-type(1) {
        height: 48%;
        margin-bottom: 2%;
      }
    }
  }
</style>

