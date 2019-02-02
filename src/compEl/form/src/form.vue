<script>
  import { Form } from 'element-ui'

  export default {
    name: 'ElForm',
    componentName: 'ElForm',
    extends: Form,
    data () {
      return {
        fields: []
      }
    },
    watch: {
      model (v1, v2) {
        $.for(this.fields, (field) => {
          field.initing = !field.eq(v1, v2)
        })
      }
    },
    methods: {
      resetField (name, value) {
        if (name) {
          this.fields.forEach(field => {
            if (field.prop === name) {
              field.resetField(value)
              return false
            }
          })
        }
      },
      resetFields (data) {
        if (!this.model) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Form]model is required for resetFields to work.')
          return
        }
        this.fields.forEach(field => {
          field.resetField(data && data[field.prop])
        })
      },
      validate (callback, excluded) {
        let valid = true
        let count = 0
        let length = this.fields.length
        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(valid)
        }
        this.fields.forEach((field, index) => {
          // let trigger = excluded ? '' : ($(field.$el).is(':hidden') && 'hide' || '')
          let trigger = excluded ? '' : (field.$el.style.display == 'none' && 'hide' || '')
          field.validate(trigger, errors => {
            if (errors) {
              valid = false
            }
            if (typeof callback === 'function' && ++count === length) {
              callback(valid)
            }
          })
        })
      }
    }
  }
</script>
