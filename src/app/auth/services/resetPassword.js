import BaseApiService from '@/utils/baseApiService'
import {
  auth
} from '@/common/apiUrlConfig'

export default {
  checkCode(code) {
    return BaseApiService.post(auth.check_code_reset_password_apiendpoint, code)
  },
  resetPassword(email) {
    return BaseApiService.post(auth.reset_password_apiendpoint, email)
  },
  changePassword(password) {
    return BaseApiService.post(auth.change_password_apiendpoint, password)
  }
}
