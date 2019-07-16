import Rest from '@/services/restAdapter'
import { clients, report } from '@/common/apiUrlConfig'
/**
 * @typedef  {ClientApiService}
 */
export default class ClientApiService extends Rest {
  static resource = Rest.resource + '/clients'
  getIndustry() {
    return this.get(clients.get_industry)
  }
  bidDetailsCalcEstimate(data) {
    return this.post(clients.bid_details_calc_estimate, { value: data.bidValue })
  }
  probabilityOfPurchaseEstimate(data) {
    return this.post(clients.probability_purchase_calc_estimate, { value: data.gradeBid })
  }

  getCheckingTag() {
    return this.get(clients.get_checking_tag_apiendpoint)
  }
  getListAdGroup(data) {
    return this.get(clients.get_ad_group_apiendpoint, data)
  }
  getListProductFeed(data) {
    return this.get(clients.product_feed, data)
  }
  getListProducts({ product_feed_id, ...rest }) {
    return this.get(clients.products.replace('{product_feed_id}', product_feed_id), rest)
  }
  getBidEstimate({ bid_type, bid }) {
    return this.get(clients.bid_monthly_estimation, { bid_type, bid })
  }

  /* Campaign APIs */
  getListCampaign(data) {
    return this.get(clients.campaign.get_list_campaigns, data)
  }
  getCampaignGroups(data) {
    return this.get(clients.campaign.get_campaign_groups, data)
  }
  getCampaignApps(data) {
    return this.get(clients.campaign.get_list_app_campaigns, data)
  }
  /* Report APIs */
  getCampaignReporting(data) {
    return this.post(clients.reports.campaigns, data)
  }
  getDailyReporting(data) {
    return this.post(clients.reports.daily, data, { keyWord: data.keyWord })
  }
  /* ci list */
  getCreativeImages() {
    return this.get(clients.creative.get_ci)
  }
  deleteCreativeImages(creativeImages) {
    return this.post(clients.creative.delete_ci, creativeImages)
  }
  activateCreativeImages(creativeImages) {
    return this.post(clients.creative.activate_ci, creativeImages)
  }
  deactivateCreativeImages(creativeImages) {
    return this.post(clients.creative.deactivate_ci, creativeImages)
  }
  getImageSizesByAccount() {
    return this.get(clients.creative.get_image_sizes_by_account)
  }
  createCreativeImages(creativeImages) {
    return this.post(clients.creative.create_creative_images, creativeImages)
  }

  /* end ci list */
  /* Get list creatives */
  getCreative() {
    return this.get(clients.creative.get_creative)
  }
  updateDynamicCreative(data) {
    return this.post(clients.creative.update_dynamic_creative, data)
  }
  /* end get list creatives */

  /* Daily Report */
  getListDailyReports(data) {
    return this.post(report.get_list_daily_report, data)
  }
  /* End Daily Report */
  getListClientUser() {
    return this.get(clients.client_management.list_users)
  }
  getRevenueRange() {
    return this.get(clients.revenue_range)
  }
  getListCustomUserGroup() {
    return this.get(clients.custom_user_groups)
  }
  /* service manage api */
  getListService(params) {
    return this.get(clients.service_manage, params)
  }
  getListAccountForCurrentUser() {
    return this.get(clients.get_account_for_current_user)
  }
  // Client manage
  assignRoleForUserInClientManage(data) {
    return this.post(clients.client_management.assign_role_for_user, data)
  }
  getClientsByCreateAccount() {
    return this.get(clients.get_client_by_create_account)
  }
}
