<template>
  <g class="faces">
    <polygon class="top" :points="points.top" :fill="color.top.fill" fill-opacity="0.05" :stroke="color.top.stroke"></polygon>
    <polygon class="ab" :points="points.ab" :fill="color.ab.fill" :stroke="color.ab.stroke"></polygon>
		<polygon class="cd" :points="points.cd" :fill="color.cd.fill" :stroke="color.cd.stroke"></polygon>
		<polygon class="ef" :points="points.ef" :fill="color.ef.fill" :stroke="color.ef.stroke"></polygon>
		<polygon class="gh" :points="points.gh" :fill="color.gh.fill" :stroke="color.gh.stroke"></polygon>
		<polygon class="bottom" :points="basePoint" :fill="color.bottom.fill" fill-opacity="0.5" :stroke="color.bottom.stroke"></polygon>
  </g>
</template>

<script>
export default {
  props: {
    value: Number,
    py: Number,
    color: {
      type: Object,
      default() {
        return {
          top: {},
          ab: {},
          cd: {},
          ef: {},
          gh: {},
          bottom: {}
        }
      }
    }
  },
  data() {
    return {
      basePoint: '20,215 35,205 52,215 37,225',
      y: 0
    }
  },
  computed: {
    points() {
      if (this.y == 0) {
        return {
          top: '20,215 35,205 52,215 37,225',
          ab: '20,215 35,205 52,215 37,225',
          cd: '20,215 35,205 52,215 37,225',
          ef: '20,215 35,205 52,215 37,225',
          gh: '20,215 35,205 52,215 37,225'
        }
      }
      return {
        top: `20,${215 - this.y} 35,${205 - this.y} 52,${215 - this.y} 37,${225 - this.y}`,
        ab: `20,${215 - this.y} 37,${225 - this.y} 38,225 20,215`,
        cd: `37,${225 - this.y} 52,${215 - this.y} 52,215 38,225`,
        ef: `35,${205 - this.y} 52,${215 - this.y} 52,215 35,205`,
        gh: `20,${215 - this.y} 35,${205 - this.y} 35,205 20,215`
      }
    }
  },
  watch: {
    py(newVal, oldVal) {
      this.update(newVal * 140)
    }
  },
  methods: {
    update(value) {
      function animate(item) {
        requestAnimationFrame(animate)
      }
      animate()
    }
  },
  mounted() {
    console.log(this.color.top)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.faces {
  polygon {
    stroke-width: 0.7;
  }
}
</style>
