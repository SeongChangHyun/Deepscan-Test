import { PerformanceReportMutationTypes } from './mutationTypes'
import apiServices from '@/app/services/accountApiService'

const AccountApiServices = apiServices.build()

export default {
  getPerformanceReportData({ commit }, params) {
    commit(PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      AccountApiServices.getPerformanceReport(params)
        .then(response => {
          if (response && response.data) {
            const data = response.data
            commit(PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_SUCCESS, data)
            resolve(response)
          } else {
            commit(PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_FAILED, response)
            return reject()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
