import Rest from '@/services/restAdapter'
import { position } from '@/common/apiUrlConfig'

export default class KeywordApiService extends Rest {
  verifyPosition({ site_name = '', is_allow = true }) {
    return this.post(position.verify, { site_name, is_allow })
  }
}
