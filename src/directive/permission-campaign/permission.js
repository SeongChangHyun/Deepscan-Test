
import store from '@/store'
import { targetingTypeList, userTypeRules } from '@/app/campaign/campaign-management/create-campaign-container/campaignConfig.json'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    // const roles = store.getters && store.getters.roles
    const { campaign = {}} = store.state
    const { dataCreateCampaign = {}} = campaign
    const { targetingType } = dataCreateCampaign
    const userType = 'superAdmin'

    if (value && targetingType) {
      const roleuserType = userTypeRules[userType]
      if (roleuserType['*'] || roleuserType[value]) {
        const roleTargetingType = targetingTypeList[targetingType].rules
        if (roleTargetingType['*'] || roleTargetingType[value]) return true
      }
      // el.style.display = 'none'
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      // throw new Error(`need roles! Like v-permission-campaign="'location'"`)
    }
  }
}
