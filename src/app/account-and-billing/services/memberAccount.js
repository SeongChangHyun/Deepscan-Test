import BaseApiService from '@/utils/baseApiService'
import {
  auth
} from '@/common/apiUrlConfig'

export default {
  verifyTelCode(code) {
    return BaseApiService.post(auth.check_code_phone_number_apiendpoint, {
      code
    })
  },
  checkAddress(address) {
    return BaseApiService.post(auth.check_address_apiendpoint, {
      address
    })
  }
}
