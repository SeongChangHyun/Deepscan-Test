import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/app/layout'
import campaignRouter from '../app/campaign/router'
import authRouter from '../app/auth/router'
import memberAccountRouter from '@/app/account-and-billing/router'
import creativeRouter from '@/app/creatives/router'
import accountsSummaryRouter from '../app/accounts-summary/router'
import toolRouter from '@/app/tool/router'
import targetingReportsRouter from '../app/targeting-reports/router'

Vue.use(Router)

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
    path: '/403',
    component: () => import('@/app/error-pages/page-403/index'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/accounts-summary'
  },
  {
    // handle unknown route
    path: '*',
    component: () => import('@/app/error-pages/page-404/index'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...authRouter,
    ...constantRouterMap
  ]
})

const router = createRouter()
export function resetRouter(elementRouter, callback) {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
  router.addRoutes(elementRouter)
  callback(router)
}

export const asyncRouterMap = [
  accountsSummaryRouter,
  targetingReportsRouter,
  campaignRouter,
  memberAccountRouter,
  creativeRouter,
  toolRouter
]

export default router
