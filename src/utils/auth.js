import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'TG3.0-Admin'
const DataPermissionRouter = 'dataPermissionRouter'
const RefreshTokenKey = 'Refresh-Token'
const ClientIDKey = 'clientId'
const CurrentPath = 'currentPath'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRouterPermission() {
  return Cookies.remove(DataPermissionRouter)
}

export function removePathRouter() {
  return Cookies.remove(CurrentPath)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
export function getClientId() {
  const clientId = store.getters.getRoutersInfo.type === 'client' ? store.getters.getRoutersInfo.clientId : ''
  return clientId
}
export function setClientId(clientId) {
  return Cookies.set(ClientIDKey, clientId)
}

