import Rest from '@/services/restAdapter'
import { list } from '@/common/apiUrlConfig'

export default class ListApiService extends Rest {
  getListUserInterestDirectories(payload) {
    return this.get(list.user_interest_directories, payload)
  }
  getListArticleTopicDirectory(payload) {
    return this.get(list.article_topics, payload)
  }
  getListTrackingCompanies() {
    return this.get(list.get_list_tracking_companies)
  }
  getListCarrier() {
    return this.get(list.carriers)
  }
  getListBrowser() {
    return this.get(list.browsers)
  }
  getListManufactures() {
    return this.get(list.manufactures)
  }
  getListDevice(data) {
    return this.get(list.get_list_device, data)
  }
  getListLanguage(data) {
    return this.get(list.get_list_language, data)
  }
  getListOSs(data) {
    return this.get(list.get_list_os, data)
  }
  getListLocation(data) {
    return this.get(list.get_list_location, data)
  }
  getListCountry(data) {
    return this.get(list.get_list_country, data)
  }
  getListSiteBehaviors(client_id) {
    return this.get(list.crud_site_behaviors, client_id)
  }
}
