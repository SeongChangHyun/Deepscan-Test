export const Common = {
  WHITELIST: [
    '/reset-password',
    '/activate',
    '/register',
    '/login',
    '/result',
    '/auth-redirect'
  ], // no redirect whitelist
  DEVICE_WIDTH: {
    MOBILE_320: 320,
    MOBILE: 768,
    SMALL_TABLET: 992,
    TABLET_1024: 1024,
    PC_FIX_COLUMN: 1200,
    PC_MEDIUM: 1366
  },
  ENV_DEV: 'dev',
  ENV_SIT: 'sit',
  EDIT: 'edit',
  CREATE: 'create',
  TE: 'te',
  TM: 'tm',
  AGENCY: 'agency',
  ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
  MIN_LENGTH_PHONE_NUMBER: 10,
  MAX_LENGTH_PHONE_NUMBER: 11,
  CLIENT_ADMIN_ROLE: 'CLA',
  SUPER_ADMIN_ROLE: 'ROLE_SUPER_ADMIN',
  FORMAT_DATE_YYYY_MM_DD: 'YYYY-MM-DD',
  FORMAT_DATE_DD_MM_YYYY: 'DD/MM/YYYY',
  FORMAT_DATE_YYMMDD: 'YYMMDD',
  FORMAT_DATE_DD_MM_YYYY_CHART: 'YYYY/MM/DD',
  FORMAT_DATE_YYYY_MM_DD_2: 'YYYY/MM/DD',
  FORMAT_TIME: 'HH:mm',
  FORMAT_DAY: 'ddd',
  EN_CODE: 'en',
  JA_CODE: 'ja',
  KO_CODE: 'ko',
  KR_CODE: 'kr',
  JP_CODE: 'jp',
  JAPAN_COUNTRY_CODE: 'JP',
  KOREA_COUNTRY_CODE: 'KR',
  EN_FONT: '\'Roboto\', sans-serif',
  JA_FONT: '\'NotoSansJP\', sans-serif',
  KO_FONT: '\'NotoSansKR\', sans-serif',
  WON_TYPE: 'Won',
  YEN_TYPE: 'Yen',
  DOLLAR_TYPE: 'Dollar',
  WON_ICON: '₩',
  YEN_ICON: '¥',
  DOLLAR_ICON: '$',
  AUTHORIZATION_TOKEN: 'client_id:client_secret',
  LOGIN_GRANT_TYPE: 'password',
  REFRESH_GRANT_TYPE: 'refresh_token',
  LOGIN_SCOPE: 'openid',
  DEFAULT_COLOR_PICKER: '#000000',
  MOBILE: 'mobile',
  PC: 'desktop',
  TOGGLE_ACTION: 'toggleDevice',
  ONE_SECOND: 1000,
  AUTO_VALUE: 'auto',
  Rows: [20, 100, 200],
  LEFT_VALUE: 'left',
  URL_APP_STORE: 'https://itunes.apple.com/{country_id}/app/id{app_id}',
  URL_CH_PLAY: 'https://play.google.com/store/apps/details?id={app_id}&hl={country_id}',
  Reporting: ['Reporting', 'dailyReporting', 'Performance Reporting', 'Targeting Reports', 'User Interest'],
  FILTER_ASCENDING: 'ascending',
  FILTER_DESCENDING: 'descending',
  FIXED_COLUMN_CLASS: 'fixed-column',
  CURRENCY: {
    KOREA_TYPE: 'KRW',
    USA_TYPE: 'USD',
    JAPAN_TYPE: 'JPY'
  },
  BACKGROUND_PATTERN: '#[0-9a-f]{1,7}$',
  NUMBER_WITH_COMMA_PATTERN: /^[0-9,]+$/,
  NUMBER_WITH_COMMA_FORMAT_PATTERN: /\B(?=(\d{3})+(?!\d))/g,
  URL_PATTERN: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})',
  FORMAT_FULL_DATE_TIME: 'YYYY-MM-FF HH:MM',
  TYPE_POPUP_WARNING: 'warning',
  DEFAULT_REPORT_FILTER: {
    ORDER_BY: 'asc',
    SEGMENT: 'all_campaign_goal',
    STATS_BY: 'campaigns',
    LIMIT: 20,
    OFFSET: 0
  },
  SERVER_ERROR: {
    CODE_400: 400
  },
  GRID_MAX_HEIGHT: 350,
  WEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  TAB_KEY: 'Tab'
}

export const reportingType = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  campaignSegment: 'CampaignSegment',
  customColumn: 'CustomColumn',
  campaignGroup: 'CampaignGroup',
  rows: 'Rows'
}

export const REPORTING_TYPE_API = {
  CAMPAIGN_REPORT: 14,
  PERFORMANCE_REPORT: 15,
  DAILY_REPORT: 16
}

export const CUSTOM_COLUMN_REPORT_TABS = ['attributes', 'performance', 'conversion', 'admin']

export const DATE_TIME_COLUMN = {
  label: 'date_time',
  prop: 'date_time'
}

export const COLUMN_DEFAULT_OPTION = {
  value: 'modify_columns',
  label: 'Modify columns',
  isCustom: true
}
export const COLUMN_LABEL_VALUE_PREFIX = 'str_'

export const dateFilterSelection = {
  indexDefaultValue: 3
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
  one: '#2770C0',
  two: '#37B04F',
  three: '#F9C001',
  four: '#C00000'
}

export const chartConfig = {
  colorDefault: '#FF005A',
  colorLabelDefault: 'black',
  alignLabel: 'center',
  typeLineChart: 'line',
  symbolSize: 6,
  lineWidth: 2,
  animationDuration: 2000,
  animationEasing: 'blackIn',
  fontSize: 14,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  dataZoomContent: {
    type: 'inside',
    start: 0,
    end: 10
  },
  dataZoomBottom: {
    bottom: 0,
    disable: false,
    start: 0,
    end: 10,
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      opacity: 0.5
    }
  },
  containerStyle: {
    left: 10,
    right: 10,
    bottom: 80,
    top: 30,
    containLabel: true
  },
  titleStyle: {
    align: 'center',
    color: 'black',
    verticalAlign: 'middle'
  },
  axisLine: {
    lineStyle: {
      color: 'black',
      width: 0
    }
  }
}

export const graphFilterType = {
  one: 'one',
  two: 'two',
  three: 'three',
  four: 'four',
  none: 'none'
}

export const STRING_NUMBER = {
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3'
}

export const CampaignManagementConstants = {
  STEP_SELECT_CAMPAIGN_OBJECTIVES: 1,
  STEP_CREATE_CAMPAIGN: 2,
  STEP_MATCH_CREATIVES: 3,
  TRACKING_TAG_LIMIT: 1000,
  CTR_A_LIMIT: 10000,
  TARGETING_TYPE: {
    DEFAULT: 0,
    TARGETED: 'Targeted',
    EXCLUDED: 'Excluded'
  },
  BEHAVIOR_TYPE: {
    ALL: 'all',
    SINGLE: 'single'
  },
  IMPRESSION_CAPPING: {
    INITIALIZE_EVERY: [
      {
        value: '1d',
        label: '1 Day'
      }, {
        value: '30m',
        label: '30 Min'
      }, {
        value: '1h',
        label: '1 Hour'
      }, {
        value: '2h',
        label: '2 Hours'
      }, {
        value: '3h',
        label: '3 Hours'
      }, {
        value: '4h',
        label: '4 Hours'
      }, {
        value: '5h',
        label: '5 Hours'
      }, {
        value: '6h',
        label: '6 Hours'
      }, {
        value: '12h',
        label: '12 Hours'
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
      PER_DAY: 'perday',
      PER_WEEK: 'perweek',
      PER_MONTH: 'permonth'
    },
    DISTRIBUTION_TYPE: {
      STANDARD: 'STANDARD',
      ACCELERATED: 'ACCELERATED'
    },
    LIVE_TIME_OF_CAMPAIGN_TYPE: {
      LIVE_AD_FROM_TODAY: 0,
      START_AND_END_DATE_SETTING: 1
    }
  },
  TARGET_GROUP_CONTROL_B: {
    SELECT_SPECIFIED_TARGET: 1,
    SET_DELIVERY_CONDITIONS: 2,
    ADS_SPECIFIED_TARGETS: 3,
    TIME_PERIOD: [
      {
        id: 1,
        name: '1 day',
        value: '1d'
      },
      {
        id: 2,
        name: '30 minutes ',
        value: '30m'
      },
      {
        id: 3,
        name: '1 hours',
        value: '1h'
      },
      {
        id: 4,
        name: '2 hours',
        value: '2h'
      },
      {
        id: 5,
        name: '3 hours',
        value: '3h'
      },
      {
        id: 6,
        name: '4 hours',
        value: '4h'
      },
      {
        id: 7,
        name: '5 hours',
        value: '5h'
      },
      {
        id: 8,
        name: '6 hours',
        value: '6h'
      },
      {
        id: 9,
        name: '12 hours',
        value: '12h'
      }
    ]
  },
  DEMO_GRAPHIC: {
    GENDER_TYPE: [
      {
        id: 1,
        name: 'Male',
        value: '701'
      },
      {
        id: 2,
        name: 'Female',
        value: '702'
      }
    ],
    AGE_RANGE: [
      {
        id: 1,
        name: '16~18',
        value: '001'
      },
      {
        id: 2,
        name: '19~26',
        value: '002'
      },
      {
        id: 3,
        name: '27~34',
        value: '003'
      },
      {
        id: 4,
        name: '35~44',
        value: '004'
      },
      {
        id: 5,
        name: 'Over 45',
        value: '005'
      },
      {
        id: 6,
        name: 'Unknown',
        value: '000'
      }
    ],
    INCOME_LEVEL: [
      {
        id: 1,
        name: 'Less than 20 million won',
        value: '800007'
      },
      {
        id: 2,
        name: '20 ~ 30 million won',
        value: '800006'
      },
      {
        id: 3,
        name: '30 ~ 40 million won',
        value: '800005'
      },
      {
        id: 4,
        name: '40 ~ 50 million won',
        value: '800004'
      },
      {
        id: 5,
        name: '50 ~ 70 million won',
        value: '800003'
      },
      {
        id: 6,
        name: '70 ~ 100 million won',
        value: '800002'
      },
      {
        id: 7,
        name: 'More than 100 million won',
        value: '800001'
      },
      {
        id: 8,
        name: 'Unknown',
        value: '800000'
      }
    ]
  },
  LOCATION: {
    DEFAULT: 0,
    ALL: 1,
    CUSTOM: 2
  },
  LANGUAGE: {
    ALL: '1',
    CUSTOM: '0'
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
  },
  VERIFY_TYPE: {
    ALLOW: 'allow',
    BLOCK: 'block'
  }
}

export const Auth = {
  TITLE: 'Welcome to TargetingGates!',
  DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam',
  SHOW_REACTIVE: 'msgEmailActivatedAfter24',
  SUCCESS_SIGNAL: 'success',
  MAX_LENGTH_PASSWORD: 12,
  MIN_LENGTH_PASSWORD: 8,
  MILLISECONDS_OF_DAY: 86400000,
  TYPE_PASSWORD_FIELD: 'password',
  PERSONAL_TYPE: 'PersonalAccountDTO',
  BUSINESS_TYPE: 'BusinessAccountDTO',
  MAX_SIZE_FILE: 5000000,
  VALID_FILE_EXTENSIONS: ['.pdf', '.jpg', '.gif', '.png'],
  LIST_COUNTRY: [{
    value: 'KR',
    label: 'Korea, Republic of'
  }, {
    value: 'JP',
    label: 'Japan'
  }],
  TERM_CHECK: 1,
  INVALID_TOKEN: 'invalid_token',
  ACCESS_TOKEN_EXPIRED: 'Access token expired',
  TOKEN_INVALID: 'msgTokenExpired',
  LIFETIME_INTERVAL_EXPIRED: 'LIFETIME_INTERVAL_EXPIRED',
  SESSION_EXPIRED: 'session_expired',
  LIST_BANK: [
    { bank_code: '002', bank_name: '산업은행' },
    { bank_code: '003', bank_name: '기업은행' },
    { bank_code: '004', bank_name: '국민은행' },
    { bank_code: '007', bank_name: '수협은행' },
    { bank_code: '011', bank_name: '농협은행' },
    { bank_code: '020', bank_name: '우리은행' },
    { bank_code: '023', bank_name: 'SC제일은행' },
    { bank_code: '027', bank_name: '시티은행' },
    { bank_code: '031', bank_name: '대구은행' },
    { bank_code: '032', bank_name: '부산은행' },
    { bank_code: '034', bank_name: '광주은행' },
    { bank_code: '035', bank_name: '제주은행' },
    { bank_code: '037', bank_name: '전북은행' },
    { bank_code: '039', bank_name: '경남은행' },
    { bank_code: '081', bank_name: '하나은행' },
    { bank_code: '088', bank_name: '신한은행' }
  ]
}

export const AccountAndBillings = {
  LICENSE_CODE: 'business_license',
  BANK_CODE: 'bank_book',
  LIFE_TIME_OF_CODE: 300000,
  KOREA_CODE: 'KR',
  KOREA_CURRENCY: 'KRW',
  PHONE_CODE_JP: 'JP +81',
  PHONE_CODE_KO: 'KR +82',
  VALID_IMPRESSION_PERIOD: 'VALID_IMPRESSION_PERIOD',
  VALID_CLICK_PERIOD: 'VALID_CLICK_PERIOD',
  VALID_PLAY_PERIOD: 'VALID_PLAY_PERIOD',
  LIST_DAYS: [90, 60, 45, 40, 30, 15, 7, 1, 0],
  PHONE_COUNTRY_CODE_JP: 81,
  PHONE_COUNTRY_CODE_KR: 82,
  SUPER_ADMIN_ROLE: 'ROLE_SUPER_ADMIN',
  INIT_TIME_VARIABLE: [
    'duringTime',
    'validImpression',
    'validClick',
    'validPlay'
  ],
  LIST_TELCOS: [
    '통신사 선택',
    'SKT',
    'KT',
    'LGU+',
    'SKT알뜰폰',
    'KT 알뜰폰',
    'LGU+ 알뜰폰'
  ],
  INVITE_FOR_ROLE: {
    CM: 'CM',
    CV: 'CV'
  },
  LIST_MEDIA_SA: [
    'Adlib',
    'GDN'
  ],
  LIST_PAYMENT_SETTING: [
    {
      value: 'pre',
      label: 'Prepay'
    },
    {
      value: 'later',
      label: 'Postpay'
    }
  ],
  LIST_CLIENT_STATUS: [
    {
      value: 'awaiting',
      label: 'client.Await'
    },
    {
      value: 'stop',
      label: 'client.Stop'
    },
    {
      value: 'pass',
      label: 'client.Enable'
    },
    {
      value: 'block',
      label: 'client.Disable'
    }
  ],
  LIST_TAX_INVOICE_AMOUNT: [
    {
      value: 'revenue',
      label: 'Cost'
    },
    {
      value: 'charge',
      label: 'Deposit amount'
    }
  ],
  LIST_TAX_INVOICE_ISSUER: [
    {
      value: 'client',
      label: 'Client'
    },
    {
      value: 'agency',
      label: 'Agency'
    }
  ],
  LIST_DEVICE: {
    PC: 'pc',
    MOBILE: 'mobile'
  },
  LIST_SETTABLE_OBJECT: {
    CPC: 'cpc',
    CPM: 'cpm',
    CPVC: 'cpvc',
    CPMG: 'cpmg',
    CPI: 'cpi',
    CPA: 'cpa'
  },
  SETTABLE_MAX_LENGTH: 5,
  PC_MIN: 'PC_MIN',
  PC_MAX: 'PC_MAX',
  MOBILE_MIN: 'MOBILE_MIN',
  MOBILE_MAX: 'MOBILE_MAX',
  LIST_USER_COLLECT_CONTROL: [
    180, 150, 90, 60, 50, 45, 40, 30, 15
  ],
  LIST_HCUID: [
    {
      value: 0,
      label: 'No, Do not use'
    },
    {
      value: 1,
      label: 'Yes, Use it'
    }
  ],
  LIST_RTA: [
    {
      value: 'Y',
      label: 'Send RTA'
    },
    {
      value: 'N',
      label: 'Do not send RTA'
    }
  ],
  LIST_CONVERSION_USER_CONTROL: [
    {
      value: 0,
      label: 'Show your ads to users with conversion as well'
    },
    {
      value: 1,
      label: 'We will not show ads to users with conversions during that time'
    }
  ],
  DISPLAY_LANG: [
    {
      name: 'Korean',
      code: 'ko'
    },
    {
      name: 'Japanese',
      code: 'ja'
    },
    {
      name: 'English',
      code: 'en'
    }
  ],
  LIST_CURRENCY: [
    {
      value: 'KRW',
      label: 'KRW(₩)',
      symbol: '₩'
    },
    {
      value: 'USD',
      label: 'USD($)',
      symbol: '$'
    },
    {
      value: 'YEN',
      label: 'YEN(円)',
      symbol: '円'
    },
    {
      value: 'CNY',
      label: 'CNY(¥)',
      symbol: '¥'
    }
  ],
  LIST_VALID_TIME: [
    {
      label: '30 mins',
      value: 1800
    },
    {
      label: '1 hour',
      value: 3600
    },
    {
      label: '2 hour',
      value: 7200
    },
    {
      label: '3 hour',
      value: 10800
    }
  ],
  LIST_BNA: [
    {
      label: 'client.lastName',
      value: 'last_name'
    },
    {
      label: 'client.firstName',
      value: 'first_name'
    },
    {
      label: 'user.businessPhone',
      value: 'phone'
    },
    {
      label: 'client.cellPhone',
      value: 'cell_phone'
    },
    {
      label: 'client.accRole',
      value: 'permission_name'
    }
  ],
  ASSIGN_USER_ROLE_GROUP: {
    TE_ADMIN_FIELD: 'teAdminUser',
    TM_ADMIN_FIELD: 'tmAdminUser',
    AGENCY_USER_FIELD: 'agencyUser'
  },
  PAYMENT: {
    WIRE_TRANSFER: 'wire_transfer',
    CREDIT_CARD: 'credit_card',
    PAY_PAL: 'pay_pal',
    FIXED_VIRTUAL_ACCOUNT: 'fixed_virtual_account',
    PAYMENT_TYPE_LIST: [
      {
        id: 1,
        value: 'wire_transfer',
        label: 'Wire Transfer'
      },
      {
        id: 2,
        value: 'credit_card',
        label: 'Credit Card'
      },
      {
        id: 3,
        value: 'pay_pal',
        label: 'PayPal'
      },
      {
        id: 4,
        value: 'fixed_virtual_account',
        label: 'Fixed virtual account'
      }
    ],
    ORDER_AMOUNT: {
      30000: '30,000',
      50000: '50,000',
      100000: '100,000',
      150000: '150,000',
      200000: '200,000',
      250000: '250,000',
      300000: '300,000',
      350000: '350,000',
      400000: '400,000',
      450000: '450,000',
      500000: '500,000',
      1000000: '1,000,000',
      1500000: '1,500,000',
      2000000: '2,000,000',
      2500000: '2,500,000',
      3000000: '3,000,000',
      3500000: '3,500,000',
      4000000: '4,000,000',
      4500000: '4,500,000',
      5000000: '5,000,000',
      10000000: '10,000,000',
      20000000: '20,000,000',
      30000000: '30,000,000',
      40000000: '40,000,000',
      50000000: '50,000,000'
    },
    DEDICATED_ACCOUNT_BANK: [
      {
        id: 1,
        value: '국민 은행',
        label: '국민 은행'
      },
      {
        id: 2,
        value: '외환 은행',
        label: '외환 은행'
      },
      {
        id: 3,
        value: '수협',
        label: '수협'
      },
      {
        id: 4,
        value: '농협',
        label: '농협'
      },
      {
        id: 5,
        value: '우리 은행',
        label: '우리 은행'
      },
      {
        id: 6,
        value: 'SC 은행',
        label: 'SC 은행'
      },
      {
        id: 7,
        value: '신한 은행',
        label: '신한 은행'
      },
      {
        id: 8,
        value: '부산 은행',
        label: '부산 은행'
      },
      {
        id: 9,
        value: '광주 은행',
        label: '광주 은행'
      },
      {
        id: 10,
        value: '우체국',
        label: '우체국'
      },
      {
        id: 11,
        value: '하나 은행',
        label: '하나 은행'
      }
    ],
    PHONE_CODE_COUNTRY: [
      {
        id: 1,
        country: 'JP',
        value: 81,
        label: '81'
      },
      {
        id: 2,
        country: 'KO',
        value: 82,
        label: '82'
      },
      {
        id: 3,
        country: 'VN',
        value: 84,
        label: '84'
      }
    ],
    LIST_ACCOUNT: [
      {
        value: 'client1',
        label: 'Client1'
      }, {
        value: 'client2',
        label: 'client2'
      }
    ]
  }
}

export const CreativeConstant = {
  CREATIVE_BANNER_TYPE: 'banner',
  CREATIVE_ANIMATED_TYPE: 'animated',
  CREATIVE_DYNAMIC_TYPE: 'dynamic',
  CREATIVE_NATIVE_TYPE: 'native',
  CREATIVE_VIDEO_TYPE: 'video',
  OPTIONS_TYPE_DETAIL: 'detail',
  OPTIONS_TYPE_ADVANCED: 'advanced',
  LIST_CREATIVE_STATUS: [
    {
      id: 1,
      value: 'all',
      label: 'All'
    },
    {
      id: 2,
      value: 'standby',
      label: 'Stand by'
    },
    {
      id: 3,
      value: 'active',
      label: 'Active'
    },
    {
      id: 4,
      value: 'disabled',
      label: 'Disabled'
    },
    {
      id: 5,
      value: 'paused',
      label: 'Paused'
    }
  ],
  CI_STATUS: {
    ALL_LABEL: '모든 상태',
    ENABLE: 'Enable',
    AWAIT: 'Await',
    STOP: 'Stop',
    DISABLE: 'Disable',
    ALL: 'All'
  },
  CI_STATUS_COLOR: {
    ENABLE: 'green',
    STOP: 'red',
    DISABLE: 'gray',
    DEFAULT: '#ff8300'
  },
  CI_SIZE: {
    ALL: 'All',
    All_LABEL: '전체 크기'
  },
  CI_PAGE_SIZE: [20, 50, 100],
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
  BANNER_IMAGE_ACCEPT_SIZES_NORMAL: [
    { width: 120, height: 240 }, { width: 120, height: 300 }, { width: 125, height: 125 }, { width: 150, height: 150 },
    { width: 160, height: 600 }, { width: 200, height: 200 }, { width: 234, height: 60 }, { width: 240, height: 240 },
    { width: 250, height: 250 }, { width: 300, height: 50 }, { width: 300, height: 250 }, { width: 300, height: 600 },
    { width: 320, height: 50 }, { width: 320, height: 100 }, { width: 320, height: 480 }, { width: 336, height: 280 },
    { width: 480, height: 60 }, { width: 500, height: 90 }, { width: 655, height: 120 }, { width: 728, height: 90 },
    { width: 750, height: 100 }, { width: 970, height: 90 }, { width: 970, height: 250 }
  ],
  BANNER_IMAGE_ACCEPT_SIZES_RESOLUTION: [
    { width: 240, height: 480 }, { width: 240, height: 600 }, { width: 250, height: 250 }, { width: 300, height: 300 },
    { width: 320, height: 1200 }, { width: 400, height: 400 }, { width: 468, height: 120 }, { width: 480, height: 480 },
    { width: 500, height: 500 }, { width: 600, height: 100 }, { width: 600, height: 500 }, { width: 600, height: 1200 },
    { width: 640, height: 100 }, { width: 640, height: 200 }, { width: 640, height: 960 }, { width: 672, height: 560 },
    { width: 960, height: 120 }, { width: 1000, height: 180 }, { width: 1310, height: 240 }, { width: 1456, height: 180 },
    { width: 1500, height: 200 }, { width: 1940, height: 180 }, { width: 1940, height: 500 }
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
  IMAGE_ACCEPT_TYPES: ['gif', 'jpg', 'png'],
  animatedTypes: [
    { id: 1, value: 'strip-down-right', label: 'Strip-Down-Right' },
    { id: 2, value: 'slide-in-right', label: 'Slide-in-Right' },
    { id: 3, value: 'curtain-left', label: 'Curtain-Left' },
    { id: 4, value: 'curtain_top', label: 'Curtain_Top' },
    { id: 5, value: 'fade', label: 'Fade' },
    { id: 6, value: 'random', label: 'Random' },
    { id: 7, value: 'zoom', label: 'Zoom' }
  ],
  motionSpeed: [
    { id: 1, value: 1, label: '1 sec' },
    { id: 2, value: 1.5, label: '1.5 sec' },
    { id: 3, value: 2, label: '2 sec' },
    { id: 4, value: 3, label: '3 sec' },
    { id: 5, value: 4, label: '4 sec' },
    { id: 6, value: 5, label: '5 sec' }
  ],
  progressBarStyles: ['none', '막대 게이지', '원형게이지', '파일 게이지'],
  progressBarSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  borderColors: [
    { id: 1, value: 0, label: '0 sec' },
    { id: 2, value: 1, label: '1 sec' },
    { id: 3, value: 2, label: '2 sec' },
    { id: 4, value: 3, label: '3 sec' },
    { id: 5, value: 4, label: '4 sec' },
    { id: 6, value: 5, label: '5 sec' },
    { id: 7, value: 6, label: '6 sec' },
    { id: 8, value: 7, label: '7 sec' },
    { id: 9, value: 8, label: '8 sec' },
    { id: 10, value: 9, label: '9 sec' },
    { id: 11, value: 10, label: '10 sec' }
  ],
  playStopTerms: [
    { id: 1, value: 1, label: '1 sec' },
    { id: 2, value: 1.5, label: '1.5 sec' },
    { id: 3, value: 2, label: '2 sec' },
    { id: 4, value: 3, label: '3 sec' },
    { id: 5, value: 4, label: '4 sec' },
    { id: 6, value: 5, label: '5 sec' },
    { id: 7, value: 6, label: '6 sec' },
    { id: 8, value: 7, label: '7 sec' },
    { id: 9, value: 8, label: '8 sec' },
    { id: 10, value: 9, label: '9 sec' },
    { id: 11, value: 10, label: '10 sec' },
    { id: 12, value: 15, label: '15 sec' },
    { id: 13, value: 20, label: '20 sec' },
    { id: 14, value: 30, label: '30 sec' }
  ],
  progressPositions: ['아래-오른쪽', '아래-왼쪽', '위-오른쪽', '위-왼쪽'],
  DETAIL_OPTIONS: [
    { id: 1, field: 'url', title: 'clickUrlPc', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 2, field: 'impression_check_url', title: 'impressionCheckUrl', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 3, field: 'app_deeplink_android', title: 'clickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 4, field: 'impression_check_app_deeplink_android', title: 'impressionCheckClickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 5, field: 'app_deeplink_apple', title: 'clickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 6, field: 'impression_check_app_deeplink_apple', title: 'impressionCheckClickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 7, field: 'app_mobile_url', title: 'clickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false },
    { id: 8, field: 'impression_check_app_mobile_url', title: 'impressionCheckClickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false }
  ],
  DETAIL_OPTIONS_NATIVE: [
    { id: 1, field: 'url', title: 'clickUrlPc', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 2, field: 'impressionCheckUrl', title: 'impressionCheckUrl', description: 'desktopOrMobileDescription', allowEdit: false },
    { id: 3, field: 'appDeeplinkAndroid', title: 'clickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 4, field: 'impressionCheckAppDeeplinkAndroid', title: 'impressionCheckClickUrlAndroid', description: 'androidAppDescription', allowEdit: false },
    { id: 5, field: 'appDeeplinkApple', title: 'clickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 6, field: 'impressionCheckAppDeeplinkApple', title: 'impressionCheckClickUrlIos', description: 'iosAppDescription', allowEdit: false },
    { id: 7, field: 'appMobileUrl', title: 'clickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false },
    { id: 8, field: 'impressionCheckAppMobileUrl', title: 'impressionCheckClickUrlEventPage', description: 'eventPageLinkForDescription', allowEdit: false }
  ],
  CAMPAIGN_TYPE: {
    WEB_CAMPAIGN: 'web_campaign',
    APP_CAMPAIGN: 'app_campaign'
  },
  ANDROID_APP_LIST: [
    {
      id: 1,
      value: 'jp.nave.line.android',
      currency: 'KR',
      name: 'Android app'
    },
    {
      id: 2,
      value: 'jp.nave.line.android.1',
      currency: 'KR',
      name: 'Android app 1'
    },
    {
      id: 3,
      value: 'jp.nave.line.android.2',
      currency: 'KR',
      name: 'Android app 2'
    }
  ],
  IOS_APP_LIST: [
    {
      id: 1,
      value: '420615104',
      currency: 'KR',
      name: 'Ios app'
    },
    {
      id: 2,
      value: '420615105',
      currency: 'KR',
      name: 'Ios app 1'
    },
    {
      id: 3,
      value: '420615106',
      currency: 'KR',
      name: 'Ios app 2'
    }
  ],
  CI_IMAGE_ACCEPT_TYPES: ['gif', 'jpg', 'png'],
  CI_CREATE_FILE_NAME_PREFIX_FORMAT: 'YYYYMMDD',
  HTTP_PREFIX: 'http://',
  HTTPS_PREFIX: 'https://',
  CI_BACKGROUND_COLOR_REGEX: '#[0-9a-f]{1,8}$',
  BATCH_THEME_1: [
    'wpAltCubeUpDown',
    'wpAltCubeLeftRight',
    'wpAltCircle',
    'wpAltCubeThumbnail',
    'wpAltButton'
  ],
  BATCH_THEME_2: [
    'wpTplText'
  ],
  BATCH_THEME_3: [
    'wpTplDot',
    'wpTplDotHorizontal',
    'wpTplDotVertical'
  ],
  BATCH_THEME_4: [
    'wpTplMobileBasic'
  ],
  BATCH_THEME_5: [
    'wpTplAndwBookmark',
    'wpTplAndwGlass',
    'wpTplAndwNinja',
    'wpTplAndwCoverflow',
    'wpTplAndwThumbnail',
    'wpTplAndwSwing',
    'wpTplAndwPopup'
  ],
  UPDATE_CREATIVE: {
    DEFAULT_URL: 'www.defaultURL.com',
    MOTION_TYPE_VALUE: 'Flip',
    MOTION_SPEED_VALUE_BATCH1: '1 sec',
    MOTION_SPEED_VALUE_BATCH2: '3 sec',
    MOTION_SPEED_VALUE_BATCH3: '2 sec',
    MOTION_SPEED_VALUE_BATCH4: '1.5 sec',
    MOTION_INTERVAL_VALUE: '3 sec',
    DEFAULT_COLOR: '#000000',
    BACKGROUND_LABEL_VALUE: '사용안함',
    CALL_TO_ACTION: 'go',
    DEFAULT_LINE_COLOR: 'Black',
    TITLE_FONT_COLOR_VALUE: [],
    PRICE_FONT_COLOR_VALUE: [],
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
    }],
    TITLE_FONT_COLOR: [
      {
        value: 'NOT DEFINE',
        label: 'NOT DEFINE'
      }
    ],
    PRICE_FONT_COLOR: [
      {
        value: 'NOT DEFINE',
        label: 'NOT DEFINE'
      }
    ],
    CTA_FONT_COLOR: 'NOT DEFINE',
    LINE_COLORS: [
      {
        value: 'Black',
        label: 'Black'
      },
      {
        value: 'Red',
        label: 'Red'
      },
      {
        value: 'Blue',
        label: 'Blue'
      }
    ],
    TITLE_SELECT: [
      {
        value: 'Black',
        label: 'Black'
      },
      {
        value: 'Red',
        label: 'Red'
      }
    ],
    PRICE_SELECT: [
      {
        value: 'Black',
        label: 'Black'
      },
      {
        value: 'Red',
        label: 'Red'
      }
    ],
    OPTION1_SELECT: [
      {
        value: 'Black',
        label: 'Black'
      },
      {
        value: 'Red',
        label: 'Red'
      }
    ],
    OPTION2_SELECT: [
      {
        value: 'Black',
        label: 'Black'
      },
      {
        value: 'Red',
        label: 'Red'
      }
    ]
  },
  SORT_LIST_CREATIVE: {
    prop: 'name',
    order: 'ascending'
  },
  CREATIVE_TYPE: ['banner', 'animated', 'dynamic', 'native', 'video']
}

export const CampaignReporting = {
  CAMPAIGN_STATUS: {
    STANDBY: 'Standby',
    ENABLED: 'Enabled',
    PAUSED: 'Paused',
    DISABLED: 'Disabled'
  },
  DATA_LEVEL: {
    Accounts: 'accounts',
    Campaigns: 'campaigns',
    AdGroups: 'adGroups'
  },
  FILTER_CASE: {
    CampaignGroup: 'CampaignGroup',
    CustomColumn: 'CustomColumn',
    CampaignSegment: 'CampaignSegment',
    Rows: 'Rows'
  },
  SEGMENT_TYPE: {
    NONE: 'none',
    CREATIVE: 'creative',
    CAMPAIGN_GOAL: 'campaign goal',
    DISTRIBUTION: 'distribution',
    DEVICE_TYPE: 'device type',
    BID_TYPE: 'bid type'
  },
  COLUMN_KEY: {
    Campaigns: 'campaigns',
    CreativeType: 'creative_type',
    BidPrice: 'bid_price',
    Budget: 'budget',
    Expand: 'expand',
    Parent: 'parent',
    Status: 'status',
    Children: 'children',
    RowIndex: 'rowIndex',
    TreeFullIndex: 'treeFullIndex',
    TreeLevel: 'treeLevel',
    TreeExpand: 'treeExpand',
    RowShow: 'rowShow',
    TreeHasChildren: 'treeHasChildren',
    CampaignName: 'campaign_name',
    AccountName: 'account_name',
    Criteria1: 'criteria_1',
    Criteria2: 'criteria_2',
    Conversion: 'conversion',
    Imp: 'imp',
    CampaignInfo: 'campaign_info'
  },
  defaultColumn: {
    label: '',
    prop: '',
    sortable: 'true',
    minWidth: '200px'
  },
  statusColumn: {
    label: '',
    prop: 'status',
    Width: '60px',
    fixed: 'left',
    sortable: 'true',
    className: 'status-column'
  },
  campaignsColumn: {
    label: 'Campaigns',
    prop: 'campaigns',
    width: '320px',
    fixed: 'left',
    sortable: 'true',
    className: 'fixed-column',
    status: 'A'
  },
  expandColumn: {
    label: '',
    prop: 'expand',
    expandType: true,
    width: '25px'
  },
  creativeTypeColumn: {
    label: 'Creative Type',
    prop: 'creative_type',
    sortable: 'true',
    minWidth: '150px'
  },
  bidPriceColumn: {
    label: 'Bid price',
    prop: 'bid_price',
    sortable: 'true',
    className: 'price-column',
    width: '250px',
    isPrice: true
  },
  budgetColumn: {
    label: 'budget',
    prop: 'budget',
    sortable: 'true',
    width: '250px',
    isBudget: true
  },
  listCampaignInfoColumns: ['date', 'cpc', 'competitive_advantage', 'clicks', 'advertising_cost', 'set_budget', 'consumption_rate',
    'exhaustion_completion_date', 'ad_exposure_potential_user', 'exposed_users_daily', 'exposed_users']
}

export const AutomaticallyOptimizeConversion = {
  CONVERSION: 0,
  CONVERSION_OF_NEW_VISITOR: 1,
  LONG_TERM_DORMANT: 2
}
export const clientManagement = {
  CLIENT_NO: 'client_id',
  PAYMENT_TYPE: 'payment_type',
  STATUS_CODE: 'approval_status',
  ENABLE_CLIENT: 'pass',
  STOP_CLIENT: 'stop',
  listPrefixWebUrl: [
    'http://',
    'https://'
  ],
  tableHeaders: [
    {
      prop: 'client_id',
      label: 'Client No.'
    },
    {
      prop: 'client_name',
      label: 'Client Name'
    },
    {
      prop: 'payment_type',
      label: 'Payment'
    },
    {
      prop: 'balance',
      label: 'Balance'
    },
    {
      prop: 'daily_budget',
      label: 'Daily budge'
    },
    {
      prop: 'spent',
      label: 'Spent'
    },
    {
      prop: 'currency',
      label: 'Currency'
    },
    {
      prop: 'email',
      label: 'Contact'
    },
    {
      prop: 'approval_status',
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
export const ONE_DAY = '1d'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const ADDRESS_SEARCH_ROAD_BASE_TYPE = 'RoadBase'
export const ADDRESS_SEARCH_COUNT_PER_PAGE = 100
export const ADDRESS_SEARCH_PAGE_NUMBER = 1

export const PAGE_SIZE = 50

export const CommonValidations = {
  COLOR: '#[0-9a-f]{1,8}$',
  HTTP_PREFIX: 'http://',
  HTTPS_PREFIX: 'https://'
}
export const RevenueRangeType = {
  MOBILE: 'mobile',
  PC: 'pc'
}
export const REVENUE_RANGE_BID_TYPE = {
  cpc: 'CPC',
  cpm: 'CPM',
  cpvc: 'CPVc',
  cpmg: 'CPMg',
  cpi: 'CPI',
  cpa: 'CPA'
}
export const targetingReports = {
  listTargeting: ['gole', 'type'],
  listTargetingType: [
    {
      value: 'gole_label',
      label: true
    },
    {
      value: 'branding_gole'
    },
    {
      value: 'traffic_gole'
    },
    {
      value: 'retention_gole'
    },
    {
      value: 'conversion_gole'
    },
    {
      value: 'type_label',
      label: true
    },
    {
      value: 'retargeting_type'
    },
    {
      value: 'lead_targeting_type'
    },
    {
      value: 'user_targeting_type'
    },
    {
      value: 'topic_targeting_type'
    },
    {
      value: 'keyword_targeting_type'
    }
  ],
  listTargetingTimeTypes: ['dayperiod', 'timeperiod'],
  listTargetingTypeValues: [
    {
      value: 'day_label',
      label: true
    },
    { value: 'Sun' },
    { value: 'Mon' },
    { value: 'Tue' },
    { value: 'Wed' },
    { value: 'Thu' },
    { value: 'Fri' },
    { value: 'Sat' },
    {
      value: 'time_label',
      label: true
    },
    { value: '00' },
    { value: '01' },
    { value: '02' },
    { value: '03' },
    { value: '04' },
    { value: '05' },
    { value: '06' },
    { value: '07' },
    { value: '08' },
    { value: '09' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
    { value: '13' },
    { value: '14' },
    { value: '15' },
    { value: '16' },
    { value: '17' },
    { value: '18' },
    { value: '19' },
    { value: '20' },
    { value: '21' },
    { value: '22' },
    { value: '23' }
  ]
}
export const trackingTag = {
  type: {
    stateSummary: 'stateSummary',
    collectedInformation: 'collectedInformation',
    customTag: 'customTag',
    tagGuide: 'tagGuide'
  },
  ruleValues: {
    default: 'URL_EQUALS',
    install: 'INSTALL_CUSTOM_TAG'
  },
  conversionValues: {
    default: 'CONVERSION',
    general: 'GENERAL'
  },
  listStatus: {
    used: 'used',
    unused: 'unused'
  },
  DEVICE_TYPE: {
    WEB: 'web',
    MOBILE: 'mobile'
  },
  CUSTOM_TAG: {
    NOTE_MESSAGE_EN1: 'You can create up to ',
    NOTE_MESSAGE_EN2: ' custom tags, and you are currently using ',
    NOTE_MESSAGE_KO1: '최대 ',
    NOTE_MESSAGE_KO2: '개까지 Custom tag를 생성하실 수 있으며, 현재 ',
    NOTE_MESSAGE_KO3: '개를 사용하고 계십니다.'
  },
  CLICK_USER: 'Click user',
  FIRST_COL_VALUE: 'category',
  SECOND_COL_VALUE: 'custom_tag_name'
}

export const TIME_LIST = [
  { value: 6, label: '6 hours' },
  { value: 12, label: '12 hours' },
  { value: 24, label: '1 day' },
  { value: 48, label: '2 days' },
  { value: 72, label: '3 days' },
  { value: 96, label: '4 days' },
  { value: 120, label: '5 days' },
  { value: 144, label: '6 days' },
  { value: 168, label: '1 week' },
  { value: 336, label: '2 week' },
  { value: 504, label: '3 week' },
  { value: 672, label: '4 week' },
  { value: 1344, label: '8 week' },
  { value: 2016, label: '12 week' }
]

export const USER_MANAGEMENT = {
  ROLES: {
    CLIENT_ADMIN: 'CLA',
    AGENCY: 'AG',
    CAMPAIGN_MANAGER: 'CM',
    CAMPAIGN_VIEWER: 'CV',
    MAX_CM: 10,
    MAX_CV: 5
  },
  ROLE_LABEL: {
    CLA: 'Client Admin',
    AG: 'Agency',
    CM: 'Campaign Management',
    CV: 'Campaign Viewer '
  },
  TABS: {
    ALL: -1,
    INVITE: -2
  }
}
export const LEAD_TARGETING_COVERAGE = {
  TOP: 1,
  MIDDLE: 2,
  LOW: 3
}

export const LEAD_TARGETING_IMPRESSION = {
  UN_CHECK: 0,
  CHECK: 1
}

export const C_TYPES = {
  leadTargeting: 'leadTargeting',
  userTargeting: 'userTargeting',
  topicTargeting: 'topicTargeting',
  keywordTargeting: 'keywordTargeting',
  retargeting: 'retargeting',
  retargetingNonOption: 'retargetingNonOption'
}

export const BE_C_TYPES = {
  leadTargeting: 'LT',
  userTargeting: 'UTI',
  topicTargeting: 'CTT',
  keywordTargeting: 'CTK',
  retargeting: 'RT',
  retargetingNonOption: 'RT'
}
