<template>
  <div class="el-form-item" :class="{
    'is-error': validateState === 'error',
    'is-validating': validateState === 'validating',
    'is-required': isRequired || required
  }">
    <label :for="prop" class="el-form-item__label" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="el-form-item__content" v-bind:style="contentStyle">
      <slot></slot>
      <template v-if="errContainer === 'tooltip'">
        <el-tooltip ref="tooltip"
                    effect="dark"
                    placement="top"
                    :content="validateMessage"
                    @input="hackIE9"
                    v-if="validateState === 'error' && showMessage && form.showMessage">
          <i style="
                position: absolute;
                top: 14px;
                right: 5px;
                left: auto;
                font-size: 10px;
                color: #ff4949;
                background: white;"
             class="el-icon-close"></i>
        </el-tooltip>
      </template>
      <transition name="el-zoom-in-top" v-else>
        <div class="el-form-item__error" v-if="validateState === 'error' && showMessage && form.showMessage">{{validateMessage}}</div>
      </transition>
    </div>
  </div>
</template>
<script>
  import { FormItem } from 'element-ui'
  import AsyncValidator from 'async-validator'
  import { isIE9, tooltips } from '@/utils/hack'

  function getPropByPath (obj, path) {
    let tempObj = obj
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    let keyArr = path.split('.')
    let i = 0

    for (let len = keyArr.length; i < len - 1; ++i) {
      let key = keyArr[i]
      if (key in tempObj) {
        tempObj = tempObj[key]
      } else {
        throw new Error('please transfer a valid prop path to form item!')
      }
    }
    return {
      o: tempObj,
      k: keyArr[i],
      v: tempObj[keyArr[i]]
    }
  }

  export default {
    name: 'ElFormItem',
    componentName: 'ElFormItem',
    extends: FormItem,
    props: {
      errorType: String
    },
    computed: {
      isRequired () {
        let rules = this.getRules()
        let isRequired = false

        if (rules && rules.length) {
          rules.every(rule => {
            if (_.isFunction(rule.required)) {
              isRequired = rule.required()
            } else {
              isRequired = rule.required
            }
            if (isRequired) {
              return false
            }
            return true
          })
        }
        return isRequired
      },
      errContainer () {
        return this.form.errContainer || this.errorType
      }
    },
    methods: {
      hackIE9: tooltips,
      attr (model) {
        if (!model || !this.prop) {
          return
        }

        let path = this.prop
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.')
        }

        return getPropByPath(model, path)
      },
      eq (v1, v2) {
        try {
          let prop = this.attr(v1)
          let prop2 = this.attr(v2)

          let list = [prop.o[prop.k], prop2.o[prop2.k]]

          list.forEach((item, idx) => {
            if (_.isArray(item) || _.isPlainObject(item)) {
              list[idx] = JSON.stringify(item)
            }
          })

          return list[0] === list[1]
        } catch (e) {
          return !1
        }
      },
      setFieldValue (v) {
        let prop = this.attr(this.form.model)
        if (prop) {
          prop.o[prop.k] = v
        }
      },
      getRules () {
        var formRules = this.form.rules
        var selfRuels = this.rules

        formRules = formRules ? formRules[this.prop] : []

        return [].concat(selfRuels || formRules || [])
      },
      validate (trigger, callback = _.noop) {
        let me = this
        if (me.initing) {
          me.initing = !1
        } else {
          $util.timer('form-item-validate' + me._uid, () => {
            me.validateDisabled = false
            let rules = me.getFilteredRule(trigger)
            if ((!rules || rules.length === 0)) {
              callback()
              return true
            }

            me.validateState = 'validating'

            try {
              let descriptor = {}
              descriptor[me.prop] = rules

              let validator = new AsyncValidator(descriptor)
              let model = {}

              model[me.prop] = me.fieldValue
              validator.validate(model, { firstFields: true }, (errors, fields) => {
                me.validateState = !errors ? 'success' : 'error'
                me.validateMessage = errors ? errors[0].message : ''

                callback(me.validateMessage)
              })
            } catch (e) {
              me.validateState = 'success'
              me.validateMessage = ''
            }
          }, isIE9 ? 400 : 200)
        }
      },
      resetField (initialValue) {
        let me = this
        let value = me.fieldValue
        let prop = me.attr(me.form.model)

        me.validateState = ''
        me.validateMessage = ''

        initialValue = _.isUndefined(initialValue) ? (_.isUndefined(me.initialValue) ? '' : me.initialValue) : initialValue

        if (Array.isArray(value)) {
          prop.o[prop.k] = [].concat(initialValue)
        } else {
          prop.o[prop.k] = initialValue
        }

        me.validateDisabled = true
      },
      onFieldChange (value) {
        if (this.validateDisabled) {
          this.validateDisabled = false

          // 解决提交表单后显示的错误提示,在输入后不会触发验证的问题
          if (!value) {
            return
          }
        }

        this.validate('change')
      }
    }
  }
</script>

