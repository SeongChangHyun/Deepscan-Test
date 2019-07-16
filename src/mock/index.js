import Mock from 'mockjs'
import loginAPI from './login'
import registerAPI from './register'
import resetPwdAPI from './resetPwd'
import campaignAPI from './campaign'
import creatives from './creatives'
import toolAPI from './tool'
import clients from './clients'
import creativeImagesAPI from './data/listCi'
import listCreativeAPI from './data/listCreative'
import { listDailyReports } from './data/listDailyReporting'
import settlementApi from './settlementApi'
import serviceManageAPI from './data/serviceManage'
import targetingReportAPI from './data/targeting-reports.js'
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/.*\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// Mock.mock(/.*\/send-invite/, 'post', clients.sendInvite)
// Mock.mock(/.*\/create/, 'post', clients.createClient)
// Mock.mock(/.*\/list-clients/, 'get', clients.getList)
// Mock.mock(/.*\/list-industry/, 'get', clients.getListIndustry)
// Mock.mock(/.*\/campaign-groups/, 'get', campaignAPI.getListAdGroup)
// Mock.mock(/.*\/send-invite/, 'post', clients.sendInvite)
Mock.mock(/.*\/list-clients/, 'get', clients.getList)
Mock.mock(/.*\/list-industry/, 'get', clients.getListIndustry)
// Mock.mock(/.*\/campaigns/, 'get', campaignAPI.getListCampaign)
Mock.mock(/.*\/delete/, 'post', clients.deleteList)

Mock.mock(/\/createCampaign\/checkingTag/, 'get', campaignAPI.checkingTag)
Mock.mock(/\/createCampaign\/getIndustry/, 'get', campaignAPI.getIndustry)
Mock.mock(/\/createCampaign\/getListAndroidApp/, 'get', campaignAPI.getListAndroidApp)
Mock.mock(/\/clients\/clientId\/app-campaigns/, 'get', campaignAPI.getListIosApp)
Mock.mock(/\/clients\/clientId\/languages/, 'get', campaignAPI.getListLanguage)
Mock.mock(/.*\/campaigns\/grade-bid-calc/, 'get', campaignAPI.getProbabilityOfPurchase)
Mock.mock(/\/createCampaign\/bidDetailsCalcEstimate/, 'post', campaignAPI.bidDetailsCalcEstimate)
// Mock.mock(/\/clients\/clientId\/tracking-tags\.*/, 'get', campaignAPI.trackingTags)
// Mock.mock(/\/list\/user-interest-directories/, 'get', campaignAPI.userDirectories)
// Mock.mock(/.*\/tracking-tags\/verify/, 'get', campaignAPI.checkingTag)
Mock.mock(/.*\/industry/, 'get', campaignAPI.getIndustry)
Mock.mock(/.*\/getListAdGroup/, 'get', campaignAPI.getListAdGroup)
// Mock.mock(/.*\/campaigns/, 'get', campaignAPI.getListCampaign)
Mock.mock(/.*\/getListAndroidApp/, 'get', campaignAPI.getListAndroidApp)
Mock.mock(/.*\/probabilityPurchaseCalcEstimate/, 'post', campaignAPI.getProbabilityOfPurchase)
Mock.mock(/.*\/bidDetailsCalcEstimate/, 'post', campaignAPI.bidDetailsCalcEstimate)
Mock.mock(/.*\/ad-position\/verify/, 'post', campaignAPI.verifyPosition)
// Mock.mock(/\/list\/carriers/, 'get', campaignAPI.listCarriers)
// Mock.mock(/\/list\/browsers/, 'get', campaignAPI.listBrowsers)
// Mock.mock(/\/list\/manufactures/, 'get', campaignAPI.getListManufacture)
Mock.mock(/\/clients\/9987\/custom-user-groups/, 'get', campaignAPI.getListCustomUserGroup)

// Mock.mock(/.*\/report\/campaigns/, 'post', campaignAPI.requestDatacampaign)

Mock.mock(/.*\/send-confirm-code\.*/, 'post', true)
Mock.mock(/.*\/reactivation-email\.*/, 'post', true)
Mock.mock(/.*\/check-license\.*/, 'get', registerAPI.checkLicense)
Mock.mock(/.*\/list-bank\.*/, 'get', registerAPI.getListBank)
Mock.mock(/.*\/check-bankbook\.*/, 'post', true)
Mock.mock(/.*\/check-address\.*/, 'post', registerAPI.checkAddress)
Mock.mock(/.*\/register-account\.*/, 'post', registerAPI.registerAcc)
Mock.mock(/.*\/change-password\.*/, 'post', true)
Mock.mock(/.*\/check-code-reset-password\.*/, 'post', resetPwdAPI.checkCode)
Mock.mock(/.*\/check-code-phone-number\.*/, 'post', true)
Mock.mock(/.*\/provinces\.*/, 'get', registerAPI.getMockProvinces)
Mock.mock(/.*\/cities\.*/, 'get', registerAPI.getMockCities)
Mock.mock(/.*\/validate-email\.*/, 'get', true)

Mock.mock(/\/creatives\/creativeImages/, 'get', creativeImagesAPI.getCreativeImages)
Mock.mock(/\/creatives\/imageSizesByAccount/, 'get', creativeImagesAPI.getImageSizesByAccount)
Mock.mock(/\/creatives\/deleteCreativeImages/, 'post', creativeImagesAPI.deleteCreativeImages)
Mock.mock(/\/creatives\/activateCreativeImages/, 'post', creativeImagesAPI.activateCreativeImages)
Mock.mock(/\/creatives\/deactivateCreativeImages/, 'post', creativeImagesAPI.deactivateCreativeImages)
Mock.mock(/\/creatives\/createCreativeImages/, 'post', creativeImagesAPI.createCreativeImages)
Mock.mock(/.*\/creatives\/list/, 'get', listCreativeAPI.getListCreative)
Mock.mock(/\/creatives\/deleteCreative/, 'post', listCreativeAPI.deleteCreative)
Mock.mock(/\/creatives\/activateCreative/, 'post', listCreativeAPI.activateCreative)
Mock.mock(/\/creatives\/deactivateCreative/, 'post', listCreativeAPI.deactivateCreative)
Mock.mock(/\/creatives\/update/, 'get', listCreativeAPI.getCreative)
Mock.mock(/\/creatives\/updateDynamicCreative/, 'post', listCreativeAPI.getCreative)
Mock.mock(/\/creatives\/animated/, 'post', creatives.createCreativeAnimatedResponse)

Mock.mock(/\/service-manage/, 'get', serviceManageAPI.getListService)

Mock.mock(/\/targeting\/get-user-interest/, 'get', targetingReportAPI.getUserInterest)

Mock.mock(/.*\/reports\/columns/, 'get', campaignAPI.listColumns)

Mock.mock(/.*\/report\/daily/, 'post', listDailyReports)
// Mock.mock(/.*\/clients\/list-feed-setting\.*/, 'get', toolAPI.requestListFeedSetting)
// Mock.mock(/.*\/list-feed-setting\.*/, 'get', toolAPI.requestListFeedSetting)
Mock.mock(/.*\/list-selected-information\.*/, 'get', toolAPI.requestListCollectedInformation)
Mock.mock(/.*\/targeting\/get-creatives-report/, 'get', campaignAPI.requestDatacampaign)
// Mock.mock(/.*\/delete\/feed-setting/, 'delete', toolAPI.deleteFeedSetting)
// Mock.mock(/.*\/product-feeds\/check-feed-url\.*/, 'get', toolAPI.checkFullUrl)
// Mock.mock(/.*\/product-feeds\.*/, 'post', toolAPI.createFeedSetting)

// Mock.mock(/.*\/product-feeds\/check-feed-type\.*/, 'get', commonAPI.checkFeedType)
// Mock.mock(/.*\/product-feeds\/check-full-feed\.*/, 'get', commonAPI.checkFullFeed)

Mock.mock(/.*\/get_list_table_top\.*/, 'get', settlementApi.getDataTableTop)
Mock.mock(/.*\/get_list_table_bottom\.*/, 'get', settlementApi.getDataTableBottom)

// Mock.mock(/.*\/report\/performance/, 'post', campaignAPI.requestDatacampaign)

export default Mock
