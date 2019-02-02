<template>
  <div class="cube-wrapper">
    <div class="btn-slide">
        <nv-switch v-model="rotate" inactive-value = "背面" active-value = "正面"></nv-switch>
    </div>
    <div class="cube" :class="{ rotate: rotate }">
      <div class="cube-face face-front">
        <slot name="front"></slot>
      </div>
      <div class="cube-face face-back">
        <slot name="back"></slot>
      </div>
      <div class="cube-face face-side"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rotate: true
    }
  }
}
</script>

<style scoped lang="scss">
  .cube-wrapper {
    width: 159px;
    .cube {
      position: relative;
      height: 600px;
      .cube-face{
        position: absolute;
        left: 0;
        top: 20px;
        right: 0;
        bottom: 0;
        background: url('~@assets/bg/cube-face.png') no-repeat;
      }
      .face-side {
        background: url('~@assets/bg/cube-side.png') no-repeat;
        transform: rotateY(90deg) translateX(-80px);
        transform-origin: left;
      }
      .face-front {
        transform: translateZ(60px);
        transform-origin: right;
      }
      .face-back {
        transform: rotateY(180deg) translateX(159px) translateZ(80px);
        transform-origin: right;
      }
    }
    .cube {
      transform-style: preserve-3d;
      transition: all 1s ease-in-out;
      transform: rotateX(0deg) rotateY(0deg);
    }
    .cube.rotate{
      transform: rotateX(0deg) rotateY(180deg);
    }
  }
</style>

