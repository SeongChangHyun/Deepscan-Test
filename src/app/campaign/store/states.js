import {
  CampaignManagementConstants,
  AutomaticallyOptimizeConversion,
  ALL,
  LEAD_TARGETING_COVERAGE,
  STRING_NUMBER
} from '@/common/constants'
export default {
  campaignsReporting: {},
  dataFilterSelection: '',

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
          app_icon: '',
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
          app_icon: '',
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
    targetConversionType: {
      segmentSelected: [],
      typeSelected: []
    },

    bidDetails: {
      valueType: 'CPM',
      bidValue: '',
      estimateMonthlyClick: 10,
      estimateImpressionsClick: 1000,
      estimateMonthlySpend: 1000
    },
    automaticallyOptimizeConversion: {
      value: AutomaticallyOptimizeConversion.conversion,
      conversionCustom: []
    },
    carrier: {
      value: CampaignManagementConstants.LANGUAGE.ALL,
      selected: []
    },
    browser: {
      is_all: STRING_NUMBER.ONE,
      allows: [],
      blocks: []
    },
    customUserGroup: {
      value: CampaignManagementConstants.LANGUAGE.ALL,
      selected: []
    },
    manufacture: {
      value: CampaignManagementConstants.LANGUAGE.ALL,
      selected: []
    },

    // new form data
    client_id: 42954,
    g_type: '',
    c_type: '',
    campaign_group: {
      campaign_group_id: 0,
      campaign_group_name: '',
      client_id: 17924
    },
    campaign_name: 'VN Test',
    landing_url: '',
    client_apps: [
    ],
    campaign_location: {
      location_type: CampaignManagementConstants.LOCATION.DEFAULT,
      location: []
    },
    campaign_language: {
      selected_language_type: CampaignManagementConstants.LANGUAGE.ALL,
      language_list: []
    },

    campaign_device_id: ALL,
    campaign_budget: {
      budget_type: 0,
      budget_count: 0,
      budget_expenses_distribute: 0,
      type: CampaignManagementConstants.BUDGET.LIVE_TIME_OF_CAMPAIGN_TYPE.LIVE_AD_FROM_TODAY,
      period: {
        date_from: '',
        date_to: ''
      },
      budge_dates: [
        {
          date: 'MONDAY',
          count: ''
        },
        {
          date: 'TUESDAY',
          count: ''
        },
        {
          date: 'WEDNESDAY',
          count: ''
        },
        {
          date: 'THURSDAY',
          count: ''
        },
        {
          date: 'FRIDAY',
          count: ''
        },
        {
          date: 'SATURDAY',
          count: ''
        },
        {
          date: 'SUNDAY',
          count: ''
        }
      ]
    },
    bid_detail: {
      bid_type: 1,
      bid: 0
    },
    target_group_ctrl_a: {
      is_limit_impression: true,
      is_exclude_customer: true,
      is_disable_all_options: false,
      impression_count: 0,
      circuit_live_time: '1d'
    },
    target_group_ctrl_b: {
      value: 1,
      activity_history_period: '1d',
      sending_ads_period: '1d'
    },
    target_conversion_type: {
      conversion_segments: [
        {
          'conversion_orders': 2
        }
      ],
      conversion_type: [
        {
          'tracking_tag_id': 43534,
          'is_checked': true
        }
      ]
    },
    'grade_bids': [
      {
        'grade_bid': 12,
        'group': 0
      }
    ],
    'optimize_conversion': {
      'selected_type': 3,
      'conversion_types': [
        {
          'tracking_tag_id': 43534,
          'is_checked': true
        }
      ]
    },
    lead_targeting_range: {
      coverage: LEAD_TARGETING_COVERAGE.TOP,
      impression: false
    },
    article_topics: [],
    user_interest_directory: [],
    keywords: [],
    demographic: {
      is_all: STRING_NUMBER.ONE,
      gender: [],
      age_levels: [],
      income_level: []
    },
    feed_base_user_targeting: [],
    campain_product_filtering: {
      product_filter_type: 0,
      products: []
    },
    impression_capping: {
      limit_user: '',
      daily_capping: '1d',
      session_capping: '',
      display_time: '1d',
      is_display_product: false,
      is_display_product_category: false,
      weight: '',
      weight_rs: ''
    },
    advertising_position: [],
    Ip_addresses: [],
    os: [],
    behavior_site_visit: {
      window: '',
      radio: CampaignManagementConstants.BEHAVIOR_TYPE.ALL,
      behavior_site: [],
      allowed: [],
      blocked: []
    },
    forecast_conversion: {
      from: 0,
      to: 19
    },
    schedule: '',
    fixed_date: []
  },
  errorCampaign: {
    adGroupName: false,
    campaignName: false,
    location: false,
    language: false,
    landingUrl: false,
    budget: false,
    targetConversionType: false
  },
  dataMatCreatives: {
    ifoCampaign: {
      campaignName: 'Campaign Name',
      adGroupName: 'AdGroup Name'
    },
    estimatedUV: '000,000,000~000,000,000'
  },
  listAdGroup: [],
  listCampaign: [],
  listIosApp: [],
  listAndroidApp: [],
  listCountry: [],
  listLocation: [],
  listLanguage: [],
  listDevice: [],
  listTrackingConversationType: [],
  listSiteBehaviors: [],
  listProbabilityGrades: [],
  listProductFeedCategoryCpc: [],
  listTrackingCompanies: [],
  calculatedForecastOfConversion: {},
  bidDetailsMinMax: {
    min: 0,
    max: 10000
  },
  listUserInterestDirectories: [],
  listArticleTopicDirectory: [],
  revenueRange: {},
  listCarrier: [],
  listBrowser: [],
  listCustomUserGroup: [],
  listManufactures: [],
  listProductFeed: [],
  listProducts: [],
  listOS: [],
  /* end campaign management */

  /* campaign report */
  setOfColumns: [],
  listColumns: [],
  statusFilterType: {},
  isReloadCampainReport: false
  /* end campaign report */

}
