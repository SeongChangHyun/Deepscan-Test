import { PerformanceReportMutationTypes } from './mutationTypes'
export default {
  [PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_IN_PROGRESS]: (state, payload) => {
    state.performanceReportData = payload
    state.isReloadPerformanceReport = true
  },
  [PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_SUCCESS]: (state, payload) => {
    state.performanceReportData = payload
    state.isReloadPerformanceReport = false
  },
  [PerformanceReportMutationTypes.GET_PERFORMANCE_REPORT_FAILED]: (state, payload) => {
    state.campaignsReporting = null
    state.isReloadPerformanceReport = false
  }
}
