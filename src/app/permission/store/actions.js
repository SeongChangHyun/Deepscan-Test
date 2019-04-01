import { permissionMutationTypes } from './mutationTypes'
import { asyncRouterMap } from '@/router'

export default {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      let accessedRouters
      if (roles.includes('admin')) {
        accessedRouters = asyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      }
      commit(permissionMutationTypes.SET_ROUTERS, accessedRouters)
      resolve()
    })
  }
}

/**
 * Determine if it matches the current sample rights
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Recursively filter asynchronous routing tables and return routing tables that match sample role permissions
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
