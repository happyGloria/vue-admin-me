<template>
  <div class="page-block">
    <div id="test" style="width:1px;height:17px;background:#0f0;" ref="test">0%</div>
    <input type="button" value="Run" id="run" @click="runFn"/>
  </div>
</template>

<script>
import url from '@/assets/img/bird.jpg'
export default {
  components: {

  },
  data() {
    return {
      url: url
    }
  },
  methods: {
    runFn() {
      var ele = this.$refs.test
      var progress = 0
      function step(timestamp) {
        progress += 1
        ele.style.width = progress + '%'
        ele.innerHTML = progress + '%'
        if (progress < 100) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
