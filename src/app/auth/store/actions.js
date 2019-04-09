import { loginByUsername, refreshToken, getUserInfo } from '@/app/auth/services/login'
import { setToken, removeToken, removeRefreshToken, setRefreshToken } from '@/utils/auth'
import { accountPropertiesMutationTypes } from './mutationTypes'
export default {
  LoginByUsername({ commit }, userInfo) {
    const email = userInfo.email.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(email, userInfo.password).then(response => {
        if (!response.data) {
          reject()
          return
        }
        commit(accountPropertiesMutationTypes.SET_TOKEN, response.data.access_token)
        setToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  RefreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refreshToken().then(response => {
        if (!response.data) {
          reject()
          return
        }
        commit(accountPropertiesMutationTypes.SET_TOKEN, response.data.access_token)
        setToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  GetUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.id).then(response => {
        const data = response.data
        if (!data) {
          reject('Verification failed, please login again.')
        }
        if (data.roles && data.roles.length > 0) {
          commit(accountPropertiesMutationTypes.SET_ROLES, data.roles)
        } else {
          reject('getInfo: roles must be a non-null array!')
        }

        commit(accountPropertiesMutationTypes.SET_ID, data.id)
        commit(accountPropertiesMutationTypes.SET_NAME, data.name)
        commit(accountPropertiesMutationTypes.SET_AVATAR, data.avatar)
        commit(accountPropertiesMutationTypes.SET_INTRODUCTION, data.introduction)
        commit(accountPropertiesMutationTypes.SET_USER, data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      removeRefreshToken()
      resolve()
    })
  },

  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit(accountPropertiesMutationTypes.SET_TOKEN, '')
      removeToken()
      resolve()
    })
  },

  ChangeRoles({ commit, dispatch }, role) {
    return new Promise(resolve => {
      commit(accountPropertiesMutationTypes.SET_TOKEN, role)
      setToken(role)
      getUserInfo(role).then(response => {
        const data = response.data
        commit(accountPropertiesMutationTypes.SET_ROLES, data.roles)
        commit(accountPropertiesMutationTypes.SET_NAME, data.name)
        commit(accountPropertiesMutationTypes.SET_AVATAR, data.avatar)
        commit(accountPropertiesMutationTypes.SET_INTRODUCTION, data.introduction)
        dispatch('GenerateRoutes', data)
        resolve()
      })
    })
  }
}
