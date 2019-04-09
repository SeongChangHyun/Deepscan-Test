import BaseApiService from '@/utils/baseApiService'
import {
  auth
} from '@/common/apiUrlConfig'

export default {
  checkEmail(email) {
    return BaseApiService.post(auth.check_email_apiendpoint, {
      email
    })
  },
  sendReactivationEmail(email) {
    return BaseApiService.post(auth.reactivation_email_apiendpoint, {
      email
    })
  },
  checkBusinessLicense(businessLicense) {
    return BaseApiService.get(auth.check_license_apiendpoint, { businessLicense })
  },
  getListBank() {
    return BaseApiService.get(auth.list_bank_apiendpoint)
  },
  checkBankbook(bankGroup) {
    return BaseApiService.post(auth.check_bankbook_apiendpoint, bankGroup)
  },
  checkAddress(address) {
    return BaseApiService.post(auth.check_address_apiendpoint, {
      address
    })
  },
  registerAccount(accountInfomation) {
    return BaseApiService.post(auth.register_account_apiendpoint, accountInfomation)
  }
}
