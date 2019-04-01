import { getCampaings } from '../apiServices'
import { GetCampaignMutationType } from './actionsTypes'
export default {
  getCampaigns({ commit }) {
    commit(GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getCampaings()
        .then(response => {
          const data = response.data
          commit(GetCampaignMutationType.GET_CAMPAIGN_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(GetCampaignMutationType.GET_CAMPAIGN_FAILED, error)
          reject(error)
        })
    })
  }
}
