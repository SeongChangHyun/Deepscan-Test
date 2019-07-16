import {
  TargetingReportMutationType
} from './actionsTypes'

export default {
  [TargetingReportMutationType.GET_CREATIVES_REPORTING_IN_PROGRESS]: (state, payload) => {
    state.creativesReporting = payload
  },
  [TargetingReportMutationType.GET_CREATIVE_REPORTING_SUCCESS]: (state, payload) => {
    state.creativesReporting = payload
  },
  [TargetingReportMutationType.GET_CREATIVE_REPORTING_FAILED]: (state, payload) => {
    state.creativesReporting = null
  },
  [TargetingReportMutationType.GET_USER_INTEREST_IN_PROGRESS]: (state, payload) => {
    state.userInterest = payload
  },
  [TargetingReportMutationType.GET_USER_INTEREST_SUCCESS]: (state, payload) => {
    state.userInterest = payload
  },
  [TargetingReportMutationType.GET_USER_INTEREST_FAIL]: (state, payload) => {
    state.userInterest = []
  }
}
