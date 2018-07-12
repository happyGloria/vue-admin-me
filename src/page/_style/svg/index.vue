<template>
  <div class="page-block">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content demo-svg-1">
          <div class="title">viewport宽高比 == viewBox</div>
          <div class="content">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- ... --> 
              <svg viewBox="0 0 315 385" preserveAspectRatio="xMidYMid meet"> 
                <!-- the chicken illustration --> 
                <g id="chicken"> 
                  <!-- ... --> 
                </g> 
                <!-- path forming the lower shell --> 
                <path id="lower-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d=""/> 
              </svg> 
              <svg id="upper-shell" viewBox="0 0 315 385" preserveAspectRatio="xMidYMin meet"> 
                <!-- path forming the upper shell --> 
                <path id="the-upper-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d=""/> 
              </svg>
            </svg>
          </div>
        </div>
        <div class="grid-content demo-svg-2">
          <div class="title"></div>
          <div class="content">
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content demo-svg-3">
          <div class="title"></div>
          <div class="content"></div>
        </div>
        <div class="grid-content demo-svg-4">
          <div class="title"></div>
          <div class="content"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content demo-svg-5">
          <div class="title"></div>
          <div class="content"></div>
        </div>
        <div class="grid-content demo-svg-6">
          <div class="title"></div>
          <div class="content"></div>
        </div>
      </el-col>
    </el-row>
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
