import Mock from 'mockjs'
import loginAPI from './login'
import registerAPI from './register'
import resetPwdAPI from './resetPwd'
import campaignAPI from './campaign'
import creativesAPI from './creatives'
import clients from './clients'
import creativeImagesAPI from './data/listCi'
import listCreativeAPI from './data/listCreative'
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

Mock.mock(/\/clients\/create/, 'post', clients.createClient)
Mock.mock(/\/clients\/list-clients/, 'get', clients.getList)
Mock.mock(/\/clients\/list-industry/, 'get', clients.getListIndustry)
Mock.mock(/\/clients\/clientId\/tracking-tags\/verify/, 'get', campaignAPI.checkingTag) // count > 1000: active
Mock.mock(/\/clients\/clientId\/industry/, 'get', campaignAPI.getIndustry)
Mock.mock(/\/clients\/clientId\/campaign-groups/, 'get', campaignAPI.getListAdGroup)
Mock.mock(/\/clients\/clientId\/campaigns/, 'get', campaignAPI.getListCampaign)
Mock.mock(/\/clients\/delete/, 'post', clients.deleteList)

Mock.mock(/\/createCampaign\/checkingTag/, 'get', campaignAPI.checkingTag)
Mock.mock(/\/createCampaign\/getIndustry/, 'get', campaignAPI.getIndustry)
Mock.mock(/\/createCampaign\/getListAdGroup/, 'get', campaignAPI.getListAdGroup)
Mock.mock(/\/createCampaign\/getListCampaign/, 'get', campaignAPI.getListCampaign)
Mock.mock(/\/createCampaign\/getListAndroidApp/, 'get', campaignAPI.getListAndroidApp)
Mock.mock(/\/clients\/clientId\/app-campaigns/, 'get', campaignAPI.getListIosApp)
Mock.mock(/\/countries/, 'get', campaignAPI.getListCountry)
Mock.mock(/\/createCampaign\/getListLocation/, 'get', campaignAPI.getListLocation)
Mock.mock(/\/clients\/clientId\/languages/, 'get', campaignAPI.getListLanguage)
Mock.mock(/\/clients\/clientId\/devices/, 'get', campaignAPI.getListDevice)
Mock.mock(/\/createCampaign\/probabilityPurchaseCalcEstimate/, 'post', campaignAPI.getProbabilityOfPurchase)
Mock.mock(/\/createCampaign\/bidDetailsCalcEstimate/, 'post', campaignAPI.bidDetailsCalcEstimate)

Mock.mock(/\/clients\/clientId\/report\/campaigns/, 'get', campaignAPI.requestDatacampaign)

Mock.mock(/\/active-account\.*/, 'post', true)
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

Mock.mock(/\/creatives\/add/, 'post', creativesAPI.createCreative)
Mock.mock(/\/creatives\/creativeImages/, 'get', creativeImagesAPI.getCreativeImages)
Mock.mock(/\/creatives\/imageSizesByAccount/, 'get', creativeImagesAPI.getImageSizesByAccount)
Mock.mock(/\/creatives\/deleteCreativeImages/, 'post', creativeImagesAPI.deleteCreativeImages)
Mock.mock(/\/creatives\/activateCreativeImages/, 'post', creativeImagesAPI.activateCreativeImages)
Mock.mock(/\/creatives\/deactivateCreativeImages/, 'post', creativeImagesAPI.deactivateCreativeImages)
Mock.mock(/\/creatives\/createCreativeImages/, 'post', creativeImagesAPI.createCreativeImages)
Mock.mock(/\/creatives\/list/, 'get', listCreativeAPI.getListCreative)
Mock.mock(/\/creatives\/deleteCreative/, 'post', listCreativeAPI.deleteCreative)
Mock.mock(/\/creatives\/activateCreative/, 'post', listCreativeAPI.activateCreative)
Mock.mock(/\/creatives\/deactivateCreative/, 'post', listCreativeAPI.deactivateCreative)
Mock.mock(/\/creatives\/update/, 'get', listCreativeAPI.getCreative)
Mock.mock(/\/creatives\/updateDynamicCreative/, 'post', listCreativeAPI.getCreative)

export default Mock
