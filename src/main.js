// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
import Vue from 'vue'

import i18n from './lang' // Internationalization
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css' // iconfonts
import '@/less/core.less' // global styles

import App from './App'
import router from './router'
import store from './store'

import '@/service/fetch.js' // axios

import '@/comp/index.js'
import '@/compEl/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
