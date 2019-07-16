import { MobileOsType, CampaignManagementConstants } from '@/common/constants'
import { GetCampaignMutationType, DailyReportMutationType, CampaignManagementMutationType, SelectDateFilterSelectionType } from './mutationTypes'
import router from '@/router'
import { findLastIndex } from 'lodash'
import { Message } from 'element-ui'
import i18n from '@/lang'
import apiServices from '@/app/services/clientApiService'
import commonApiServices from '@/app/services/commonApiService'
import accountApiServices from '@/app/services/accountApiService'
import reportApiServices from '@/app/services/reportApiService'
import listApiService from '@/app/services/listApiService'
import campaignApiService from '@/app/services/campaignApiService'
import { getClientId } from '@/utils/auth'

// Init api services
const ClientApiServices = apiServices.build()
const AccountApiServices = accountApiServices.build()
const ReportApiServices = reportApiServices.build()
const ListApiService = listApiService.build()
const CampaignApiService = campaignApiService.build()
const CommonApiServices = commonApiServices.build()

export default {
  getCampaignReportingData({ commit }, params) {
    commit(GetCampaignMutationType.GET_CAMPAIGN_IN_PROGRESS, {})
    return ClientApiServices.getCampaignReporting(params)
      .then(response => {
        if (response) {
          commit(GetCampaignMutationType.GET_CAMPAIGN_SUCCESS, response)
        } else {
          commit(GetCampaignMutationType.GET_CAMPAIGN_FAILED, response)
        }
      })
      .catch(error => {
        commit(GetCampaignMutationType.GET_CAMPAIGN_FAILED, error)
      })
  },
  selectDataFilterSelection({ commit }, data) {
    commit(SelectDateFilterSelectionType.SELECT_DATE_FILTER_SELECTION, data)
  },
  updateStatusAlowFilterType({ commit }, data) {
    commit(SelectDateFilterSelectionType.UPDATE_STATUS_FILTER_TYPE, data)
  },
  /* campaign management  */
  setDataCreateCampaign({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, data)
  },
  setDefaultNewCampaignName({ commit, state }) {
    const { dataCreateCampaign } = state
    const { g_type, c_type } = dataCreateCampaign
    const campaignName = `${getClientId()}-${g_type}(${c_type})`
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_CAMPAIGN_NAME, campaignName)
  },
  setDeepDataCreateCampaign({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA_DEEP, data)
  },
  nextStep({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_NEXT_STEP, data)
  },
  setTrackingTag({ commit }) {
    return ClientApiServices.verifyTrackingTags()
      .then(res => {
        const data = res || []
        const isTrackingTag = findLastIndex([...(data.mobile || []), ...(data.pc)], o => o.count > CampaignManagementConstants.TRACKING_TAG_LIMIT) > -1
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, { isTrackingTag })
      })
      .catch(() => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, { isTrackingTag: false })
      })
  },
  setIndustry({ commit }) {
    return ClientApiServices.getIndustry()
      .then(res => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_INDUSTRY, res.industry_name)
      })
  },
  loadListCampaign({ commit }, data) {
    return ClientApiServices.getListCampaign(data)
      .then(res => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CAMPAIGN, res)
      })
      .catch(() => {
        Message.error(i18n.t('createCampaign.stepCreateCampaign.adGroupName.getListCampaignError'))
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CAMPAIGN, [])
      })
  },
  loadListAdGroup({ commit }, data) {
    return ClientApiServices.getCampaignGroups(data)
      .then(res => {
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_AD_GROUP, res)
      })
      .catch(() => {
        Message.error(i18n.t('createCampaign.stepCreateCampaign.adGroupName.getListAdGroupError'))
        commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_AD_GROUP, [])
      })
  },
  loadListAppCampaign({ commit }, data) {
    return ClientApiServices.getCampaignApps(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_IOS_APP, res.filter(v => v.os === MobileOsType.IOS))
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_ANDROID_APP, res.filter(v => v.os === MobileOsType.ANDROID))
    })
  },
  loadListCountry({ commit }, data) {
    return ListApiService.getListCountry(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_COUNTRY, res)
    })
  },
  loadListLocation({ commit }, data) {
    return ListApiService.getListLocation(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LOCATION, res)
    })
  },
  loadListLanguage({ commit }, data) {
    return ListApiService.getListLanguage(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_LANGUAGE, res)
    })
  },
  loadListOS({ commit }, data) {
    return ListApiService.getListOSs(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_OS, res)
    })
  },
  loadListCarrier({ commit }, data) {
    return ListApiService.getListCarrier(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CARRIER, res)
    })
  },
  loadListBrowser({ commit }, data) {
    return ListApiService.getListBrowser(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_BROWSER, res)
    })
  },
  loadListCustomUserGroup({ commit }, data) {
    return ClientApiServices.getListCustomUserGroup(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_CUSTOM_USER_GROUP, res)
    })
  },
  loadListManufactures({ commit }, data) {
    return ListApiService.getListManufactures(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_MANUFACTURES, res)
    })
  },
  loadListProductFeed({ commit }, data) {
    return ClientApiServices.getListProductFeed(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT_FEED, res)
    })
  },
  loadProductsInAFeed({ commit }, data) {
    return ClientApiServices.getListProducts(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT, res)
    })
  },
  loadListDevice({ commit }, data) {
    return ListApiService.getListDevice(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_DEVICE, res)
    })
  },
  loadListTrackingCompanies({ commit }, data) {
    return ListApiService.getListTrackingCompanies(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_TRACKING_COMPANIES, res)
    })
  },
  loadListTrackingConversationType({ commit }, data) {
    return AccountApiServices.getListTrackingConversationType(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_TRACKING_CONVERSATION_TYPE, res)
    })
  },
  loadListSiteBehaviors({ commit }, data) {
    return ListApiService.getListSiteBehaviors(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_SITE_BEHAVIORS, res)
    })
  },
  bidDetailsCalcEstimate({ commit }, { bid_type, bid }) {
    return ClientApiServices.getBidEstimate({ bid_type, bid })
    // .then(res => {
    //   commit(CampaignManagementMutationType.CAMPAIGN_CREATION_UPDATE_FORM_DATA, {
    //     bidDetails: {
    //       ...data,
    //       estimateMonthlyClick: res.monthly_click,
    //       estimateImpressionsClick: res.monthly_impression,
    //       estimateMonthlySpend: res.monthly_spend
    //     }
    //   })
    // })
  },
  loadProbabilityGrades({ commit }, data) {
    return CommonApiServices.getProbabilityGrades(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PROBABILITY_GRADES, res)
    })
  },
  loadProductFeedCategoryCpc({ commit }, data) {
    return CommonApiServices.getProductFeedCategoryCpc().then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_LIST_PRODUCT_FEED_CATEGORY_CPC, res)
    })
  },
  calForecastOfConversion({ commit }, data) {
    return CommonApiServices.calForecastOfConversion(data).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_DATA_FORECAST_OF_CONVERSION_CALCULATED, res)
    })
  },
  probabilityOfPurchaseEstimate({ commit }, data) {
    return CampaignApiService.gradeBidCalc({ group: data.type, grade_bid: data.value }).then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_GET_PROBABILITY_OF_PURCHASE, {
        key: data.type,
        data: {
          gradeBid: data.value,
          group: data.type,
          targetUV: res.target_uv,
          convRate: res.conv_rate,
          visitUV: res.visit_uv,
          convUV: res.conv_uv,
          appearedUser: res.appeared_user
        }
      })
    })
  },
  setErrorCampaign({ commit }, data) {
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_ERROR_CAMPAIGN, data)
  },
  loadListUserInterestDirectories({ commit }, data) {
    return ListApiService.getListUserInterestDirectories(data).then(res => {
      commit(CampaignManagementMutationType.SET_DATA_LIST_USER_INTEREST_DIRECTORIES, res || [])
    })
  },
  loadListArticleTopicDirectory({ commit }, payload) {
    return ListApiService.getListArticleTopicDirectory(payload).then(res => {
      commit(CampaignManagementMutationType.SET_DATA_LIST_ARTICLE_TOPIC_DIRECTORY, res || [])
    })
  },
  createCampaign({ commit, state }) {
    const { errorCampaign } = state
    const {
      adGroupName,
      campaignName,
      location,
      language,
      landingUrl,
      budget,
      targetConversionType
    } = state.dataCreateCampaign
    if (!adGroupName.name && !adGroupName.id) {
      errorCampaign.adGroupName = true
    }
    if (!campaignName.name && !campaignName.id) {
      errorCampaign.campaignName = true
    }
    if (!landingUrl.url) {
      errorCampaign.landingUrl = true
    }
    if (location.value === CampaignManagementConstants.LOCATION.CUSTOM && !location.selected.length) {
      errorCampaign.location = true
    }
    if (language.value === CampaignManagementConstants.LOCATION.CUSTOM && !language.selected.length) {
      errorCampaign.language = true
    }
    if (!budget.value) {
      errorCampaign.budget = true
    }
    if (!targetConversionType.segmentSelected.length || !targetConversionType.typeSelected.length) {
      errorCampaign.targetConversionType = true
    }
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_ERROR_CAMPAIGN, errorCampaign)
    commit(CampaignManagementMutationType.CAMPAIGN_CREATION_NEXT_STEP, CampaignManagementConstants.STEP_MATCH_CREATIVES)
    router.push('/campaign/create-campaign/match-creatives')
  },
  getRevenueRange({ commit }) {
    ClientApiServices.getRevenueRange().then(res => {
      commit(CampaignManagementMutationType.CAMPAIGN_CREATION_SET_REVENUE_RANGE, res)
    })
  },
  /* campaign management end */

  /* campaign report */
  loadDefaultColumns({ commit }, { callback }) {
    return ReportApiServices.getDefaultColumns()
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  loadSetOfColumns({ commit }, { report_type, callback }) {
    return ReportApiServices.getSetColumns({ report_type })
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  loadListColumns({ commit }, { id, callback }) {
    return ReportApiServices.getColumns({ id })
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  deleteSetColumns({ commit }, { id, callback }) {
    return ReportApiServices.deleteSetColumns(id)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  loadColumnMaterials({ commit }, { payload, callback }) {
    return ReportApiServices.getColumnsMaterials(payload)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  saveSetColumns({ commit }, { payload, callback }) {
    return ReportApiServices.saveSetColumns(payload)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  /* end campaign report */

  /* daily report*/
  getListCampaign({ commit }, { callback }) {
    return ClientApiServices.getListCampaign()
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  getDailyReportingData({ commit }, { payload, callback }) {
    return ClientApiServices.getDailyReporting(payload)
      .then(response => {
        return callback(null, response)
      })
      .catch(error => {
        return callback(error)
      })
  },
  loadDailySetOfColumns({ commit }, data) {
    return ReportApiServices.getSetColumns(data).then(res => {
      commit(DailyReportMutationType.DAILY_REPORT_GET_SET_OF_COLUMNS, res)
    })
  },
  loadDailyListColumns({ commit }, data) {
    return ReportApiServices.getColumns(data).then(res => {
      commit(DailyReportMutationType.DAILY_REPORT_GET_LIST_COLUMNS, res)
    })
  }
  /* end daily report*/
}
