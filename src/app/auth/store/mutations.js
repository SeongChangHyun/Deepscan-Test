import { accountPropertiesMutationTypes } from './mutationTypes'
import i18n from '@/lang'

export default {
  [accountPropertiesMutationTypes.LOGIN_FAILED]: (state) => {
    state.id = null
    state.code = null
    state.token = null
    state.introduction = null
    state.setting = null
    state.status = null
    state.name = null
    state.avatar = null
    state.addr1 = null
    state.addr2 = null
    state.contact_name = null
    state.zip = null
    state.language = null
    state.timezone = null
    state.view_currency = null
    state.country_code = null
    state.roles = ''
    state.user = null
    state.provinces = []
    state.cities = []
    state.postalAddressesRoadBase = null
    state.postalAddressesHouseBase = null
  },
  [accountPropertiesMutationTypes.SET_ID]: (state, id) => {
    state.id = id
  },
  [accountPropertiesMutationTypes.SET_ACCOUNT_ID]: (state, id) => {
    state.account_id = id
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
  [accountPropertiesMutationTypes.SET_ROLES_ROUTER]: (state, roles) => {
    state.rolesRouter = roles
  },
  [accountPropertiesMutationTypes.SET_ADDR1]: (state, data) => {
    state.addr1 = data
  },
  [accountPropertiesMutationTypes.SET_ADDR2]: (state, data) => {
    state.addr2 = data
  },
  [accountPropertiesMutationTypes.SET_CONTACT_NAME]: (state, data) => {
    state.contact_name = data
  },
  [accountPropertiesMutationTypes.SET_COUNTRY_CODE]: (state, data) => {
    state.country_code = data
  },
  [accountPropertiesMutationTypes.SET_LANGUAGE]: (state, data) => {
    state.language = data
    i18n.locale = data
  },
  [accountPropertiesMutationTypes.SET_TIMEZONE]: (state, data) => {
    state.timezone = data
  },
  [accountPropertiesMutationTypes.SET_VIEW_CURRENCY]: (state, data) => {
    state.view_currency = data
  },
  [accountPropertiesMutationTypes.SET_ZIP]: (state, data) => {
    state.zip = data
  },
  [accountPropertiesMutationTypes.SET_USER]: (state, user) => {
    state.user = user
  },
  [accountPropertiesMutationTypes.GET_POSTAL_ADDRESSES_ROAD_BASE_SUCCESS]: (state, postalAddressesRoadBase) => {
    state.postalAddressesRoadBase = postalAddressesRoadBase
  },
  [accountPropertiesMutationTypes.GET_POSTAL_ADDRESSES_HOUSE_BASE_SUCCESS]: (state, postalAddressesHouseBase) => {
    state.postalAddressesHouseBase = postalAddressesHouseBase
  },
  [accountPropertiesMutationTypes.GET_POSTAL_ADDRESSES_FAILED]: (state, error) => {
    state.postalAddressesError = error
  },
  [accountPropertiesMutationTypes.CLEAR_POSTAL_ADDRESSES]: (state) => {
    state.postalAddressesRoadBase = []
    state.postalAddressesHouseBase = []
  },
  [accountPropertiesMutationTypes.TOGGLE_RESET_ADDRESSES_DIALOG]: (state) => {
    state.resetAddressesDialog = !state.resetAddressesDialog
  },
  [accountPropertiesMutationTypes.UPDATE_RESULT_FORM]: (state, payload) => {
    state.resultConfig = { ...payload }
  },
  [accountPropertiesMutationTypes.RESET_RESULT_FORM]: (state, payload) => {
    state.resultConfig = { ...payload }
  },
  [accountPropertiesMutationTypes.GET_LIST_ACCOUNT]: (state, payload) => {
    state.listAccount = [...payload]
  },
  [accountPropertiesMutationTypes.GET_LIST_ACCOUNT_PROGRESS]: (state, payload) => {
    state.getlistAccountProgress = payload
  },
  [accountPropertiesMutationTypes.SERVICE_MANAGE]: (state, payload) => {
    state.service_manage = payload
  }
}
