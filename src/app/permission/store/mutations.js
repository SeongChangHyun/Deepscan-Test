import { constantRouterMap } from '@/router'
import { permissionMutationTypes } from './mutationTypes'
export default {
  [permissionMutationTypes.SET_ROUTERS]: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}

