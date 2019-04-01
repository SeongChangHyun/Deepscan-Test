import { accountPropertiesMutationTypes } from './mutationTypes'
export default {
  [accountPropertiesMutationTypes.SET_ID]: (state, id) => {
    state.id = id
  },
  [accountPropertiesMutationTypes.SET_CODE]: (state, code) => {
    state.code = code
  },
  [accountPropertiesMutationTypes.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [accountPropertiesMutationTypes.SET_INTRODUCTION]: (state, introduction) => {
    state.introduction = introduction
  },
  [accountPropertiesMutationTypes.SET_SETTING]: (state, setting) => {
    state.setting = setting
  },
  [accountPropertiesMutationTypes.SET_STATUS]: (state, status) => {
    state.status = status
  },
  [accountPropertiesMutationTypes.SET_NAME]: (state, name) => {
    state.name = name
  },
  [accountPropertiesMutationTypes.SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },
  [accountPropertiesMutationTypes.SET_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [accountPropertiesMutationTypes.SET_USER]: (state, user) => {
    state.user = user
  }
}
