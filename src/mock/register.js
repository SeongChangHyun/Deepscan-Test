import { param2Obj } from '@/utils'
import registerData from './data/register'

export default {
  checkEmail: config => {
    const { email } = JSON.parse(config.body)
    const result = registerData.emailList.filter(user => user.email === email)
    return result.length === 0 ? false : result[0]
  },
  checkLicense: config => {
    const businessLicense = param2Obj(config.url)
    console.log(businessLicense)
    return true
  },
  getListBank: config => {
    return registerData.listBank
  },
  checkAddress: config => {
    const { address } = JSON.parse(config.body)
    const results = address ? registerData.listAddress.filter(value => value.adr_name.includes(address)) : registerData.listAddress
    return results
  },
  registerAcc: config => {
    console.log(JSON.parse(config.body))
    return true
  }
}
