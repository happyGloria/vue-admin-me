<template>
  <g class="faces">
    <text x="36" :y="200-y" fill="#fff" text-anchor="middle" font-size="12">{{value}}</text>
    <polygon class="top" :points="points.top" :fill="color.top.fill" fill-opacity="0.05" :stroke="color.top.stroke" stroke-width="0.7"></polygon>
		<polygon class="ab" :points="points.ab" :fill="color.ab.fill" :stroke="color.ab.stroke" stroke-width="0.7"></polygon>
		<polygon class="cd" :points="points.cd" :fill="color.cd.fill" :stroke="color.cd.stroke" stroke-width="0.7"></polygon>
		<polygon class="ef" :points="points.ef" :fill="color.ef.fill" :stroke="color.ef.stroke" stroke-width="0.7"></polygon>
		<polygon class="gh" :points="points.gh" :fill="color.gh.fill" :stroke="color.gh.stroke" stroke-width="0.7"></polygon>
		<polygon class="bottom" points="20,215 35,205 52,215 37,225" :fill="color.bottom.fill" fill-opacity="0.5" :stroke="color.bottom.stroke" stroke-width="0.7"></polygon>
    <text x="34" :y="240" :fill="textColor" text-anchor="middle" font-size="12">{{title}}</text>
  </g>
</template>

<script>
export default {
  props: {
    value: Number,
    title: String,
    textColor: String,
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
  methods: {
    update(value) {
      var me = this
      function animate() {
        requestAnimationFrame(animate)
        TWEEN.update()
      }

      new TWEEN.Tween({ tween: me.y })
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
          me.y = this.tween
        })
        .to({ tween: value }, 1000)
        .start()

      animate()
    }
  },
  watch: {
    py(newVal, oldVal) {
      this.update(newVal * 140)
    }
  },
  mounted() {
    this.update(this.py * 140)
  }
}
</script>