import { GetCampaignMutationType, SelectDateFilterSelectionType, CampaignManagementMutationType, CampaignReportMutationType } from './mutationTypes'
export default {
  [GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS]: (state, payload) => {
    state.campaignsReporting = payload
    state.isReloadCampainReport = true
  },
  [GetCampaignMutationType.GET_CAMPAIGN_SUCCESS]: (state, payload) => {
    state.campaignsReporting = payload
    state.isReloadCampainReport = false
  },
  [GetCampaignMutationType.GET_CAMPAIGN_FAILED]: (state, payload) => {
    state.campaignsReporting = null
    state.isReloadCampainReport = false
  },
  [SelectDateFilterSelectionType.SELECT_DATE_FILTER_SELECTION]: (state, payload) => {
    state.dataFilterSelection = payload
  },
  [SelectDateFilterSelectionType.UPDATE_STATUS_FILTER_TYPE]: (state, payload) => {
    state.statusFilterType = payload
  },
  /* campaign management */
  [CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA]: (state, payload) => {
    state.dataCreateCampaign = { ...state.dataCreateCampaign, ...payload }
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_CAMPAIGN_NAME]: (state, payload) => {
    state.dataCreateCampaign.campaign_name = payload
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
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_OS]: (state, payload) => {
    state.listOS = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CARRIER]: (state, payload) => {
    state.listCarrier = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_BROWSER]: (state, payload) => {
    state.listBrowser = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CUSTOM_USER_GROUP]: (state, payload) => {
    state.listCustomUserGroup = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_MANUFACTURES]: (state, payload) => {
    state.listManufactures = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT_FEED]: (state, payload) => {
    state.listProductFeed = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT]: (state, payload) => {
    state.listProducts = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_DEVICE]: (state, payload) => {
    state.listDevice = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_GET_PROBABILITY_OF_PURCHASE]: (state, payload) => {
    state.dataCreateCampaign.probabilityOfPurchases[payload.key] = payload.data
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_ERROR_CAMPAIGN]: (state, payload) => {
    state.errorCampaign = { ...state.errorCampaign, ...payload }
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_TRACKING_COMPANIES]: (state, payload) => {
    state.listTrackingCompanies = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_TRACKING_CONVERSATION_TYPE]: (state, payload) => {
    state.listTrackingConversationType = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_SITE_BEHAVIORS]: (state, payload) => {
    state.listSiteBehaviors = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PROBABILITY_GRADES]: (state, payload) => {
    state.listProbabilityGrades = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT_FEED_CATEGORY_CPC]: (state, payload) => {
    state.listProductFeedCategoryCpc = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_FORECAST_OF_CONVERSION_CALCULATED]: (state, payload) => {
    state.calculatedForecastOfConversion = payload
  },
  [CampaignManagementMutationType.SET_DATA_LIST_USER_INTEREST_DIRECTORIES]: (state, payload) => {
    state.listUserInterestDirectories = payload
  },
  [CampaignManagementMutationType.SET_DATA_LIST_ARTICLE_TOPIC_DIRECTORY]: (state, payload) => {
    state.listArticleTopicDirectory = payload
  },
  [CampaignManagementMutationType.CAMPAIGN_CREATION_SET_REVENUE_RANGE]: (state, payload) => {
    state.revenueRange = payload
  },
  /* campaign management end */

  /* campaign report */
  [CampaignReportMutationType.CAMPAIGN_REPORT_GET_SET_OF_COLUMNS]: (state, payload) => {
    state.setOfColumns = payload
  },
  [CampaignReportMutationType.CAMPAIGN_REPORT_GET_LIST_COLUMNS]: (state, payload) => {
    state.listColumns = payload
  },
  [CampaignReportMutationType.CAMPAIGN_REPORT_DELETE_SET_OF_COLUMNS]: (state, payload) => {
    state.listColumns = payload
  }
  /* end campaign report */
}
