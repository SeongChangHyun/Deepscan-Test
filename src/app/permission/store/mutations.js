import { constantRouterMap } from '@/router'
import { permissionMutationTypes } from './mutationTypes'
export default {
  [permissionMutationTypes.SET_ROUTERS]: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  },
  [permissionMutationTypes.SET_LEVEL_ROUTERS]: (state, level) => {
    state.routerLevel = level
  },
  [permissionMutationTypes.SET_DATA_ROUTER_INFO]: (state, config) => {
    state.infoRouter = config
  }
}

