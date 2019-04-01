import { GetCampaignMutationType, CampaignManagementMutationType } from './mutationTypes'
export default {
  [GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS]: (state, payload) => {
    state.campaign = payload
  },
  [GetCampaignMutationType.GET_CAMPAIGN_SUCCESS]: (state, payload) => {
    state.campaign = payload
  },
  [GetCampaignMutationType.GET_CAMPAIGN_SUCCESS]: (state, payload) => {
    state.campaign = payload
  },

  /* campaign management */
  [CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA]: (state, payload) => {
    state.dataCreateCampaign = { ...state.dataCreateCampaign, ...payload }
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_NEXT_STEP]: (state, payload) => {
    state.stepActive = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_INDUSTRY]: (state, payload) => {
    state.industryValue = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CAMPAIGN]: (state, payload) => {
    state.listCampaign = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_AD_GROUP]: (state, payload) => {
    state.listAdGroup = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_IOS_APP]: (state, payload) => {
    state.listIosApp = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_ANDROID_APP]: (state, payload) => {
    state.listAndroidApp = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_COUNTRY]: (state, payload) => {
    state.listCountry = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LOCATION]: (state, payload) => {
    state.listLocation = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LANGUAGE]: (state, payload) => {
    state.listLanguage = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_DEVICE]: (state, payload) => {
    state.listDevice = payload
  }
  /* campaign management end */
}
