<template>
  <div class="page-comp-2">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <cube class="cube-item"></cube>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cube from './cube.vue'
export default {
  components: {
    cube
  },
  data() {
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
  .cube-item {
    position: absolute;
    left: 200px;
  }
}
</style>

