import BaseApiService from '@/utils/baseApiService'
import { user } from '@/common/apiUrlConfig'
import { Common } from '@/common/constants'
import { getRefreshToken } from '@/utils/auth'
import queryString from 'query-string'
import sha512 from 'sha512'
import axios from 'axios'
import btoa from 'btoa'
import md5 from 'md5'

const instance = axios.create({
  baseURL: process.env.OAUTH2_API,
  timeout: process.env.REQUEST_TIMEOUT,
  headers: {
    'Authorization': `Basic ${btoa(Common.AUTHORIZATION_TOKEN)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export function loginByUsername(username, password) {
  return instance.post(user.login_apiendpoint, queryString.stringify({
    grant_type: Common.LOGIN_GRANT_TYPE,
    scope: Common.LOGIN_SCOPE,
    username,
    password: sha512(md5(password)).toString('hex')
  }))
}

export function refreshToken() {
  return instance.post(user.login_apiendpoint, queryString.stringify({
    grant_type: Common.REFRESH_GRANT_TYPE,
    refresh_token: getRefreshToken(),
    scope: Common.LOGIN_SCOPE
  }))
}

export function logout() {
  return BaseApiService.post(user.logout_apiendpoint)
}

export function getUserInfo(userId) {
  return BaseApiService.get(user.info_apiendpoint, { userId })
}

