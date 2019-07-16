import role from '@/permissionConfig'
import store from '@/store'

export function getRoleRouter(element) {
  return pluck(role.configs, element).router
}

export function getRoleElement(identifier, element) {
  const roleMain = pluck(role.configs, identifier)
  const userRole = store.getters.roles
  if (roleMain.hasOwnProperty(element)) {
    const arrayPermissionElement = roleMain[`${element}`]
    const hasValueElement = arrayPermissionElement.indexOf(userRole)
    return hasValueElement > -1
  }
  return false
}

function pluck(obj, element) {
  return `${element}`.split('.').reduce((rm = {}, key) => rm[key], obj)
}

export function checkRole(element) {
  const roleMain = pluck(role.configs, element)
  let routerRole = store.getters.getRoutersInfo.role
  const userRole = store.getters.roles
  if (userRole.indexOf('ROLE_SUPER_ADMIN') > -1) {
    routerRole = 'ROLE_SUPER_ADMIN'
  }
  let indexRole = -1
  if (roleMain && !!roleMain.length) {
    indexRole = roleMain.indexOf(routerRole)
  }
  return indexRole > -1
}
