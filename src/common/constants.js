export const Common = {
  SUPER_ADMIN_ROLE: 'superAdmin',
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
  WON_ICON: '₩',
  YEN_ICON: '¥',
  DOLLAR_ICON: '$',
  AUTHORIZATION_TOKEN: 'client_id:client_secret',
  LOGIN_GRANT_TYPE: 'password',
  REFRESH_GRANT_TYPE: 'password',
  LOGIN_SCOPE: 'openid',
  DEFAULT_COLOR_PCIKER: '#000000',
  MOBILE: 'mobile',
  PC: 'desktop',
  TOGGLE_ACTION: 'toggleDevice',
  ONE_SECOND: 1000
}
export const MobileOsType = {
  ANDROID: 'a',
  IOS: 'i'
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

export const graphFilterType = {
  one: 'one',
  two: 'two',
  three: 'three',
  four: 'four',
  none: 'none'
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
  },
  DEMO_GRAPHIC: {
    GENDER_TYPE: [
      {
        id: 1,
        name: 'Male',
        value: 'male'
      },
      {
        id: 2,
        name: 'Female',
        value: 'female'
      }
    ],
    AGE_RANGE: [
      {
        id: 1,
        name: '16~18',
        value: '16~18'
      },
      {
        id: 2,
        name: '19~26',
        value: '19~26'
      },
      {
        id: 3,
        name: '27~34',
        value: '27~34'
      },
      {
        id: 4,
        name: '35~44',
        value: '35~44'
      },
      {
        id: 5,
        name: 'Over 45',
        value: 'over_45'
      },
      {
        id: 6,
        name: 'Unknown',
        value: 'unknown'
      }
    ],
    INCOME_LEVEL: [
      {
        id: 1,
        name: 'Less than 20 million won',
        value: '<20'
      },
      {
        id: 2,
        name: '20 ~ 30 million won',
        value: '20~30'
      },
      {
        id: 3,
        name: '30 ~ 40 million won',
        value: '30~40'
      },
      {
        id: 4,
        name: '40 ~ 50 million won',
        value: '40~50'
      },
      {
        id: 5,
        name: '50 ~ 70 million won',
        value: '50~70'
      },
      {
        id: 6,
        name: '70 ~ 100 million won',
        value: '70~100'
      },
      {
        id: 7,
        name: 'More than 100 million won',
        value: '>100'
      },
      {
        id: 8,
        name: 'Unknown',
        value: 'unknown'
      }
    ]
  },
  LOCATION: {
    DEFAULT: 'default',
    ALL: 'all',
    CUSTOM: 'custom'
  },
  LANGUAGE: {
    ALL: 'all',
    CUSTOM: 'custom'
  },
  TARGET_CONVERSION_TYPE: {
    conversionSegment: [
      {
        value: '1nd',
        name: '1nd Conversion'
      },
      {
        value: '2nd',
        name: '2nd Conversion'
      }
    ],
    conversionType: [
      {
        value: 'join',
        name: 'Join'
      },
      {
        value: 'purchasecomplete',
        name: 'Purchase Complete'
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
    {
      value: 'KWR',
      label: 'KWR',
      symbol: '₩'
    },
    {
      value: 'USD',
      label: 'USD',
      symbol: '$'
    },
    {
      value: 'YEN',
      label: 'YEN',
      symbol: '¥'
    },
    {
      value: 'CNY',
      label: 'CNY',
      symbol: '¥'
    }
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
  ],
  LIST_BNA: [
    {
      label: 'client.lastName',
      value: 'lastName'
    },
    {
      label: 'client.firstName',
      value: 'firstName'
    },
    {
      label: 'client.accRole',
      value: 'currentRole'
    },
    {
      label: 'client.cellPhone',
      value: 'tel.number'
    },
    {
      label: 'client.cellPhone',
      value: 'tel.number'
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
    DEFAULT: '#ff8300'
  },
  CI_SIZE: {
    ALL: 'All'
  },
  CI_PAGE_SIZE: [5, 10, 25, 50],
  CI_IMAGE_ACCEPT_SIZES_NORMAL: [
    { width: 51, height: 50 }, { width: 83, height: 30 }, { width: 120, height: 50 }, { width: 200, height: 200 },
    { width: 1, height: 1 }, { width: 15, height: 50 }, { width: 86, height: 58 }, { width: 90, height: 58 },
    { width: 90, height: 60 }, { width: 100, height: 88 }, { width: 116, height: 50 }, { width: 116, height: 70 },
    { width: 118, height: 50 }, { width: 118, height: 200 }, { width: 130, height: 80 }, { width: 130, height: 86 },
    { width: 130, height: 88 }, { width: 150, height: 40 }, { width: 158, height: 50 }, { width: 158, height: 200 },
    { width: 196, height: 40 }, { width: 198, height: 40 }, { width: 198, height: 70 }, { width: 230, height: 86 },
    { width: 230, height: 88 }, { width: 236, height: 40 }, { width: 238, height: 38 }, { width: 238, height: 40 },
    { width: 238, height: 90 }, { width: 248, height: 38 }, { width: 248, height: 40 }, { width: 248, height: 42 },
    { width: 248, height: 90 }, { width: 266, height: 38 }, { width: 266, height: 40 }, { width: 266, height: 90 },
    { width: 276, height: 40 }, { width: 278, height: 38 }, { width: 278, height: 40 }, { width: 278, height: 80 },
    { width: 280, height: 88 }, { width: 296, height: 40 }, { width: 296, height: 50 }, { width: 298, height: 40 },
    { width: 298, height: 50 }, { width: 298, height: 100 }, { width: 298, height: 200 }, { width: 1024, height: 768 }
  ],
  CI_IMAGE_ACCEPT_SIZES_HIGH_RESOLUTION: [
    { width: 102, height: 100 }, { width: 166, height: 60 }, { width: 240, height: 100 }, { width: 400, height: 400 },
    { width: 2, height: 2 }, { width: 30, height: 100 }, { width: 172, height: 116 }, { width: 180, height: 116 },
    { width: 180, height: 120 }, { width: 200, height: 176 }, { width: 232, height: 100 }, { width: 232, height: 140 },
    { width: 236, height: 100 }, { width: 236, height: 400 }, { width: 260, height: 160 }, { width: 260, height: 172 },
    { width: 260, height: 176 }, { width: 300, height: 80 }, { width: 316, height: 100 }, { width: 316, height: 400 },
    { width: 392, height: 80 }, { width: 396, height: 80 }, { width: 396, height: 140 }, { width: 460, height: 172 },
    { width: 460, height: 176 }, { width: 472, height: 80 }, { width: 476, height: 76 }, { width: 476, height: 80 },
    { width: 476, height: 180 }, { width: 496, height: 76 }, { width: 496, height: 80 }, { width: 496, height: 84 },
    { width: 496, height: 180 }, { width: 532, height: 76 }, { width: 532, height: 80 }, { width: 532, height: 180 },
    { width: 552, height: 80 }, { width: 556, height: 76 }, { width: 556, height: 80 }, { width: 556, height: 160 },
    { width: 560, height: 176 }, { width: 592, height: 80 }, { width: 592, height: 100 }, { width: 596, height: 80 },
    { width: 596, height: 100 }, { width: 596, height: 200 }, { width: 596, height: 400 }, { width: 2048, height: 1536 }
  ],
  CREATIVE_STATUS: {
    ALL: 'All',
    ACTIVE: 'Active',
    STAND_BY: 'StandBy',
    PAUSED: 'Paused',
    DISABLED: 'Disabled'
  },
  CREATIVE_STATUS_COLOR: {
    ACTIVE: 'green',
    STAND_BY: 'yellow',
    PAUSED: 'red',
    DISABLED: 'gray'
  },
  IMAGE_ACEPT_SIZES: [
    { width: 120, height: 240 }, { width: 120, height: 300 }, { width: 125, height: 125 }, { width: 150, height: 150 },
    { width: 160, height: 600 }, { width: 200, height: 200 }, { width: 234, height: 60 }, { width: 240, height: 240 },
    { width: 250, height: 250 }, { width: 300, height: 50 }, { width: 300, height: 250 }, { width: 300, height: 600 },
    { width: 320, height: 50 }, { width: 320, height: 100 }, { width: 320, height: 480 }, { width: 336, height: 280 },
    { width: 480, height: 60 }, { width: 500, height: 90 }, { width: 655, height: 120 }, { width: 728, height: 90 },
    { width: 750, height: 100 }, { width: 970, height: 90 }, { width: 970, height: 250 }
  ],
  detailOptions: [
    { id: 1, key: 'clickUrlWeb', title: 'clickURLTitle', description: 'desktopMobileDescription', allowEdit: false },
    { id: 2, key: 'checkUrlWeb', title: 'impressionCheckURLTitle', description: 'desktopMobileDescription', allowEdit: false },
    { id: 3, key: 'clickUrlAndroid', title: 'clickURLTitle', description: 'androidAppDescription', allowEdit: false },
    { id: 4, key: 'checkUrlAndroid', title: 'impressionCheckURLTitle', description: 'androidAppDescription', allowEdit: false },
    { id: 5, key: 'clickUrlIOS', title: 'clickURLTitle', description: 'iosAppDescription', allowEdit: false },
    { id: 6, key: 'checkUrlIOS', title: 'impressionCheckURLTitle', description: 'iosAppDescription', allowEdit: false },
    { id: 7, key: 'clickUrlPage', title: 'clickURLTitle', description: 'pageLinkDescription', allowEdit: false },
    { id: 8, key: 'checkUrlPage', title: 'impressionCheckURLTitle', description: 'pageLinkDescription', allowEdit: false }
  ],
  ANIMATED_IMAGE_ACCEPT_SIZES_NORMAL: [
    { width: 120, height: 240 }, { width: 120, height: 300 }, { width: 120, height: 600 }, { width: 125, height: 125 },
    { width: 150, height: 150 }, { width: 160, height: 600 }, { width: 200, height: 200 }, { width: 234, height: 60 },
    { width: 240, height: 240 }, { width: 250, height: 250 }, { width: 300, height: 50 }, { width: 300, height: 250 },
    { width: 300, height: 600 }, { width: 320, height: 50 }, { width: 320, height: 100 }, { width: 320, height: 480 },
    { width: 336, height: 280 }, { width: 468, height: 60 }, { width: 500, height: 90 }, { width: 655, height: 120 },
    { width: 728, height: 90 }, { width: 750, height: 100 }, { width: 970, height: 90 }, { width: 970, height: 250 }
  ],
  ANIMATED_IMAGE_ACCEPT_SIZES_RESOLUTION: [
    { width: 240, height: 480 }, { width: 240, height: 600 }, { width: 240, height: 1200 }, { width: 250, height: 250 },
    { width: 300, height: 300 }, { width: 320, height: 1200 }, { width: 400, height: 400 }, { width: 468, height: 120 },
    { width: 480, height: 480 }, { width: 500, height: 500 }, { width: 600, height: 100 }, { width: 600, height: 500 },
    { width: 600, height: 1200 }, { width: 640, height: 100 }, { width: 640, height: 200 }, { width: 640, height: 960 },
    { width: 672, height: 560 }, { width: 936, height: 120 }, { width: 1000, height: 180 }, { width: 1310, height: 240 },
    { width: 1456, height: 180 }, { width: 1500, height: 200 }, { width: 1940, height: 180 }, { width: 1940, height: 500 }
  ],
  ANIMATED_IMAGE_ACCEPT_TYPES: ['gif', 'jpg', 'png'],
  animatedTypes: ['Strip-Down-Right', 'Slide-in-Right', 'Curtain-Left', 'Curtain_Top', 'Fade', 'Randoom', 'Zoom'],
  motionSpeed: ['1 sec', '1.5 sec', '2 sec', '3 sec', '4 sec', '5 sec'],
  progressBarStyles: ['none', '막대 게이지', '원형게이지', '파일 게이지'],
  progressBarSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  borderColors: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px'],
  playStopTerms: ['1 sec', '1.5 sec', '2 sec', '3 sec', '4 sec', '5 sec', '6 sec', '7 sec', '8 sec', '9 sec', '10 sec', '15 sec', '20 sec', '30 sec'],
  progressPositions: ['아래-오른쪽', '아래-왼쪽', '위-오른쪽', '위-왼쪽'],
  DETAIL_OPTIONS: [
    { id: 1, field: 'app_mobile_url', title: 'clickUrlPc', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 2, field: 'impression_check_url', title: 'impressionCheckUrl', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 3, field: 'app_deeplink_android', title: 'clickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 4, field: 'impression_check_app_deeplink_android', title: 'impressionCheckClickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 5, field: 'app_deeplink_apple', title: 'clickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 6, field: 'impression_check_app_deeplink_apple', title: 'impressionCheckClickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 7, field: 'app_deeplink_website', title: 'clickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false },
    { id: 8, field: 'impression_check_app_mobile_url', title: 'impressionCheckClickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false }
  ],
  CAMPAIGN_TYPE: {
    WEB_CAMPAIGN: 'web_campaign',
    APP_CAMPAIGN: 'app_campaign'
  },
  CI_IMAGE_ACCEPT_TYPES: ['gif', 'jpg', 'png'],
  CI_CREATE_FILE_NAME_PREFIX_FORMAT: 'YYYYMMDD',
  HTTP_PREFIX: 'http://',
  HTTPS_PREFIX: 'https://',
  CI_BACKGROUND_COLOR_REGEX: '#[0-9a-f]{1,8}$',
  UPDATE_CREATIVE: {
    DEFAULT_URL: 'defaultURL',
    MOTION_TYPES: [{
      value: 'Flip',
      label: 'Flip'
    }, {
      value: 'Array Left',
      label: 'Array Left'
    }, {
      value: 'Show up',
      label: 'Show up'
    }, {
      value: 'Zoom out',
      label: 'Zoom out'
    }, {
      value: 'Spin',
      label: 'Spin'
    }],
    MOTION_SPEED: [{
      value: '1 sec',
      label: '1 sec'
    }, {
      value: '1.5 sec',
      label: '1.5 sec'
    }, {
      value: '2 sec',
      label: '2 sec'
    }, {
      value: '3 sec',
      label: '3 sec'
    }, {
      value: '4 sec',
      label: '4 sec'
    }, {
      value: '5 sec',
      label: '5 sec'
    }],
    MOTION_INTERVAL: [{
      value: '1 sec',
      label: '1 sec'
    }, {
      value: '1.5 sec',
      label: '1.5 sec'
    }, {
      value: '2 sec',
      label: '2 sec'
    }, {
      value: '3 sec',
      label: '3 sec'
    }, {
      value: '4 sec',
      label: '4 sec'
    }, {
      value: '5 sec',
      label: '5 sec'
    },
    {
      value: '6 sec',
      label: '6 sec'
    },
    {
      value: '7 sec',
      label: '7 sec'
    },
    {
      value: '8 sec',
      label: '8 sec'
    },
    {
      value: '9 sec',
      label: '9 sec'
    },
    {
      value: '10 sec',
      label: '10 sec'
    },
    {
      value: '15 sec',
      label: '15 sec'
    },
    {
      value: '20 sec',
      label: '20 sec'
    },
    {
      value: '25 sec',
      label: '25 sec'
    },
    {
      value: '30 sec',
      label: '30 sec'
    }],
    BACKGROUND_LABEL: [{
      value: '사용안함',
      label: '사용안함'
    },
    {
      value: '할인율',
      label: '할인율'
    }]
  }
}

export const CampaignReporting = {
  CAMPAIGN_STATUS: {
    STANDBY: 'Standby',
    ENABLED: 'Enabled',
    PAUSED: 'Paused',
    DISABLED: 'Disabled'
  }
}

export const AutomaticallyOptimizeConversion = {
  CONVERSION: 'conversion',
  CONVERSION_OF_NEW_VISITOR: 'ConversionOfNewVisitor',
  LONG_TERM_DORMANT: 'longTermDormant'
}
export const clientManagement = {
  listPrefixWebUrl: [
    'http://',
    'https://'
  ],
  tableHeaders: [
    {
      prop: 'client_no',
      label: 'Client No.'
    },
    {
      prop: 'client_name',
      label: 'Client Name'
    },
    {
      prop: 'error',
      label: 'Errors'
    },
    {
      prop: 'payment',
      label: 'Payment'
    },
    {
      prop: 'balance',
      label: 'Balance'
    },
    {
      prop: 'currency',
      label: 'Currency'
    },
    {
      prop: 'contact',
      label: 'Contact'
    },
    {
      prop: 'status',
      label: 'Approval Status'
    }
  ]
}

export const CreativeLink = {
  IMAGE_SIZES: [
    '120x600',
    '160x600',
    '200x200',
    '250x250',
    '300x250',
    '320x50',
    '320x100',
    '320x480',
    '728x90',
    'flexible'
  ]
}

export const SetAboutAppCampaignType = {
  type: {
    REQUIRED: 'required',
    OPTIONAL: 'optional'
  },
  status: {
    DO_NOT_INCLUDE: 'doNotInclude',
    NORMAL: 'normal',
    ERROR: 'error'
  }
}

export const ALL = 'all'
export const ONE_DAY = '1_day'
