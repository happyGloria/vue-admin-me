import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'

import listApis from './api.js'
import Mock from './mock/mock.js'

Vue.prototype.$http = axios

var Test = !0,
  Service = {},
  axiosObj = axios.create({
    timeout: 30000
  })

axiosObj.interceptors.request.use((config) => {
  return config
}, (error) => {
  Message({
    message: '错误的传参',
    type: 'error',
    duration: 1000
  })
  Promise.reject(error)
})
axiosObj.interceptors.response.use(response => {
  const res = response.data
  if (response.headers['content-disposition']) { // 下载
    return Promise.resolve(response)
  }
  if (res.retCode !== 1) {
    if (res.retCode === -1) {
      return MessageBox.alert('你已被登出，继续操作，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        callback: action => {
          store.dispatch('ClearSession', () => {
            Vue.$router.push({ path: '/login' })
            location.reload()
          })
        }
      })
    }
    Message({
      message: res.err,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res)
  } else {
    return Promise.resolve(res)
  }
}, err => {
  Message({
    message: err,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(err)
})

function formatURL(URL, params) {
  var reg = /\/\{(.+?)\}/g
  if (reg.test(URL)) {
    return URL.replace(reg, ($0, $1) => {
      return '/' + params[$1]
    })
  }
  return URL
}

listApis().forEach((v) => {
  if (Service[v[0]]) {
    Message('接口名称:' + v[0] + '已被占用，请修改！', 'fail')
    return false
  }
  Service[v[0]] = (params) => {
    var settings = {
      url: formatURL(v[1], params) + '.do',
      method: v[2],
      data: params || {}
    }

    if (v[3] === 'blob') {
      settings.responseType = v[3]
    }
    /* if (v[3] === 'text/plain') {
      settings.data = JSON.stringify(params)
      settings.headers = {
        'Content-type': v[3]
      }
    } */
    return Test ? Mock(v[0], settings) : axiosObj(settings)
  }
})

export default window.Service = Service
