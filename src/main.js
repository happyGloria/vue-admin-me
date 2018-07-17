// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css' // iconfonts
import '@/assets/sprite.css'
import '@/styles/index.scss' // global css
import '@/less/core.less' // global styles

window._ = require('lodash')
import $util from '@/utils/index.js'
import TWEEN from 'static/lib/tweenjs-16.3.4.js'
window.$util = $util
window.TWEEN = TWEEN

import '@/comp/index.js'
import '@/compEl/index.js'

import App from './App.vue'
import router from './router.js'
import store from './store'

import i18n from './lang' // Internationalization

import '@/service/fetch.js' // axios
import './permission' // permission

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
