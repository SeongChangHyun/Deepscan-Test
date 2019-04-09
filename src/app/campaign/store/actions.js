import {
  getCampaignReportingData,
  getCheckingTag,
  getIndustry,
  getListCampaign,
  getListAdGroup,
  getListAppCampaign,
  getListCountry,
  getListLocation,
  getListLanguage,
  getListDevice,
  bidDetailsCalcEstimate,
  probabilityOfPurchaseEstimate
} from '../services/apiServices'
import { MobileOsType } from '@/common/constants'
import { GetCampaignMutationType, CampaignManagementMutationType } from './mutationTypes'
export default {
  getCampaignReportingData({ commit }, clientId) {
    commit(GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getCampaignReportingData(clientId)
        .then(response => {
          if (response && response.data) {
            const data = response.data
            commit(GetCampaignMutationType.GET_CAMPAIGN_SUCCESS, data)
            resolve()
          } else {
            commit(GetCampaignMutationType.GET_CAMPAIGN_FAILED, response)
            reject(response)
          }
        })
        .catch(error => {
          commit(GetCampaignMutationType.GET_CAMPAIGN_FAILED, error)
          reject(error)
        })
    })
  },

  /* campaign management  */
  setDataCreateCampaign({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, data)
  },
  setDeepDataCreateCampaign({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA_DEEP, data)
  },
  nextStep({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_NEXT_STEP, data)
  },
  setTrackingTag({ commit }) {
    return getCheckingTag()
      .then(res => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, { isTrackingTag: !!res.data })
      })
      .catch(() => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, { isTrackingTag: false })
      })
  },
  setIndustry({ commit }) {
    return getIndustry()
      .then(res => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_INDUSTRY, res.data.industry_name)
      })
  },
  loadListCampaign({ commit }, data) {
    return getListCampaign(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CAMPAIGN, res.data)
    })
  },
  loadListAdGroup({ commit }, data) {
    return getListAdGroup(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_AD_GROUP, res.data)
    })
  },
  loadListAppCampaign({ commit }, data) {
    return getListAppCampaign(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_IOS_APP, res.data.filter(v => v.os === MobileOsType.IOS))
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_ANDROID_APP, res.data.filter(v => v.os === MobileOsType.ANDROID))
    })
  },
  loadListCountry({ commit }, data) {
    return getListCountry(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_COUNTRY, res.data)
    })
  },
  loadListLocation({ commit }, data) {
    return getListLocation(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LOCATION, res.data)
    })
  },
  loadListLanguage({ commit }, data) {
    return getListLanguage(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LANGUAGE, res.data)
    })
  },
  loadListDevice({ commit }, data) {
    return getListDevice(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_DEVICE, res.data)
    })
  },
  bidDetailsCalcEstimate({ commit }, data) {
    return bidDetailsCalcEstimate(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, { bidDetails: { ...data, ...res.data }})
    })
  },
  probabilityOfPurchaseEstimate({ commit }, data) {
    return probabilityOfPurchaseEstimate(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_GET_PROBABILITY_OF_PURCHASE, { key: data.key, data: { ...data.data, ...res.data }})
    })
  }
  /* campaign management end */
}
