import { setToken, removeToken, removeRefreshToken, removeRouterPermission, setRefreshToken, removePathRouter } from '@/utils/auth'
import { Common } from '@/common/constants'
import { accountPropertiesMutationTypes } from './mutationTypes'
import accountApiService from '@/app/services/accountApiService'
import oAuthApiService from '@/app/services/oauthApiService'
import userApiService from '../../services/userApiService'
import { resetRouter, asyncRouterMap } from '@/router'
import roleApiService from '../../services/roleApiService'
import { filterAndReplaceAsyncRouter } from '@/app/permission/store/actions'
import { permissionMutationTypes } from '../../permission/store/mutationTypes'
import store from '@/store'
import { LevelRouter } from '@/common/selectAccount'
import Cookies from 'js-cookie'
// Init api services
const AccountService = accountApiService.build()
const OAuthApiService = oAuthApiService.build()
const UserApiService = userApiService.build()
const RoleApiService = roleApiService.build()

export default {
  LoginByUsername({ commit }, userInfo) {
    const email = userInfo.email.trim()
    return new Promise((resolve, reject) => {
      OAuthApiService.loginByUsername(email, userInfo.password).then(response => {
        if (!response) {
          reject(response)
          return
        }
        commit(accountPropertiesMutationTypes.SET_TOKEN, response.access_token)
        setToken(response.access_token)
        setRefreshToken(response.refresh_token)
        resolve()
      }).catch(error => {
        commit(accountPropertiesMutationTypes.LOGIN_FAILED, error)
        reject(error)
      })
    })
  },

  RefreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      OAuthApiService.refreshToken().then(response => {
        if (!response) {
          reject()
          return
        }
        commit(accountPropertiesMutationTypes.SET_TOKEN, response.access_token)
        setToken(response.access_token)
        setRefreshToken(response.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  GetListServicesConfiguration({ commit, state }, accountId) {
    return new Promise((resolve, reject) => {
      return RoleApiService.getServicesConfiguration(accountId)
        .then(response => {
          commit(accountPropertiesMutationTypes.SERVICE_MANAGE, response)
          resolve(response)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  },

  GetUserInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      UserApiService.getUserInfo(state.id).then(response => {
        if (!response) {
          reject('Verification failed, please login again.')
          return null
        }
        const promises = [
          new Promise((resolve, reject) => {
            resolve(Cookies.get('dataPermissionRouter'))
          })
        ]

        Promise.all(promises)
          .then(dataPromises => {
            var resetRoute = false
            try {
              if (dataPromises && dataPromises[0]) {
                const responseRouter = JSON.parse(dataPromises[0])
                if (responseRouter && (responseRouter.level === 'parent' || responseRouter.level === 'client')) {
                  if (responseRouter.level === 'parent') {
                    dispatch('GetListServicesConfiguration', responseRouter.routerInfo.userAccountId)
                  }
                  if (responseRouter.level === 'client') {
                    dispatch('GetListServicesConfiguration', responseRouter.routerInfo.accountParentId)
                  }
                  dispatch('UpdateRolesWhenOpen', { responseRouter, serviceManage: dataPromises[0] })
                } else {
                  resetRoute = true
                }
              } else {
                resetRoute = true
              }
            } catch (e) {
              resetRoute = true
            }
            if (resetRoute) {
              dispatch('GetUserRolePermission', response.account_id)
              dispatch('GetListServicesConfiguration', response.account_id)
            }
          })
        if (response.roles && response.roles instanceof Array) {
          commit(accountPropertiesMutationTypes.SET_ROLES, response.roles)
        } else {
          reject('getInfo: roles must be a non-null array!')
          return null
        }
        commit(accountPropertiesMutationTypes.SET_ID, response.user_id)
        commit(accountPropertiesMutationTypes.SET_ADDR1, response.addr1)
        commit(accountPropertiesMutationTypes.SET_ADDR2, response.addr2)
        commit(accountPropertiesMutationTypes.SET_CONTACT_NAME, response.contact_name)
        commit(accountPropertiesMutationTypes.SET_COUNTRY_CODE, response.country_code)
        if (response.language === Common.KR_CODE || response.language === Common.KO_CODE) {
          commit(accountPropertiesMutationTypes.SET_LANGUAGE, Common.KO_CODE)
        } else if (response.language === Common.JP_CODE || response.language === Common.JA_CODE) {
          commit(accountPropertiesMutationTypes.SET_LANGUAGE, Common.JA_CODE)
        } else {
          commit(accountPropertiesMutationTypes.SET_LANGUAGE, response.language)
        }
        commit(accountPropertiesMutationTypes.SET_TIMEZONE, response.timezone)
        commit(accountPropertiesMutationTypes.SET_VIEW_CURRENCY, response.view_currency)
        commit(accountPropertiesMutationTypes.SET_ZIP, response.zip)
        commit(accountPropertiesMutationTypes.SET_USER, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  GetUserRolePermission({ commit, state, dispatch }, accountId) {
    return new Promise((resolve, reject) => {
      RoleApiService.getAccountRole(accountId).then(response => {
        const newRoles = response.roles
        if (newRoles && newRoles instanceof Array) {
          commit(accountPropertiesMutationTypes.SET_ROLES_ROUTER, newRoles)
          commit(permissionMutationTypes.SET_LEVEL_ROUTERS, LevelRouter.all)
          const newRouter = filterAndReplaceAsyncRouter(asyncRouterMap, {})
          commit(permissionMutationTypes.SET_ROUTERS, newRouter)
          resetRouter(newRouter, (newRouter) => {
            dispatch('GetUrlRouterPath').then((urlPath) => {
              try {
                const data = JSON.parse(urlPath)
                if (data) {
                  newRouter.push({ path: data })
                } else {
                  newRouter.push({ path: '/accounts-summary/performance-report' })
                }
              } catch (e) {
                newRouter.push({ path: '/accounts-summary/performance-report' })
              }
            })
          })
          const objectSave = {
            level: LevelRouter.all, userPermission: newRoles, routerInfo: {}
          }
          dispatch('SaveDataRouterInfo', objectSave)
        } else {
          reject('getInfo: roles must be a non-null array!')
          return null
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  GetListAccount({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, true)
      RoleApiService.getListAccount(state.user.account_id).then(response => {
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT, response)
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, false)
        resolve(response)
      }).catch(error => {
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, false)
        reject(error)
      })
    })
  },

  SearchAccountByKeyword({ commit, state }, keyword) {
    return new Promise((resolve, reject) => {
      commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, true)
      RoleApiService.searchAccountByKeyword(state.user.account_id, keyword).then(response => {
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT, response)
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, false)
        resolve(response)
      }).catch(error => {
        commit(accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS, false)
        reject(error)
      })
    })
  },

  ComeBackHome({ commit, state, dispatch }, level) {
    return new Promise((resolve, reject) => {
      const userRole = store.getters.roles
      const routerInfo = store.getters.getRoutersInfo
      commit(accountPropertiesMutationTypes.SET_ROLES_ROUTER, userRole)
      commit(permissionMutationTypes.SET_LEVEL_ROUTERS, level)
      const newRouter = filterAndReplaceAsyncRouter(asyncRouterMap, routerInfo)
      const objectSave = {
        level, userPermission: userRole, routerInfo
      }
      dispatch('SaveDataRouterInfo', objectSave)
      resetRouter(newRouter, (newRouter) => {
        newRouter.push({ path: '/accounts-summary/performance-report' })
      })
      commit(permissionMutationTypes.SET_ROUTERS, newRouter)
    })
  },

  SaveDataRouterInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      Cookies.set('dataPermissionRouter', JSON.stringify(data))
    })
  },

  SaveUrlRouterPath({ commit, state }, path) {
    return new Promise((resolve, reject) => {
      Cookies.set('currentPath', JSON.stringify(path))
    })
  },

  GetDataRouterInfo({ commit }) {
    return new Promise((resolve, reject) => {
      resolve(Cookies.get('dataPermissionRouter'))
    })
  },

  GetUrlRouterPath({ commit }) {
    return new Promise((resolve, reject) => {
      resolve(Cookies.get('currentPath'))
    })
  },

  UpdateRoles({ commit, dispatch }, config) {
    return new Promise((resolve, reject) => {
      const newRoles = [config.role]
      if (newRoles && newRoles instanceof Array) {
        if (config.type === 'parent') {
          dispatch('GetListServicesConfiguration', config.userAccountId)
        }
        commit(permissionMutationTypes.SET_LEVEL_ROUTERS, config.type)
        commit(accountPropertiesMutationTypes.SET_ROLES_ROUTER, newRoles)
        commit(permissionMutationTypes.SET_DATA_ROUTER_INFO, config)
        const newRouter = filterAndReplaceAsyncRouter(asyncRouterMap, config)
        const objectSave = {
          level: config.type, userPermission: newRoles, routerInfo: config
        }
        dispatch('SaveDataRouterInfo', objectSave)
        resetRouter(newRouter, (newRouter) => {
          newRouter.push({ path: '/accounts-summary/performance-report' })
        })
        commit(permissionMutationTypes.SET_ROUTERS, newRouter)
      }
    })
  },

  UpdateRolesWhenOpen({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      const config = data.responseRouter
      const newRoles = config.userPermission
      if (newRoles && newRoles instanceof Array) {
        commit(permissionMutationTypes.SET_LEVEL_ROUTERS, config.level)
        commit(accountPropertiesMutationTypes.SET_ROLES_ROUTER, newRoles)
        commit(permissionMutationTypes.SET_DATA_ROUTER_INFO, config.routerInfo)
        const newRouter = filterAndReplaceAsyncRouter(asyncRouterMap, config.routerInfo)
        resetRouter(newRouter, (newRouter) => {
          dispatch('GetUrlRouterPath').then((urlPath) => {
            try {
              const data = JSON.parse(urlPath)
              if (data) {
                newRouter.push({ path: data })
              } else {
                newRouter.push({ path: '/accounts-summary/performance-report' })
              }
            } catch (e) {
              newRouter.push({ path: '/accounts-summary/performance-report' })
            }
          })
        })
        commit(permissionMutationTypes.SET_ROUTERS, newRouter)
      }
    })
  },

  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      removeRouterPermission()
      removeRefreshToken()
      removePathRouter()
      Cookies.remove('language')
      resolve()
    })
  },

  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit(accountPropertiesMutationTypes.SET_TOKEN, '')
      removeToken()
      removeRouterPermission()
      Cookies.remove('language')
      resolve()
    })
  },

  ChangeRoles({ commit, dispatch }, role) {
    return new Promise(resolve => {
      commit(accountPropertiesMutationTypes.SET_TOKEN, role)
      setToken(role)
      UserApiService.getUserInfo(role).then(response => {
        const data = response.data
        commit(accountPropertiesMutationTypes.SET_ROLES, data.roles)
        commit(accountPropertiesMutationTypes.SET_NAME, data.name)
        commit(accountPropertiesMutationTypes.SET_AVATAR, data.avatar)
        commit(accountPropertiesMutationTypes.SET_INTRODUCTION, data.introduction)
        dispatch('GenerateRoutes', data)
        resolve()
      })
    })
  },

  ClearPostalAddresses({ commit }) {
    commit(accountPropertiesMutationTypes
      .CLEAR_POSTAL_ADDRESSES)
  },
  ToggleResetAddressesDialog({ commit }) {
    commit(accountPropertiesMutationTypes
      .TOGGLE_RESET_ADDRESSES_DIALOG)
  },

  GetPostalAddresses({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AccountService.getPostalAddresses(payload)
        .then(response => {
          if (!response) {
            return reject()
          }
          if (!response.address) {
            return reject()
          }
          const addresses = response.address.map(item => {
            return {
              ...item,
              zipCode: response.result_zip_num
            }
          })
          if (payload.isRoadBase) {
            commit(accountPropertiesMutationTypes
              .GET_POSTAL_ADDRESSES_ROAD_BASE_SUCCESS, addresses)
          } else {
            commit(accountPropertiesMutationTypes
              .GET_POSTAL_ADDRESSES_HOUSE_BASE_SUCCESS, addresses)
          }
          resolve()
        })
        .catch(error => {
          commit(accountPropertiesMutationTypes
            .GET_POSTAL_ADDRESSES_FAILED, error)
          reject(error)
        })
    })
  },
  GetListBank({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AccountService.getListBank(payload)
        .then(response => {
          if (!response) {
            return reject()
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  UpdateResultForm({ commit }, payload) {
    commit(accountPropertiesMutationTypes
      .UPDATE_RESULT_FORM, payload)
  },
  ResetResultForm({ commit }) {
    commit(accountPropertiesMutationTypes
      .RESET_RESULT_FORM, { title: '', content: '', buttonText: '', actionBtn: () => { } })
  }
}
