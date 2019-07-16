import queryString from 'query-string'
import sha512 from 'js-sha512'
import md5 from 'md5'
import AuthService from '@/services/authAdapter'
import { Common } from '@/common/constants'
import { user } from '@/common/apiUrlConfig'
import { getRefreshToken } from '@/utils/auth'

export default class OauthApiService extends AuthService {
  loginByUsername(username, password) {
    return this.post(user.login, queryString.stringify({
      grant_type: Common.LOGIN_GRANT_TYPE,
      scope: Common.LOGIN_SCOPE,
      username,
      password: sha512.create().update(md5(password)).hex()
    }))
  }
  refreshToken() {
    return this.post(user.login, queryString.stringify({
      grant_type: Common.REFRESH_GRANT_TYPE,
      refresh_token: getRefreshToken(),
      scope: Common.LOGIN_SCOPE
    }))
  }
  logout() {
    return this.post(user.logout)
  }
  getUserInfo(userId) {
    return this.get(user.info, { userId })
  }
}
