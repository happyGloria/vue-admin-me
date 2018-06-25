<template>
  <svg :class="svgClass" aria-hidden="true" width="100" height="100" @click="clickFn">
    <!--  <use :xlink:href="iconName"></use> -->
    <object :data="svgUrl" width="100" height="100"
            type="image/svg+xml"
            codebase="http://www.adobe.com/svg/viewer/install/" />
  </svg>
</template>
<script>
  import svgUrl from '@/assets/svg/receive.svg'
  export default {
    data() {
      return {
        svgUrl: svgUrl
      }
    },
    methods: {

    }
  }
</script>
<style>

</style>

