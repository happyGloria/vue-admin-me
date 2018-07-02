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
        <div class="grid-content mix">
          <div class="title">图片边框+内外发光+图片边框</div>
          <div class="content">
              <el-col :span="10">
                <div class="back"><h1>图片背景</h1></div>
                <div class="shadow">内发光</div>
              </el-col>
              <el-col :span="10">
                <div class="border-img">正常</div>
                <div class="border-img border-img-2">外发光</div>
                <div class="border-img border-img-3"></div>
              </el-col>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content pannels">
          <div class="title">半透明面板</div>
          <div class="content">
            <el-col :span="10">
              <div class="pannel pannel-1"></div>
              <div class="pannel pannel-2">
                <div class="pannel-head">标题</div>
                <div class="pannel-body"></div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="pannel pannel-3" data-corner='New'>角标</div>
              <div class="pannel pannel-4"></div>
            </el-col>
          </div>
        </div>
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
  /* https://juejin.im/post/5b1e2b50f265da6e5546c15d */
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
</style>

<style lang="scss">
@import './_mixin.scss';
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
.mix {
  & .content>div { margin-right: 3px; color:#fff;}
  .back {
    width: 100%;
    height: 48%;
    background: url(~assets/pic/content-frame.png) no-repeat;
    background-size: contain;
    background-position: center;
    h1 {
       padding-top: 42px;
       text-align: center;
       font-weight: normal;
    }
  }
  .shadow {
    width: 100%;
    height: 48%;
    padding: 10px;
    box-shadow: 0 0 20px rgba(100, 200, 255, .5) inset;
    background: rgba(0, 0, 0, .2);
  }
  .border-img {
    width: 100%;
    height: 30%;
    color: rgba(255, 255, 255, .9);
    border: 20px solid transparent;
    border-image: url(~assets/pic/border.png) 5%;  //5% 决定了边框的厚度
    background-color: rgba(0, 0, 0, .3);
  }
  .border-img:nth-child(n+1) {
    margin-bottom: 10px;
  }
  .border-img-2 {
    box-shadow:  0 0 5rem rgb(0,110,150);
  }
  .border-img-3 {
    border: 1.5rem solid transparent;
    border-image: url(~assets/pic/border1.png) 15% 5%;
    background-color: transparent;
  }
}
.pannels {
  .el-col {
    margin-right: 10px;
  }
  .pannel {
    width: 100%;
    height: 45%;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 180, 220, .5);
    font-size: 14px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, .5);
    display: flex;
    flex-flow: column nowrap;
    color: rgba(60, 240, 250, 1);
  }
  .pannel-1 {
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(0, 180, 220, .3),rgba(0,180,220,0.1), rgba(0,180,220,0.1), rgba(0,180,220,0.3));
    box-shadow: 0 0 2em rgba(0, 180, 220, .1) inset;
  }
  .pannel-2 {
    .pannel-head {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: linear-gradient(rgb(0, 20, 30), rgb(0, 40, 70));
      border: 2px solid rgba(0,90,120,.3);
    }
    .pannel-body{
      flex: 1 0 auto;
      background: rgba(0,0,0,.3);
      border: 2px solid rgba(0,90,120,.4);
      border-top:none
    }
    &:hover{
      filter: brightness(1.2);
    }
  }
  .pannel-3 {
    border: 2px solid rgba(22, 78, 137, 1);
    background: rgba(13, 35, 61, 1);
    position: relative;

    &:after {
      content: attr(data-corner);
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 20px;
      line-height: 20px;
      padding:0 10px;
      background: linear-gradient(45deg, transparent 0%, transparent 30%,rgba(22, 78, 137, 1) 30%, rgba(22, 78, 137, 1) 100%);
      text-align: right;
      color: rgba(255,255,255,.9);
      overflow: hidden;
    }
  }
  .pannel-4 {
    border: 20px solid transparent;
    border-image: linear-gradient(45deg, red, blue) 10%;
    border-radius: 10px; /* 实现不了boder-radius, 可以使用双层div, 外层background: linear-gradient() 内层设置背景 */
  }
}
</style>

