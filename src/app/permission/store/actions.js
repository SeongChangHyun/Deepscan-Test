import { permissionMutationTypes } from './mutationTypes'
import { asyncRouterMap } from '@/router'
import store from '@/store'
import { LevelRouter } from '@/common/selectAccount'

export default {
  GenerateRoutes({ commit }) {
    return new Promise(resolve => {
      commit(permissionMutationTypes.SET_ROUTERS, filterAndReplaceAsyncRouter(asyncRouterMap))
      resolve()
    })
  }
}

/**
 * Determine if it matches the current sample rights
 * @param roles
 * @param route
 */
/**
* Check permissions on the router with level
* level === client || parent : check permission for roles NOT accessed
* remaining level : check permission for access roles
*/
export function hasPermission(roles, route, level, serviceManage) {
  const isSuperAdmin = checkRolesHasExists(store.getters.roles, 'ROLE_SUPER_ADMIN')
  if (route.meta && route.meta.roles) {
    const special = getRouterLevel(route, 'special')
    if (special) {
      if (!isSuperAdmin) return false
      if (level !== 'parent') return false
      // only super admin has access to service manage when level === parent
      return !!special.some(item => item === 'ROLE_SUPER_ADMIN')
    }

    if (!isSuperAdmin) { // super admin full access all menu
      const service_manager = getRouterLevel(route, 'service_manager')
      if (service_manager && serviceManage) {
        if (serviceManage.some(item => item.name === service_manager)) {
          return false
        }
      }
    }
    const rolesLevel = getRouterLevel(route, level)
    if (level === 'client' || level === 'parent') {
      if (!rolesLevel) {
        return true
      }
      if (checkRolesHasExists(roles, 'ROLE_CM')) {
        return rolesLevel.indexOf('ROLE_CM') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_CV')) {
        return rolesLevel.indexOf('ROLE_CV') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_TE')) {
        return rolesLevel.indexOf('ROLE_TE') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_TM')) {
        return rolesLevel.indexOf('ROLE_TM') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_AG')) {
        return rolesLevel.indexOf('ROLE_AG') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_CLA')) {
        return rolesLevel.indexOf('ROLE_CLA') === -1
      }
      if (checkRolesHasExists(roles, 'ROLE_SUPER_ADMIN')) {
        return rolesLevel.indexOf('ROLE_SUPER_ADMIN') === -1
      }
      return true
    }
    if (rolesLevel instanceof Array && rolesLevel.length > 0) {
      if (roles.length === 1) {
        return rolesLevel.indexOf(roles[0]) > -1
      }
      const hasRoleCommissionFee = checkRolesHasExists(roles, 'ROLE_COMMISSION_FEE')
      if (hasRoleCommissionFee) {
        return rolesLevel.indexOf('ROLE_COMMISSION_FEE') > -1
      }
      const hasRoleCampaignManager = checkRolesHasExists(roles, 'ROLE_CAMPAIGN_MANAGER')
      if (hasRoleCampaignManager) {
        return rolesLevel.indexOf('ROLE_CAMPAIGN_MANAGER') > -1
      }
      const hasRoleCampaignViewer = checkRolesHasExists(roles, 'ROLE_VIEWER')
      if (hasRoleCampaignViewer) {
        return rolesLevel.indexOf('ROLE_VIEWER') > -1
      }
      const hasRoleClientAdmin = checkRolesHasExists(roles, 'ROLE_CLIENT_ADMIN')
      if (hasRoleClientAdmin) {
        return rolesLevel.indexOf('ROLE_CLIENT_ADMIN') > -1
      }
      const hasRoleSupperAdmin = checkRolesHasExists(roles, 'ROLE_SUPER_ADMIN')
      if (hasRoleSupperAdmin) {
        return rolesLevel.indexOf('ROLE_SUPER_ADMIN') > -1
      }
    }
    return false
  }
  return true
}

function getRouterLevel(route, level) {
  switch (level) {
    case LevelRouter.comeback:
      return route.meta.roles.comeback
    case LevelRouter.parent:
      return route.meta.roles.parent
    case LevelRouter.client:
      return route.meta.roles.client
    case LevelRouter.service_manager:
      return route.meta.roles.service_manager
    case LevelRouter.special:
      return route.meta.roles.special
    default:
      return route.meta.roles.all
  }
}

export function checkRolesHasExists(roles, key) {
  return roles.indexOf(key) > -1
}

/**
 * Recursively filter asynchronous routing tables and return routing tables that match sample role permissions
 * @param routes asyncRouterMap
 * @param roles
 * @param level Menu level when switch account
 */
export function filterAsyncRouter(routes, roles, level, serviceManage) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp, level, serviceManage)) {
      if (tmp.children && !tmp.showChild) {
        tmp.children = filterAsyncRouter(tmp.children, roles, level, serviceManage)
      }
      res.push(tmp)
    }
  })
  return res
}
export function filterAndReplaceAsyncRouter(routes, routerInfo) {
  const user = store.getters.user

  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children && !tmp.showChild) {
      tmp.children = filterAndReplaceAsyncRouter(tmp.children, routerInfo)
    }
    if (tmp.path.includes(':account_id') && user.account_id) {
      tmp.path = tmp.path.replace(':account_id', user.account_id)
    }
    res.push(tmp)
  })
  return res
}

export function replaceAsyncRouter(router) {
  const user = store.getters.user
  const routerInfo = store.getters.getRoutersInfo
  let pathConvert = router
  const client_id = routerInfo.client_id
  const campaign_id = routerInfo.campaign_id
  if (router.includes(':account_id') && user.account_id) {
    pathConvert = router.replace(':account_id', user.account_id)
  }
  if (router.includes(':client_id') && client_id) {
    pathConvert = router.replace(':client_id', client_id)
  }
  if (router.includes(':account_id') && campaign_id) {
    pathConvert = router.replace(':account_id', campaign_id)
  }
  return pathConvert
}
