import Cookies from 'js-cookie'

const TokenKey = 'TG3.0-Admin'
const RefreshTokenKey = 'Refresh-Token'
const ClientIDKey = 'clientId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
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
  return ClientIDKey
}
export function setClientId(clientId) {
  return Cookies.set(ClientIDKey, clientId)
}
