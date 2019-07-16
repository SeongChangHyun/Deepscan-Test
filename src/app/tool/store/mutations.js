import { GetFeedSettingType, GetListCollectedInformationType, TrackingTagsType, StateSummaryType } from './mutationTypes'
export default {
  [GetFeedSettingType.GET_FEED_SETTING_IN_PROGRESS]: (state, payload) => {
    state.feedSetting = payload
  },
  [GetFeedSettingType.GET_FEED_SETTING_SUCCESS]: (state, payload) => {
    state.feedSetting = payload
  },
  [GetFeedSettingType.GET_FEED_SETTING_FAILED]: (state, payload) => {
    state.feedSetting = []
  },
  [GetListCollectedInformationType.GET_COLLECTED_INFORMATION_IN_PROGRESS]: (state, payload) => {
    state.collectedInformation = payload
  },
  [GetListCollectedInformationType.GET_COLLECTED_INFORMATION_SUCCESS]: (state, payload) => {
    state.collectedInformation = payload
  },
  [GetListCollectedInformationType.GET_COLLECTED_INFORMATION_FAILED]: (state, payload) => {
    state.collectedInformation = []
  },
  [TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_STATUS]: (state, payload = true) => {
    state.trackingTags.isLoadingStatus = payload
  },
  [TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_VERIFY]: (state, payload = true) => {
    state.trackingTags.isLoadingVerify = payload
  },
  [TrackingTagsType.UPDATE_TRACKING_TAGS_STATUS]: (state, payload) => {
    state.trackingTags.isLoadingStatus = false
    state.trackingTags.status = payload
  },
  [TrackingTagsType.UPDATE_TRACKING_TAGS_VERIFY]: (state, payload) => {
    state.trackingTags.isLoadingVerify = false
    state.trackingTags.verify = payload
  },
  [TrackingTagsType.GET_ALL_TRACKING_TAGS_SUCCESS]: (state, payload) => {
    state.trackingTags.listData = payload
  },
  [TrackingTagsType.GET_COLLECTED_INFORMATION_FAILED]: (state) => {
    state.trackingTags.listData = []
  },
  [TrackingTagsType.CREATE_TRACKING_TAG_SUCCESS]: (state, payload) => {
    state.trackingTags.createdTrackingTag = payload
  },
  [TrackingTagsType.CREATE_TRACKING_TAG_FAILED]: (state) => {
  },
  [StateSummaryType.UPDATE_FEED_SUMMARY_DATA_SUCCESS]: (state, payload) => {
    state.feedSummaryData = payload
  },
  [StateSummaryType.UPDATE_FEED_SUMMARY_DATA_FAIL]: (state, payload) => {
    state.feedSummaryData = []
  },
  [StateSummaryType.UPDATE_PRODUCT_LIST_DATA_SUCCESS]: (state, payload) => {
    state.productListData = payload
  },
  [StateSummaryType.UPDATE_PRODUCT_LIST_DATA_FAIL]: (state, payload) => {
    state.productListData = {}
  },
  [StateSummaryType.UPDATE_SUGGEST_LIST_DATA_SUCCESS]: (state, payload) => {
    state.suggestListData = payload
  },
  [StateSummaryType.UPDATE_SUGGEST_LIST_DATA_FAIL]: (state, payload) => {
    state.suggestListData = {}
  }
}
