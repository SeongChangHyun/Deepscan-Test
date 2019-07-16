import Rest from '@/services/restAdapter'
import { list } from '@/common/apiUrlConfig'

export default class KeywordApiService extends Rest {
  verifyKeywords(inputKeyword) {
    return this.post(list.verify_keyword, inputKeyword)
  }
}
