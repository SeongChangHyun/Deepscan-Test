import Rest from '@/services/restAdapter'
import { campaigns } from '@/common/apiUrlConfig'

export default class CampaignApiService extends Rest {
  gradeBidCalc({ group, grade_bid }) {
    return this.get(campaigns.grade_bid_calc, { group, grade_bid })
  }
}
