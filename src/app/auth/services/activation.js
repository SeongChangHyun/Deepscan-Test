import BaseApiService from '@/utils/baseApiService'
import { auth } from '@/common/apiUrlConfig'

export function verifyCode(code) {
  const data = {
    code
  }
  return BaseApiService.post(auth.active_account_apiendpoint, data)
}

export function sendVerifyEmail(code) {
  const data = {
    code
  }
  return BaseApiService.post(auth.send_confirm_code_apiendpoint, data)
}
