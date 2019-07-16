import RestAdapter from '@/services/restAdapter'
import { clients, accounts } from '@/common/apiUrlConfig'
import { Common } from '@/common/constants'
import data2blob from '@/components/ImageCropper/utils/data2blob.js'

/**
 * @typedef  {AccountApiService}
 */
export default class AccountApiService extends RestAdapter {
  /**
   * @type  {String}
   */
  static resource = RestAdapter.resource + '/accounts'
  activeAccount(data) {
    return this.post(accounts.active_account, data)
  }
  reActiveAccount(data) {
    return this.post(accounts.re_active_account, data)
  }
  businessRegister(data) {
    const formData = new FormData()
    const fileKey = ['bankBookFileData', 'bankLicenseFileData']
    for (const key in data) {
      if (!fileKey.includes(key) && data.hasOwnProperty(key) && data[key] !== '') {
        if (fileKey.includes(`${key}Data`)) {
          const typeFile = data[`${key}Data`].split(';')[0].split(':')[1]
          formData.append(key, data2blob(data[`${key}Data`], typeFile), data[key])
        } else {
          formData.append(key, data[key])
        }
      }
    }
    this.http.headers = {
      'content-type': 'multipart/form-data'
    }
    this.http.defaults.timeout = 30000 // expand 30s to upload file
    return this.post(accounts.business_register, formData)
  }
  personalRegister(data) {
    return this.post(accounts.personal_register, data)
  }
  resetPassword(data) {
    return this.post(accounts.reset_password, data)
  }
  updatePassword(data) {
    return this.post(accounts.update_password, data)
  }
  validateEmail(data) {
    return this.post(accounts.validate_email, data)
  }
  verifyAccount(data) {
    return this.post(accounts.verify, data)
  }
  verifyResetToken(data) {
    return this.post(accounts.verify_reset_token, data)
  }
  sendConfirmationCode(data) {
    return this.post(accounts.send_confirm_code, data)
  }
  checkLicense(data) {
    return this.post(accounts.check_license, data)
  }
  getListBank(params) {
    return this.get(accounts.list_bank, params)
  }
  checkBusinessLicense(data) {
    return this.post(accounts.check_business_license, data)
  }
  checkBankBook(data) {
    return this.post(accounts.check_bankbook, data)
  }
  checkAddress(data) {
    return this.post(accounts.check_address, data)
  }
  getPostalAddresses(params) {
    if (params.country === Common.JAPAN_COUNTRY_CODE) {
      return this.post(accounts.get_postal_addresses_jp, params)
    }
    return this.post(accounts.get_postal_addresses_kr, params)
  }
  checkCodeResetPassword(data) {
    return this.post(accounts.check_code_reset_password, data)
  }

  // My Information Form
  getFullInformationUser(accountId) {
    return this.get(accounts.get_info_by_id)
  }
  checkPhoneNumber(dataPost) {
    return this.post(accounts.create_otp, dataPost)
  }
  verifyTelCode(data) {
    return this.post(accounts.check_code_phone_number, data)
  }
  /* Product Feed/Feed Setting */

  checkFeedFull(params) {
    return this.get(accounts.check_feed_full, params)
  }
  checkFeedUrl(params) {
    return this.get(accounts.check_feed_url, params)
  }
  /* Client Management APIs */
  sendInviteUser(data) {
    return this.post(clients.client_management.send_invite_user, data)
  }
  getListClients(data) {
    return this.get(clients.client_management.get_list_clients, data)
  }
  createClients(data) {
    return this.post(clients.client_management.create_client, data)
  }
  updateClients(data) {
    let url = clients.client_management.get_client_detail
    url = url.replace('{client_id}', data.client_id)
    return this.put(url, data)
  }
  updateStatusOfClient(data) {
    return this.put(clients.client_management.update_status_of_client, data)
  }
  getClientDetail(clientId) {
    let url = clients.client_management.get_client_detail
    if (url.includes('{client_id}') && clientId) {
      url = url.replace('{client_id}', clientId)
    }
    return this.get(url)
  }
  removeUserPermission(data) {
    let url = clients.client_management.remove_user_permission
    url = url.replace('{client_id}', data.clientId)
    const params = { permission: data.permission, remove_account_id: data.removeAccountId, email: data.email }
    return this.delete(url, params)
  }
  getAccountConsignment(clientId) {
    let url = accounts.consignment
    url = url.replace('{client_id}', clientId)
    return this.get(url)
  }
  getAdvertiserTerm() {
    return this.get(clients.client_management.get_advertiser_term)
  }
  updateInformation(data) {
    const listOldKey = [
      'account_id',
      'bank_account_number',
      'bank_name',
      'bank_status',
      'business_license',
      'business_name',
      'business_status',
      'cell_phone',
      'commission_fee',
      'confirmed_password',
      'country_code',
      'email_address',
      'first_name',
      'last_name',
      'login_valid_time',
      'president_first_name',
      'president_last_name',
      'view_currency',
      'phone_code'
    ]
    listOldKey.forEach(element => {
      let tmp = element.split('')
      for (let index = 0; index < tmp.length; index++) {
        const char = tmp[index]
        if (char === '_') {
          if (index + 1 < tmp.length) {
            tmp[index + 1] = tmp[index + 1].toLocaleUpperCase()
          }
          tmp.splice(index, 1)
        }
      }
      tmp = tmp.join('')
      if (Object.getOwnPropertyDescriptor(data, element) !== undefined) {
        Object.defineProperty(data, tmp,
          Object.getOwnPropertyDescriptor(data, element))
      }
    })
    const formData = new FormData()
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        formData.append(key, data[key])
      }
    }
    this.http.headers = {
      'content-type': 'multipart/form-data'
    }
    this.http.defaults.timeout = 30000 // expand 30s to upload file
    return this.post(accounts.update_information, formData)
  }
  verifyTrackingTags() {
    return this.get(accounts.tracking_tags.verify)
  }
  getFeedSummaryData() {
    return this.get(accounts.state_summary.statistics)
  }
  getProductListData(params) {
    return this.get(accounts.state_summary.product_list, params)
  }
  statusTrackingTags(device) {
    return this.get(accounts.tracking_tags.status, { device })
  }
  getListCollectedInformation(params) {
    return this.get(accounts.tracking_tags.information, params)
  }
  downloadCollectedInformation(params) {
    return this.get(clients.tool.download_list_collected, params)
  }
  changeTrackingTagStatus({ trackingTagId, payload }) {
    return this.put(`${accounts.tracking_tags.crud_tracking_tag}/${trackingTagId}/status`, payload)
  }
  createTrackingTag(payload) {
    return this.post(accounts.tracking_tags.crud_tracking_tag, payload)
  }
  getListTrackingConversationType(category) {
    return this.get(accounts.tracking_tags.crud_tracking_tag, { category })
  }
  getAllTrackingTags(params) {
    return this.get(accounts.tracking_tags.crud_tracking_tag, params)
  }
  /* PerformanceReport */
  getPerformanceReport(params) {
    return this.post(accounts.reports.performance, params)
  }
  inviteUserToManageClients(payload) {
    return this.post(accounts.invite_user_to_manage_clients, payload)
  }
  removeUserPermissionWithClient(data) {
    const params = {
      'remove_account_id': data.accountId,
      'permission': data.role,
      'is_inside': data.isInside,
      'ivtEmail': data.ivtEmail
    }
    return this.delete(accounts.remove_user_permission_with_client + data.clientId + '/remove-assoc-invited-client', params)
  }
  updateCommissionFee(payload) {
    return this.post(accounts.update_commission_fee, payload)
  }
  /* Tool Product feed APIs */
  getListFeedSetting(dataPost) {
    return this.get(clients.tool.get_list_feed_setting)
  }
  deleteFeedSetting(params) {
    return this.delete(clients.tool.delete_feed_setting.replace('{feed_id}', params))
  }
  createFeedSetting(params) {
    return this.post(clients.tool.create_feed_setting, params)
  }
  getsettlementDataTableTop(params) {
    return this.get(clients.settlementApi.get_list_table_top, { params })
  }
  getsettlementDataTableBottom(params) {
    return this.get(clients.settlementApi.get_list_table_bottom, { params })
  }
  /* Create creative */
  createFixedBanner(data) {
    return this.post(clients.creative.create_creative_banner, data)
  }
  createDynamicAds(data) {
    return this.post(clients.creative.create_creative_dynamic, data)
  }
  createCreativeAnimated(data) {
    return this.post(clients.creative.create_creative_animated, data)
  }
  createNativeAds(data) {
    return this.post(clients.creative.create_creative_native, data)
  }
  createVideoAds(data) {
    return this.post(clients.creative.create_creative_video, data)
  }
  createCreativeUploadImages(data) {
    return this.post(clients.creative.create_creative_upload_images, data)
  }
  getListCreative(params) {
    return this.post(clients.creative.get_creatives, params)
  }
  deleteCreative(data) {
    return this.post(clients.creative.delete_creative, data)
  }
  changeStatusCreative(data) {
    return this.post(clients.creative.change_status_creative, data)
  }
  getListSizeCreative() {
    return this.get(clients.creative.get_list_size_creative)
  }
/* The end */
}
