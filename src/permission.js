import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { hasPermission } from '@/app/permission/store/actions'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = [
  '/reset-password',
  '/activate',
  '/register',
  '/login',
  '/result',
  '/auth-redirect'
]// no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start() // start progress bar
  if (await getToken() && whiteList.indexOf(to.path) === -1) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters['roles']) { // Check list role sample has length === 0
        await getUserInfoData()
      } else {
        const rolesRouter = store.getters.rolesRouter
        const getRoutersLevel = store.getters.getRoutersLevel
        if (hasPermission(rolesRouter, to, getRoutersLevel)) {
          store.dispatch('SaveUrlRouterPath', to.fullPath)
          next()
        } else {
          next({
            path: '/401', replace: true, query: { noGoBack: true }
          })
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // In the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`) // Otherwise redirect all to the login page
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

async function getUserInfoData() {
  await store.dispatch('GetUserInfo').then((response) => {
    return response
  })
}

router.afterEach((data) => {
  NProgress.done() // finish progress bar
  window.formIsChanged = false
})
