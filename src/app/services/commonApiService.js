import Rest from '@/services/restAdapter'
import { list, common, accounts } from '@/common/apiUrlConfig'
import store from '@/store'

/**
 * @typedef  {CommonApiService}
 */
export default class CommonApiService extends Rest {
  getListIndustry() {
    return this.get(list.get_list_industry, { lang: store.getters.language })
  }
  getProbabilityGrades({ c_type, client_id }) {
    return this.get(common.probability_grade, { c_type, client_id })
  }
  getProductFeedCategoryCpc() {
    return this.get(common.product_feed_category_cpc)
  }
  checkFeedType(params) {
    return this.get(accounts.check_feed_type, { url: params })
  }
  calForecastOfConversion(params) {
    return this.get(common.forecast_of_conversion, params)
  }
}
