/* jshint esversion: 6 */
import Vue from 'vue'
import nvTable from './nvTable'
import nvTree from './nvTree'
import EditTable from './EditTable'
import FormFactory from './FormFactory'

import eCharts from 'echarts'

Vue.use(nvTree)
Vue.use(EditTable)
Vue.use(nvTable)
Vue.use(FormFactory)

Vue.prototype.$eCharts = eCharts
