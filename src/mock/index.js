import Mock from 'mockjs'
import loginAPI from './login'
import registerAPI from './register'
import resetPwdAPI from './resetPwd'
import campaignAPI from './campaign'
import creativesAPI from './creatives'
import creativeImagesAPI from './data/listCi'
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/campaign\.*/, 'get', campaignAPI.requestDatacampaign)

Mock.mock(/\/createCampaign\/checkingTag/, 'get', campaignAPI.checkingTag)
Mock.mock(/\/createCampaign\/getIndustry/, 'get', campaignAPI.getIndustry)
Mock.mock(/\/createCampaign\/getListAdGroup/, 'get', campaignAPI.getListAdGroup)
Mock.mock(/\/createCampaign\/getListCampaign/, 'get', campaignAPI.getListCampaign)
Mock.mock(/\/createCampaign\/getListAndroidApp/, 'get', campaignAPI.getListAndroidApp)
Mock.mock(/\/createCampaign\/getListIosApp/, 'get', campaignAPI.getListIosApp)
Mock.mock(/\/createCampaign\/getListCountry/, 'get', campaignAPI.getListCountry)
Mock.mock(/\/createCampaign\/getListLocation/, 'get', campaignAPI.getListLocation)
Mock.mock(/\/createCampaign\/getListLanguage/, 'get', campaignAPI.getListLanguage)
Mock.mock(/\/createCampaign\/getListDevice/, 'get', campaignAPI.getListDevice)
Mock.mock(/\/createCampaign\/bidDetailsCalcEstimate/, 'post', campaignAPI.bidDetailsCalcEstimate)

Mock.mock(/\/actived-account\.*/, 'post', true)
Mock.mock(/\/send-confirm-code\.*/, 'post', true)
Mock.mock(/\/check-email\.*/, 'post', registerAPI.checkEmail)
Mock.mock(/\/reactivation-email\.*/, 'post', true)
Mock.mock(/\/check-license\.*/, 'get', registerAPI.checkLicense)
Mock.mock(/\/list-bank\.*/, 'get', registerAPI.getListBank)
Mock.mock(/\/check-bankbook\.*/, 'post', true)
Mock.mock(/\/check-address\.*/, 'post', registerAPI.checkAddress)
Mock.mock(/\/register-account\.*/, 'post', registerAPI.registerAcc)
Mock.mock(/\/reset-password\.*/, 'post', resetPwdAPI.resetPwd)
Mock.mock(/\/change-password\.*/, 'post', true)
Mock.mock(/\/check-code-reset-password\.*/, 'post', resetPwdAPI.checkCode)
Mock.mock(/\/check-code-phone-number\.*/, 'post', true)

Mock.mock(/\/creatives\/createFixedBanner/, 'post', creativesAPI.createFixedBanner)
Mock.mock(/\/creatives\/creativeImages/, 'get', creativeImagesAPI.getCreativeImages)
Mock.mock(/\/creatives\/imageSizesByAccount/, 'get', creativeImagesAPI.getImageSizesByAccount)
Mock.mock(/\/creatives\/deleteCreativeImages/, 'post', creativeImagesAPI.deleteCreativeImages)
Mock.mock(/\/creatives\/activateCreativeImages/, 'post', creativeImagesAPI.activateCreativeImages)
Mock.mock(/\/creatives\/deactivateCreativeImages/, 'post', creativeImagesAPI.deactivateCreativeImages)

export default Mock
