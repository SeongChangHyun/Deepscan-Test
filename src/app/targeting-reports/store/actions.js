import apiServices from '@/app/services/reportApiService'
import campaignApiServices from '@/app/services/clientApiService'
import { TargetingReportMutationType } from './actionsTypes'

const ReportApiService = apiServices.build()
const ClientApiServices = campaignApiServices.build()

export default {
  getListCampaign({ commit }, { is_default, callback }) {
    return ClientApiServices.getListCampaign(is_default)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  getUserInterest({ commit }, campaign_id) {
    commit(TargetingReportMutationType.GET_USER_INTEREST_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ReportApiService.getUserInterest(campaign_id).then(response => {
        commit(TargetingReportMutationType.GET_USER_INTEREST_SUCCESS, response)
        resolve()
      }).catch(error => {
        commit(TargetingReportMutationType.GET_USER_INTEREST_FAIL, error)
        reject(error)
      })
    })
  },
  getCreativesReportingData({ commit }) {
    commit(TargetingReportMutationType
      .GET_CREATIVES_REPORTING_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ReportApiService.getCreativesReportingData()
        .then(response => {
          const { data } = response
          commit(TargetingReportMutationType
            .GET_CREATIVE_REPORTING_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(TargetingReportMutationType
            .GET_CREATIVE_REPORTING_FAILED, error)
          reject(error)
        })
    })
  },
  getTimeAndDayReportingData({ commit }, params) {
    commit(TargetingReportMutationType
      .GET_CREATIVES_REPORTING_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ReportApiService.getTimeAndDayReportingData(params)
        .then(response => {
          const { data } = response
          commit(TargetingReportMutationType
            .GET_CREATIVE_REPORTING_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(TargetingReportMutationType
            .GET_CREATIVE_REPORTING_FAILED, error)
          reject(error)
        })
    })
  }
}
