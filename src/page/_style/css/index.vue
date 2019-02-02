<template>
  <div class="page-block">
    <el-row type="flex" justify="space-around">
      <el-col :span="8">
        <div class="grid-content demo-01">
          <div class="title">动态旋转边框</div>
          <div class="content">
            <div class="ring-outer"></div>
            <div class="ring-inner"></div>
            <div class="avator"></div>
          </div>
        </div>
        <div class="grid-content demo-02">
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
        <div class="grid-content demo-03">
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
        <div class="grid-content demo-04">
          <div class="title"></div>
          <div class="content">
           
            <div class="navbar-1">
              <div class="avator"></div>
              <ul class ="nav clearfix">
                <li class="fl active">掘金主页</li>
                <li class="fl">简书主页</li>
                <li class="fl">github主页</li>
              </ul>
            </div>

            <div class="navbar-2">
              <ul class="list">
                <li class="fl border-line">掘金主页</li>
                <li class="fl border-line">简书主页</li>
                <li class="fl border-line">github主页</li>
              </ul>
            </div>

            <div class="navbar-3">
              <img :src="imgUrl" alt="" class="box-img">
              <div class="box-desc">
                <p> 
                  <span>title</span>
                  <span>desc</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content demo-05">
          <div class="title">改变checkbox外观</div>
          <div class="content">
            <input type="checkbox">
          </div>
        </div>
        <div class="grid-content">

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import imgUrl from '@/assets/img/bird.jpg'
  export default {
    data () {
      return {
        imgUrl: imgUrl
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
</style>

<style lang="scss">
@import '~@/styles/utils/_mixins.scss';

.demo-01 {
  .content {
    position: relative;
    @include p-center;
  }
  .ring-inner, .ring-outer {
    width: 220px;
    height: 220px;
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
.demo-02 {
  & .content > div { 
    margin-right: 3px; 
    color:#fff;
  }
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
.demo-03 {
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
    border-radius: 10px; 
    /* 实现不了boder-radius, 可以使用双层div, 外层background: linear-gradient() 内层设置背景 */
  }
}
.demo-04 {
  .navbar-1 {
    margin-bottom: 10px;
    ul {
      height: 40px;
      line-height: 40px;
      background-color: #393d48;
    }
    li {
      padding: 0 10px;
      color: #c3b19b;
      font-size: 14px;
      position: relative;
      &:after {
        content:"";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 4px;
        background-color: #5eb379;
        transition: ease-in-out 0.2s;
        transform: scaleX(0);
      }
    }
    li:hover {
      &:after {
        transform: scaleX(1);
      }
    }
    li.active {
      color: #fff;
      &:after {
        background-color: #5eb379;
        transform: scaleX(1);
      }
    }
  }
  .navbar-2 {
    height: 60px;
    background-color: #ddd;  
    padding: 10px;
    margin-bottom: 10px;
    li {
      padding: 16px 32px;
      border: 1px solid #ebebeb;
      margin-right: 5px;
      transition: all 0.6s ease-in;
      background: none;
      box-shadow: inset 0 0 0 0px transparent;
      position: relative;
    }
    li:hover {
      border-color: #367dff;
    }

    li::after, 
    li::before {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      box-sizing: border-box;
      border: 1px solid transparent;
    }

    li::after {
      top: 0;
      left: 0;
      transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s;
    }

    li::before {
      bottom: 0;
      right: 0;
      transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in;
    }

    li:hover::after, 
    li:hover::before {
      width: 100%;
      height: 100%;
    }

    li:hover::after {
      border-top-color: #367dff;
      border-right-color: #367dff;
      transition: width 0.2s ease-out, height 0.2s ease-out 0.2s;
    }

    li:hover::before {
        border-bottom-color: #367dff;
        border-left-color: #367dff;
        transition: border-color 0s ease-out 0.4s, width 0.2s ease-out 0.4s, height 0.2s ease-out 0.6s;
    }
  }
  .navbar-3 {
    position: relative;
    width: 250px;
    height: 158px;
    background-color: rgba(53, 172, 197, 1);

    .box-img {
      display: block;
      width: 100%;
      height: 100%;
      opacity: .7;
      transition: .35s;
    }

    .box-desc {
      width: 100%;
      height: 100%;
      padding: 10px;

      position: absolute;
      top: 0;
      left: 0;

      color: #fff;
      font-size: 12px;
      text-transform: uppercase;
      backface-visibility: hidden;
    }

    .box-desc:before, .box-desc:after {
      content: '';
      position: absolute;
      top: 30px;
      right: 30px;
      left: 30px;
      bottom: 30px;
      opacity: 0;
      pointer-events: none;
      transition: opacity .35s, transform .35s;
    }

    .box-desc::before {
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      transform: scale(0, 1);
    }

    .box-desc::after {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      transform: scale(1, 0);
    }
    .box-desc p {
      padding: 4px 10px;
      margin: 0;
      font-size: 16px;
      line-height: 1.0;
      text-align: center;
      color: #fff;
      letter-spacing: 1px;
      opacity: 0;
      transition: opacity .35s, transform .35s;
      transform: translate3d(0, 40px, 0)
    }
    &:hover {
      .box-img{
        opacity: .4s;
      }
      .box-desc::before,.box-desc::after {
        opacity: 1;
        transform: scale(1);
      }

      .box-desc p {
        opacity: 1;
        transform: translate3d(0, 20px, 0);
      }
    }
  }
}
.demo-05 {
  input[type="checkbox"]{
    border: none; 		/* Mobile Safari */
    -webkit-appearance: none; 
    appearance:none;
  }
  input[type="checkbox"]:after{
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="40" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }
  //  设置选中后状态：
  input[type=checkbox]:checked:after{
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="40" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
}
</style>

