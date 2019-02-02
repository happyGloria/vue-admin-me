<template>
  <div class="nv-switch" @click="handleFn">
    <div class="ico ico-btn-slide btn-slide" 
      :style="{'left': `${(value? 38: 3)}px`, 'background-color':`${(value? activeColor: inActiveColor)}`}"></div>
		<div class="slide-text" :style="{'left': `${(value? 5: 32)}px`, 'color':`${(value ? activeColor: inActiveColor)}`}">{{text}}</div>
  </div>
</template>

<script>

export default {
  name: 'nv-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeValue: {
      type: String,
      default: ''
    },
    inactiveValue: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: '#11b7f5'
    },
    inActiveColor: {
      type: String,
      default: '#05d2ac'
    }
  },
  computed: {
    text () {
      return this.value ? this.activeValue : this.inactiveValue
    }
  },
  methods: {
    handleFn () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.nv-switch {
  position: relative;
  width: 65px;
  height: 22px;
  font-size: 14px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, .6);
  cursor: pointer;
  & > div {
    position: absolute;
  }
  .btn-slide {
    top: 3px;
    transition: all 0.5s ease-out;
    border-radius: 3px;
  }
  .slide-text {
    top: 4px;
    transition: all 0.5s ease-out;
    width: 30px;
  }
}
</style>
