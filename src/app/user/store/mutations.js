import { GetCampaignMutationType } from './actionsTypes'
export default {
  [GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS]: (state, payload) => {
    state.campaign = payload
  },
  [GetCampaignMutationType.GET_CAMPAIGN_SUCCESS]: (state, payload) => {
    state.campaign = payload
  },
  [GetCampaignMutationType.GET_CAMPAIGN_SUCCESS]: (state, payload) => {
    state.campaign = payload
  }
}
