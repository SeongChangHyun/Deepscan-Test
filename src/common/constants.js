export const Common = {
  FORMAT_DATE_YYYY_MM_DD: 'YYYY-MM-DD',
  FORMAT_DATE_YYYY_MM_DD_2: 'YYYY/MM/DD',
  FORMAT_DAY: 'ddd',
  EN_CODE: 'en',
  JA_CODE: 'ja',
  KO_CODE: 'ko',
  EN_FONT: 'Roboto',
  JA_FONT: 'NotoSansJP',
  KO_FONT: 'NotoSansKR',
  WON_TYPE: 'Won',
  YEN_TYPE: 'Yen',
  DOLLAR_TYPE: 'Dollar',
  AUTHORIZATION_TOKEN: 'client_id:client_secret',
  LOGIN_GRANT_TYPE: 'password',
  REFRESH_GRANT_TYPE: 'password',
  LOGIN_SCOPE: 'openid'
}

export const Schedule = {
  ALWAYS_LIVE: 1,
  LIVE_ACCORDING_TO_SCHEDULE: 2,
  listSchedule: [
    {
      value: 1,
      label: 'Always live'
    },
    {
      value: 2,
      label: 'Live according to schedule'
    }
  ]
}

export const graphFilterColor = {
  one: '#0065b8',
  two: '#02a747',
  three: '#ffb802',
  four: '#b80001'
}

export const CampaignManagementConstants = {
  STEP_SELECT_CAMPAIGN_OBJECTIVES: 1,
  STEP_CREATE_CAMPAIGN: 2,
  STEP_MATCH_CREATIVES: 3,
  TARGETING_TYPE: {
    DEFAULT: 0,
    TARGETED: 1,
    EXCLUDED: 2
  },
  IMPRESSION_CAPPING: {
    INITIALIZE_EVERY: [
      {
        value: 'one_day',
        label: '1 day'
      }, {
        value: 'one_week',
        label: '1 week'
      }, {
        value: 'one_month',
        label: '1 month'
      }
    ]
  },
  FEED_CATEGORY_BASE_USER: {
    INITIALIZE_DATA_TABLE: [
      {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }, {
        price: 2000,
        info: '',
        currency: 'KRW',
        product_count: '',
        average_price: ''
      }
    ]
  },
  BROWSER_TYPE: [
    {
      id: 1,
      name: 'createCampaign.stepCreateCampaign.browser.chrome',
      isCheck: false,
      amount: 9000
    },
    {
      id: 2,
      name: 'createCampaign.stepCreateCampaign.browser.safari',
      isCheck: false,
      amount: 4000
    },
    {
      id: 3,
      name: 'createCampaign.stepCreateCampaign.browser.opera',
      isCheck: false,
      amount: 2000
    },
    {
      id: 4,
      name: 'createCampaign.stepCreateCampaign.browser.microsoftEdge',
      isCheck: false,
      amount: 7000
    },
    {
      id: 5,
      name: 'createCampaign.stepCreateCampaign.browser.microsoftIE',
      isCheck: false,
      amount: 8000
    },
    {
      id: 6,
      name: 'createCampaign.stepCreateCampaign.browser.firefox',
      isCheck: false,
      amount: 1000
    },
    {
      id: 7,
      name: 'createCampaign.stepCreateCampaign.browser.webView',
      isCheck: false,
      amount: 2000
    }
  ],
  OS: {
    OS_TYPE: [
      {
        id: 1,
        name: 'createCampaign.stepCreateCampaign.os.android',
        isCheck: false,
        osVersion: [
          {
            code: 1,
            name: 1
          },
          {
            code: 2,
            name: 2
          },
          {
            code: 3,
            name: 3
          }
        ]
      },
      {
        id: 2,
        name: 'createCampaign.stepCreateCampaign.os.iOsIPad',
        isCheck: false,
        osVersion: [
          {
            code: 1,
            name: 1
          },
          {
            code: 2,
            name: 2
          },
          {
            code: 3,
            name: 3
          }
        ]
      },
      {
        id: 3,
        name: 'createCampaign.stepCreateCampaign.os.iOsIPhone',
        isCheck: false,
        osVersion: [
          {
            code: 1,
            name: 1
          },
          {
            code: 2,
            name: 2
          },
          {
            code: 3,
            name: 3
          }
        ]
      },
      {
        id: 4,
        name: 'createCampaign.stepCreateCampaign.os.windows',
        isCheck: false,
        osVersion: [
          {
            code: 1,
            name: 1
          },
          {
            code: 2,
            name: 2
          },
          {
            code: 3,
            name: 3
          }
        ]
      },
      {
        id: 5,
        name: 'createCampaign.stepCreateCampaign.os.macOs',
        isCheck: false,
        osVersion: [
          {
            code: 1,
            name: 1
          },
          {
            code: 2,
            name: 2
          },
          {
            code: 3,
            name: 3
          }
        ]
      }
    ]
  },
  BUDGET: {
    LIMITED_TIME_TYPE: {
      PER_DAY: 'pd',
      PER_WEEK: 'pw',
      PER_MONTH: 'pm'
    },
    DISTRIBUTION_TYPE: {
      STANDARD: 'standard',
      ACCELERATED: 'accelerated'
    },
    LIVE_TIME_OF_CAMPAIGN_TYPE: {
      LIVE_AD_FROM_TODAY: 'lafd',
      START_AND_END_DATE_SETTING: 'saeds'
    }
  },
  TARGET_GROUP_CONTROL_B: {
    TIME_PERIOD: [
      {
        id: 1,
        name: '1 day',
        value: '1_day'
      },
      {
        id: 2,
        name: '30 minutes ',
        value: '30_minutes'
      },
      {
        id: 3,
        name: '1 hours',
        value: '1_hours'
      },
      {
        id: 4,
        name: '2 hours',
        value: '2_hours'
      },
      {
        id: 5,
        name: '3 hours',
        value: '3_hours'
      },
      {
        id: 6,
        name: '4 hours',
        value: '4_hours'
      },
      {
        id: 7,
        name: '5 hours',
        value: '5_hours'
      },
      {
        id: 8,
        name: '6 hours',
        value: '6_hours'
      },
      {
        id: 9,
        name: '12 hours',
        value: '12_hours'
      }
    ]
  }
}

export const Auth = {
  MAX_LENGTH_PASSWORD: 12,
  MIN_LENGTH_PASSWORD: 8,
  MILISECONDS_OF_DAY: 86400000,
  TYPE_PASSWORD_FIELD: 'password',
  PERSONAL_TYPE: 'personal',
  BUSINESS_TYPE: 'business',
  MAX_SIZE_FILE: 5000000,
  VALID_FILE_EXTENSIONS: ['.pdf', '.jpg', '.gif', '.png'],
  LIST_COUNTRY: [{
    value: 'South Korea',
    label: 'South Korea'
  }, {
    value: 'Japan',
    label: 'Japan'
  }]
}

export const AccountAndBillings = {
  LIFE_TIME_OF_CODE: 180000,
  KOREA_CODE: 'ko',
  KOREA_CURRENCY: 'KRW',
  PHONE_CODE_JP: 'JP +81',
  PHONE_CODE_KO: 'KR +82',
  LIST_TELCOS: [
    '통신사 선택',
    'SKT',
    'KT',
    'LGU+',
    'SKT알뜰폰',
    'KT 알뜰폰',
    'LGU+ 알뜰폰'
  ],
  DISPLAY_LANG: [
    {
      name: 'Korean',
      code: 'ko'
    },
    {
      name: 'Japan',
      code: 'ja'
    },
    {
      name: 'English',
      code: 'en'
    }
  ],
  LIST_CURRENCY: [
    'KWR',
    'USD',
    'YEN',
    'CNY'
  ],
  LIST_VALID_TIME: [
    {
      label: '30 min',
      value: 30
    },
    {
      label: '1 hour',
      value: 60
    },
    {
      label: '2 hour',
      value: 120
    },
    {
      label: '3 hour',
      value: 180
    }
  ]
}

export const CreativeConstant = {
  CREATIVE_BANNER_TYPE: 'banner',
  CREATIVE_ANIMATED_TYPE: 'animated',
  CREATIVE_DYNAMIC_TYPE: 'dynamic',
  CREATIVE_NATIVE_TYPE: 'native',
  CREATIVE_VIDEO_TYPE: 'video',
  OPTIONS_TYPE_DETAIL: 'detail',
  OPTIONS_TYPE_ADVANCED: 'advanced',
  CI_STATUS: {
    ALL: 'All',
    ENABLE: 'Enable',
    AWAIT: 'Await',
    STOP: 'Stop',
    DISABLE: 'Disable'
  },
  CI_STATUS_COLOR: {
    ENABLE: 'green',
    STOP: 'red',
    DEFAULT: 'yellow'
  },
  CI_SIZE: {
    ALL: 'All'
  },
  CI_PAGE_SIZE: [5, 10, 25, 50],
  IMAGE_ACEPT_SIZES: [
    { width: 120, height: 240 }, { width: 120, height: 300 }, { width: 125, height: 125 }, { width: 150, height: 150 },
    { width: 160, height: 600 }, { width: 200, height: 200 }, { width: 234, height: 60 }, { width: 240, height: 240 },
    { width: 250, height: 250 }, { width: 300, height: 50 }, { width: 300, height: 250 }, { width: 300, height: 600 },
    { width: 320, height: 50 }, { width: 320, height: 100 }, { width: 320, height: 480 }, { width: 336, height: 280 },
    { width: 480, height: 60 }, { width: 500, height: 90 }, { width: 655, height: 120 }, { width: 728, height: 90 },
    { width: 750, height: 100 }, { width: 970, height: 90 }, { width: 970, height: 250 }
  ]
}

export const CampaignReporting = {
  CAMPAIGN_STATUS: {
    STANDBY: 'Standby',
    ENABLED: 'Enabled',
    PAUSED: 'Paused',
    DISABLED: 'Disabled'
  }
}
