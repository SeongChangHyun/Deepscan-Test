import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/app/layout'

import campaignRouter from '../app/campaign/router'
import authRouter from '../app/auth/router'
import memberAccountRouter from '@/app/account-and-billing/router'
import creativeRouter from '@/app/creatives/router'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/app/redirect')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/app/error-pages/page-404/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/app/error-pages/page-401/index'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/campaign',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/app/dashboard'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'tool',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    // handle unknown route
    path: '*',
    component: () => import('@/app/error-pages/page-404/index'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...authRouter,
    ...constantRouterMap
  ]
})

export const asyncRouterMap = [
  campaignRouter,
  memberAccountRouter,
  creativeRouter
]
