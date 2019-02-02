/* jshint esversion: 6 */
import nvSwitch from './nvSwitch.vue'

nvSwitch.install = function (Vue, options) {
  Vue.component(nvSwitch.name, nvSwitch)
}

export default nvSwitch
