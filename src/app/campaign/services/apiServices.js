import BaseApiService from '@/utils/baseApiService'
import { campaign } from '@/common/apiUrlConfig'

export function getCampaings() {
  return BaseApiService.get(campaign.get_campaign_apiendpoint)
}

/* campaign management */
export function getCheckingTag() {
  return BaseApiService.get(campaign.get_checking_tag_apiendpoint)
}
export function getIndustry() {
  return BaseApiService.get(campaign.get_industry_apiendpoint)
}
export function getListAdGroup() {
  return BaseApiService.get(campaign.get_ad_group_apiendpoint)
}
export function getListCampaign() {
  return BaseApiService.get(campaign.get_list_campaign_apiendpoint)
}
export function getListIosApp() {
  return BaseApiService.get(campaign.get_list_ios_app_apiendpoint)
}
export function getListAndroidApp() {
  return BaseApiService.get(campaign.get_list_android_app_apiendpoint)
}
export function getListCountry() {
  return BaseApiService.get(campaign.get_list_country_apiendpoint)
}
export function getListLocation() {
  return BaseApiService.get(campaign.get_list_location_apiendpoint)
}
export function getListLanguage() {
  return BaseApiService.get(campaign.get_list_language_apiendpoint)
}
export function getListDevice() {
  return BaseApiService.get(campaign.get_list_device_apiendpoint)
}
export function bidDetailsCalcEstimate(data) {
  return BaseApiService.post(campaign.bid_details_calc_estimate_apiendpoint, { value: data.bidValue })
}
/* end campaign management */
