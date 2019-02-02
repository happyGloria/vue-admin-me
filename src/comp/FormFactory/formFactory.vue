<script>
  export default{
    name: 'formFactory',
    render: function ($$) {
      return this.init($$, this.$slots.default)
    },
    props: {
      init: Function
    }
  }
</script>
