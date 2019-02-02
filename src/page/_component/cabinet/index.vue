<template>
  <div class="page-comp-2">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <cab class="cube-item" />
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cab from './cab.vue'
export default {
  components: {
    cab
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.page-comp-2 {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~@assets/bg/bg2.png) no-repeat;
  background-size: cover;
  .cube-item {
    position: absolute;
    left: 200px;
    top: 20px;
  }
}
</style>

