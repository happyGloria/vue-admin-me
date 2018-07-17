<template>
  <div class="cube-wrapper">
    <svg class="svg-cub">
      <defs>
        <linearGradient  x1="0%" y1="0%" x2="0%" y2="100%" 
          v-for="(item, idx) in cubeData" :id="`colorCube${idx}`">
          <stop offset="0%" :style="{ stopColor: item.color, stopOpatity: 0}"></stop>
          <stop offset="100%" :style="{ stopColor: item.color, stopOpatity: 0.6}"></stop>
        </linearGradient>
      </defs>
      <g class="cube" v-for="(item, idx) of cubeData" :transform="translates[idx]">
        <face 
          :color="getColorFn(item, idx)"
          :value="item.value"
          :py="getY[idx]">
        </face>
      </g>
    </svg>
  </div>
</template>

<script>
import face from './face.vue'
export default {
  components: {
    face
  },
  props: {
    cubeData: {
      type: Array,
      default: []
    },
    translates: {
      type: Array,
      default: []
    },
    viewBox: {
      type: String,
      default: ''
    }
  },
  computed: {
    getY() {
      return this.cubeData.map(item => {
        let min = Math.max(item.value / this.maxY, 0.03)
        return item.value > 0 ? Math.max(0.06, min) : 0.03
      })
    },
    maxY() {
      let y = 0
      this.cubeData.map(item => {
        if (item.value > y) {
          y = item.value
        }
      })
      return y
    }
  },
  methods: {
    getColorFn(item, idx) {
      return {
        top: {
          fill: item.color,
          stroke: item.color
        },
        ab: {
          fill: `url(colorCube${idx})`,
          stroke: item.color
        },
        cd: {
          fill: `url(colorCube${idx})`,
          stroke: item.color
        },
        ef: {
          fill: `url(colorCube${idx})`,
          stoke: 'none'
        },
        gh: {
          fill: `url(colorCube${idx})`,
          stoke: 'none'
        },
        bottom: {
          fill: item.color,
          stoke: item.color
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cube-wrapper, .svg-cub{
  width: 100%;
  height: 100%;
  .cube {
    cursor: pointer;
  }
}
</style>
