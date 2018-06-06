<template>
  <el-form label-position="left" inline class="table-expand">
    <el-form-item v-for="(item, key) in info" :key="key" :label='key'>
      <span>{{ item }}</span>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    props: {
      info: Object
    },
    mounted() {
      console.log('this.info: ', this.info)
    }
  }
</script>
<style lang="less">
  .table-expand{
    padding: 0 10px;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>

