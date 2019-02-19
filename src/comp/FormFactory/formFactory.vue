<script>
  export default{
    render: function ($$) {
      return this.init($$, this.$slots.default)
    },
    props: {
      init: Function
    }
  }
</script>
