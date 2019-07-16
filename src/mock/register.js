import { param2Obj } from '@/utils'
import registerData from './data/register'
import accountData from './data/resetPwd'
import { Auth } from '@/common/constants'

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
    return address ? registerData.listAddress.filter(value => value.adr_name.includes(address)) : registerData.listAddress
  },
  registerAcc: config => {
    return true
  },
  getMockProvinces: () => {
    return registerData.listProvinces
  },
  getMockCities: () => {
    return registerData.listCities
  },
  getMockPostalAddress: () => {
    return registerData.listPostalAddresses
  },
  activeAccount: (dataPost) => {
    let flag = false
    accountData.testList.forEach(element => {
      if (element.id === dataPost.body && (new Date().getTime() - new Date(element.time).getTime() < Auth.MILLISECONDS_OF_DAY)) {
        flag = true
      }
    })
    return flag
  }
}
