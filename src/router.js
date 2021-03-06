import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/page/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/page/_login/index'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/page/_dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]

export const asyncRouterMap = [{
  path: '/component',
  component: Layout,
  redirect: 'noredirect',
  name: 'components',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [{
    path: 'mix',
    component: () => import('@/page/_component/mix'),
    name: 'mix',
    meta: {
      icon: 'book',
      title: 'mix',
      noCache: true
    }
  },
  {
    path: 'cube',
    component: () => import('@/page/_component/cabinet'),
    name: 'cube',
    meta: {
      icon: 'book',
      title: 'cube',
      noCache: true
    }
  }
  ]
},
{
  path: '/table',
  component: Layout,
  redirect: 'noredirect',
  name: 'Table',
  meta: {
    icon: 'table',
    title: 'Table'
  },
  children: [{
    path: 'treeTable',
    component: () => import('@/page/_table/treeTable'),
    name: 'treeTable',
    meta: {
      icon: 'treeTable',
      title: 'treeTable',
      noCache: true
    }
  },
  {
    path: 'mixTable',
    component: () => import('@/page/_table/mixTable'),
    name: 'mixTable',
    meta: {
      icon: 'mixTable',
      title: 'mixTable',
      noCache: true
    }
  }
  ]
},
{
  path: '/d3Charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'd3Charts',
  meta: {
    title: 'd3Charts',
    icon: 'chart'
  },
  children: [{
    path: 'chart',
    component: () => import('@/page/_d3Charts/chart'),
    name: 'lineChart',
    meta: {
      icon: 'lineChart',
      title: 'lineChart',
      noCache: true
    }
  },
  {
    path: 'mix',
    component: () => import('@/page/_d3Charts/mix'),
    name: 'mixChart',
    meta: {
      icon: 'mixChart',
      title: 'mixChart',
      noCache: true
    }
  }
  ]
},
{
  path: '/eCharts',
  component: Layout,
  redirect: 'noredirect',
  name: 'eCharts',
  meta: {
    title: 'eCharts',
    icon: 'chart'
  },
  children: [{
    path: 'line',
    component: () => import('@/page/_eCharts/line'),
    name: 'eLineChart',
    meta: {
      icon: 'lineChart',
      title: 'lineChart',
      noCache: true
    }
  },
  {
    path: 'pie',
    component: () => import('@/page/_eCharts/pie'),
    name: 'ePieChart',
    meta: {
      icon: 'pieChart',
      title: 'pieChart',
      noCache: true
    }
  }
  ]
},
{
  path: '/style',
  component: Layout,
  redirect: 'noredirect',
  name: 'style',
  meta: {
    title: 'css',
    icon: 'css'
  },
  children: [{
    path: 'css',
    component: () => import('@/page/_style/css'),
    name: 'css',
    meta: {
      icon: 'css',
      title: 'css',
      noCache: true
    }
  },
  {
    path: '3d',
    component: () => import('@/page/_style/3d'),
    name: 'style3d',
    meta: {
      icon: 'css',
      title: 'style3d',
      noCache: true
    }
  },
  {
    path: 'svg',
    component: () => import('@/page/_style/svg'),
    name: 'svg',
    meta: {
      icon: 'css',
      title: 'svg',
      noCache: true
    }
  }
  ]
},
{
  path: '/example',
  component: Layout,
  redirect: 'noredirect',
  name: 'example',
  meta: {
    title: 'example',
    icon: 'css'
  },
  children: [{
    path: 'shopcar',
    component: () => import('@/page/_example/shopcar'),
    name: 'shopcar',
    meta: {
      icon: 'css',
      title: 'shopcar',
      noCache: true
    }
  }]
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
