export default {
  feedSetting: state => state.feedSetting,
  collectedInformation: state => state.collectedInformation,
  isLoadingStatus: state => state.trackingTags.isLoadingStatus,
  isLoadingVerify: state => state.trackingTags.isLoadingVerify,
  verify: state => state.trackingTags.verify,
  status: state => state.trackingTags.status,
  listData: state => state.trackingTags.listData,
  createdTrackingTag: state => state.trackingTags.createdTrackingTag,
  getFeedSummaryData: state => state.feedSummaryData,
  getProductListData: state => state.productListData,
  getSuggestListData: state => state.suggestListData
}
