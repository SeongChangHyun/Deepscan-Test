import BaseApiService from '@/utils/baseApiService'
import { campaign } from '@/common/apiUrlConfig'

export function getCampaignReportingData() {
  return BaseApiService.get(campaign.get_campaign_reporting_apiendpoint)
}

/* campaign management */
export function getCheckingTag() {
  return BaseApiService.get(campaign.get_checking_tag_apiendpoint)
}
export function getIndustry() {
  return BaseApiService.get(campaign.get_industry_apiendpoint)
}
export function getListAdGroup(data) {
  return BaseApiService.get(campaign.get_ad_group_apiendpoint, data)
}
export function getListCampaign(data) {
  return BaseApiService.get(campaign.get_list_campaign_apiendpoint, data)
}
export function getListAppCampaign(data) {
  return BaseApiService.get(campaign.get_list_app_campaigns_apiendpoint, data)
}
export function getListCountry(data) {
  return BaseApiService.get(campaign.get_list_country_apiendpoint, data)
}
export function getListLocation(data) {
  return BaseApiService.get(campaign.get_list_location_apiendpoint, data)
}
export function getListLanguage(data) {
  return BaseApiService.get(campaign.get_list_language_apiendpoint, data)
}
export function getListDevice(data) {
  return BaseApiService.get(campaign.get_list_device_apiendpoint, data)
}
export function bidDetailsCalcEstimate(data) {
  return BaseApiService.post(campaign.bid_details_calc_estimate_apiendpoint, { value: data.bidValue })
}
export function probabilityOfPurchaseEstimate(data) {
  return BaseApiService.post(campaign.probability_purchase_calc_estimate_apiendpoint, { value: data.gradeBid })
}
/* end campaign management */
