import { CampaignManagementConstants, AutomaticallyOptimizeConversion, ALL, ONE_DAY } from '@/common/constants'
export default {
  campaignsReporting: {},

  /* campaign management */
  stepActive: 1,
  industryValue: '',
  unitCurrency: 'KRW',
  timeZone: '(GMT +09:00) Seoul',
  dataCreateCampaign: {
    campaignGoal: '',
    targetingType: '',
    isTrackingTag: false,

    adGroupName: {
      setExtraGroup: false,
      name: '',
      id: ''
    },

    campaignName: {
      useCampaignSetting: false,
      name: '',
      id: ''
    },

    landingUrl: {
      url: '',
      setAboutApp: {
        status: false,

        android: {
          appId: '',
          countryId: '',
          appIdCheck: '',
          partyTrackingId: '',
          urlApp: '',
          urlPattern: {
            status: false,
            url: ''
          },
          urlPromotion: {
            status: false,
            url: ''
          }
        },

        ios: {
          appId: '',
          countryId: '',
          appIdCheck: '',
          partyTrackingId: '',
          urlApp: '',
          urlPattern: {
            status: false,
            url: ''
          },
          urlPromotion: {
            status: false,
            url: ''
          }
        }
      }
    },
    premiumCampaign: false,
    location: {
      value: CampaignManagementConstants.LOCATION.DEFAULT,
      selected: []
    },
    language: {
      value: CampaignManagementConstants.LANGUAGE.ALL,
      selected: []
    },

    budget: {
      value: '',
      limitedTime: CampaignManagementConstants.BUDGET.LIMITED_TIME_TYPE.PER_DAY,
      dailyBudgetOption: false,
      distribution: CampaignManagementConstants.BUDGET.DISTRIBUTION_TYPE.ACCELERATED,
      liveTimeOfCampaign: CampaignManagementConstants.BUDGET.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY,
      start: {
        date: '',
        time: ''
      },
      end: {
        noEnd: true,
        date: '',
        time: ''
      }
    },
    probabilityOfPurchases: [...new Array(20)].reduce((accumulator, currentValue, k) => {
      accumulator[`g${k}`] = {
        gradeBid: '',
        group: '',
        targetUV: '',
        convRate: '',
        visitUV: '',
        convUV: '',
        appearedUser: ''
      }
      return accumulator
    }, {}),

    bidDetails: {
      valueType: 'CPM',
      bidValue: '',
      estimateMonthlyClick: 10,
      estimateImpressionsClick: 1000,
      estimateMonthlySpend: 1000
    },
    targetGroupControlA: {
      limitExposeAdsToUser: false,
      circuitSetting: 0,
      circuitLiveTime: '',
      excludeCustomerWhoVisitedHomepage: false,
      disableAllOptionSetForEnforcementWithExposedAds: false
    },
    targetGroupControlB: {
      advertisementDeliveryCondition: ALL,
      timePeriodForActivityHistory: ONE_DAY,
      timePeriodForSendingAdsToUser: ONE_DAY
    },
    automaticallyOptimizeConversion: {
      value: AutomaticallyOptimizeConversion.conversion,
      conversionCustom: []
    }

  },
  listAdGroup: [],
  listCampaign: [],
  listIosApp: [],
  listAndroidApp: [],
  listCountry: [],
  listLocation: [],
  listLanguage: [],
  listDevice: [],
  bidDetailsMinMax: {
    min: 0,
    max: 10000
  }

  /* end campaign management */

}
