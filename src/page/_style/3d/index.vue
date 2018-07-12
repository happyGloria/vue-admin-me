<template>
  <div class="page-block">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content demo-3d-1">
          <div class="title">3d立方体-产品广告展示</div>
          <div class="content">
            <div class="tips" style="display: none">
              1. 前面显示产品图片，底部显示产品信息；
              2. 默认情况下，产品信息隐藏起来；
              3. 产品悬浮在图片上时，隐藏在底部的产品信息，在x轴-90deg和z轴旋转，底部信息现在与正面；

              常见的3D旋转结构
              舞台=>div.wrapper     (设置3D视点，perspective, 旨在设置用户有画布的视距)
                容器=>div.item      (包裹图片和产品信息，鼠标悬浮该容器，会沿X轴旋转)
                  产品图片＝>img 
                  产品信息=>span.info
            </div>
            <div class="wrapper">
              <div class="item">
                <img :src="contactUrl" alt="contact">
                <span class="info">
                  产品信息
                </span>
              </div>
            </div>

          </div>
        </div>
        <div class="grid-content demo-3d-2">
          <div class="title">三个面,制作3D立方体</div>
          <div class="content">
            <div class="stage">
              <div class="container">
                <div class="face top">1</div>
                <div class="face left">2</div>
                <div class="face right">3</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content demo-3d-3">
          <div class="title">六个面,制作3D立方体</div>
          <div class="stage">
            <div class="container">
              <div class="face front">1</div>
              <div class="face back">2</div>
              <div class="face left">3</div>
              <div class="face right">4</div>
              <div class="face top">5</div>
              <div class="face bottom">6</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import contactUrl from '@/assets/img/contact.png'
export default {
  components: {

  },
  data() {
    return {
      contactUrl: contactUrl
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.demo-3d-1 {
  .wrapper {
    display: inline-block;
    width: 310px;
    height: 100px;
    vertical-align: top;
    margin: 1em 1.5em 2em 0;
    cursor: pointer;
    position: relative;
    perspective: 4000px;
  }
  .item:hover {
    transform: translateZ(-50px) rotateX(90deg);
  }
  .item {
    height: 100px;
    transform-style: preserve-3d;
    transition: transform .6s;
    img {
      display: block;
      position: absolute;
      top: 0;
      border-radius: 3px;
      box-shadow: 0px 3px 8px rgba(0,0,0,0.3);
      transform: translateZ(50px);
      transition: all .6s;
    }

    .info {
      display: block;
      position: absolute;
      top: 0;
      height: 100px;
      width: 310px;
      text-align: left;
      border-radius: 15px;
      padding: 10px;
      font-size: 12px;
      text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
      box-shadow: none;
      background: rgb(236,241,244);
      background: linear-gradient(to bottom,  rgba(236,241,244,1) 0%,rgba(190,202,217,1) 100%);
      transform: rotateX(-90deg) translateZ(50px);
      transition: all .6s;
    }
  }
  .item:hover img {
    box-shadow: none;
    border-radius: 15px;
  }
  
  .item:hover .info {
    box-shadow: 0px 3px 8px rgba(0,0,0,0.3);
    border-radius: 3px;
  }
}
.demo-3d-2, .demo-3d-3 {
  .stage {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    top: 30px;
    perspective: 1200px;
    .container {
      position: absolute; 
      width: 100px; 
      height: 230px; 
      top: 50%; 
      left: 50%; 
      margin: -100px 0 0 -50px; 
      transform-style: preserve-3d;
    }
    .face {
      position: absolute;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      background-color: #9acc53;
    }
  }
}

.demo-3d-2 {
  .top {
    transform: rotate(-45deg) skew(15deg, 15deg);
  }
  .left {
    background-color: #8ec63f;
    transform: rotate(15deg) skew(15deg, 15deg) translate(-50%, 100%);
  }
  .right {
    background-color: #80b239;
    transform: rotate(-15deg) skew(-15deg, -15deg) translate(50%, 100%);
  }
  .face {
    border: 1px solid #fff;
  }
}

.demo-3d-3 {
  .container {
    transition: all 1s;
  }
  .front {
    transform: translateZ(100px);
  }
  .back {
    transform: rotateX(180deg) translateZ(100px);
  }
  .left {
    transform: rotateY(-90deg) translateZ(100px);
  }
  .right {
    transform: rotateY(90deg) translateZ(100px);
  }
  .top {
    transform: rotateX(90deg) translateZ(100px);
  }
  .bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .container:hover {
    animation: spin 5s linear infinite;
  }
}

</style>
