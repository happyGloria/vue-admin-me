import ElFormItem from '../form/src/form-item'

/* istanbul ignore next */
ElFormItem.install = function (Vue) {
  Vue.component(ElFormItem.name, ElFormItem)
  Vue.mixin({
    methods: {
      msg (result) {
        let text = result
        let fnName = this.$notify.warning
        if ($.isPlainObject(result)) {
          if (result.code === 200) {
            fnName = this.$notify.success
          } else {
            fnName = this.$notify.error
          }
          text = result.message || result.data.message
        }
        fnName({
          title: '提示',
          message: text,
          duration: 5000
        })
      },
      confirm (text, success, fail) {
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(success || $.noop).catch(fail || $.noop)
      }
    }
  })
}

export default ElFormItem
