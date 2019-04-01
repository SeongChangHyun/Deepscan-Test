import { CampaignManagementConstants } from '@/common/constants'
export default {
  campaigns: [],

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
      value: 'default',
      selected: []
    },
    language: {
      value: 'default',
      selected: []
    },

    budget: {
      value: '',
      limitedTime: CampaignManagementConstants.BUDGET.LIMITED_TIME_TYPE.PER_DAY,
      dailyBudgetOption: false,
      distribution: CampaignManagementConstants.BUDGET.DISTRIBUTION_TYPE.STANDARD,
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

    bidDetails: {
      valueType: 'CPM',
      bidValue: '',
      estimateMonthlyClick: 10,
      estimateImpressionsClick: 1000,
      estimateMonthlySpend: 1000
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
