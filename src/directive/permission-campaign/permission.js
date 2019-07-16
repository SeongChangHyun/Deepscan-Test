
import store from '@/store'
import { targetingTypeList } from '@/app/campaign/campaign-management/create-campaign-container/campaignConfig.json'
import { checkRole } from '@/common/generatePermission'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    // const roles = store.getters && store.getters.roles
    const {
      campaign = {}
    } = store.state
    const {
      dataCreateCampaign = {}
    } = campaign
    const { c_type } = dataCreateCampaign
    if (value && c_type) {
      if (checkRole(`campaign.campaignManagement.element.create.${value}`)) {
        const roleTargetingType = targetingTypeList[c_type].rules
        if (roleTargetingType['*'] || roleTargetingType[value]) return true
      }
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      // throw new Error(`need roles! Like v-permission-campaign="'location'"`)
    }
  }
}
