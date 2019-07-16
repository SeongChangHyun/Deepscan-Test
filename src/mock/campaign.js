import { mockCampaignReporting } from './data/listCampaignReporting'
export default {
  requestDatacampaign: config => {
    return {
      data: mockCampaignReporting.campaignReporting
    }
  },
  checkingTag: config => {
    return {
      'mobile': [
        {
          'category': 'Conversion',
          'count': 0,
          'custom_tag_name': 'string'
        }
      ],
      'pc': [
        {
          'category': 'Conversion',
          'count': 0,
          'custom_tag_name': 'string'
        }
      ]
    }
  },
  getIndustry: config => {
    return { industry_name: 'Life & Hobby' }
  },
  getListAdGroup: config => {
    return [
      {
        'campaign_group_id': 17,
        'campaign_group_name': 'Mobile캠페인',
        'client_id': 17924,
        'daily_budget': 75000,
        'created': '2018-04-23T05:50:29+09:00'
      },
      {
        'campaign_group_id': 18,
        'campaign_group_name': 'Mobile캠페인',
        'client_id': 17924,
        'daily_budget': 75000,
        'created': '2018-04-23T05:50:29+09:00'
      }
    ]
  },
  getListCampaign: config => {
    return [
      {
        'campaign_id': 261126,
        'campaign_name': 'VN Test Advertiser - Retargeting'
      }
    ]
  },
  getListIosApp: config => {
    return [{
      'client_app_id': 4,
      'client_id': 22839,
      'os': 'a',
      'bundleid': '123613515',
      'install_url': 'https://play.google.com/store/apps/details?id=com.naver.com&hl=ko',
      'country_code': 'ko',
      'app_icon': 'wp/78/1c/78f09b9d7374ba6cca6104879a55871c.png'
    },
    {
      'client_app_id': 3,
      'client_id': 22839,
      'os': 'a',
      'bundleid': 'com.naver.com',
      'install_url': 'https://play.google.com/store/apps/details?id=com.naver.com&hl=ko',
      'country_code': 'ko',
      'app_icon': 'wp/78/1c/78f09b9d7374ba6cca6104879a55871c.png'
    }]
  },
  getListAndroidApp: config => {
    return [{ id: 1, name: 'App android 1' }, { id: 2, name: 'App android 2' }]
  },
  getListCountry: config => {
    return [
      {
        country_id: 54573,
        country_code: 'ko',
        name: '대한민국',
        name_eng: 'Korea'
      }
    ]
  },
  getListLocation: config => {
    return [{ id: 1, name: 'Location 1', total: 10000 }, { id: 2, name: 'Location 2', total: 20000 }]
  },
  getListLanguage: config => {
    return [{ id: 1, name: 'English', effected_number: 10000, 'code': 'en' }, { id: 2, 'code': 'l2', name: 'Language 2', effected_number: 20000 }]
  },
  getListDevice: config => {
    return [
      { name: 'All available device', code: 'all', effected_number: '' },
      { name: 'Desktop(All)', code: 'dta', effected_number: 610720 },
      { name: 'Mobile(All)', code: 'mball', effected_number: 1000 },
      { name: 'Mobile(Web)', code: 'mbweb', effected_number: 200 },
      { name: 'Mobile(App)', code: 'mbapp', effected_number: 1000 }
    ]
  },
  getProbabilityOfPurchase: config => {
    return { target_uv: 1, conv_rate: 1, visit_uv: 1, conv_uv: 1, appeared_user: 1 }
  },
  bidDetailsCalcEstimate: config => {
    return {
      monthly_click: 10,
      monthly_impression: 2,
      monthly_spend: 300
    }
  },
  trackingTags: config => {
    return [
      {
        'custom_tag_name': '2019 SS Event a',
        'rule': 'URL Equals',
        'category': 'Conversion',
        'custom_value_name': '2019_SS_Event_a',
        'destination_url': 'https://www.lazada.vn',
        'refer_url': 'https://www.lazada.vn',
        'conversion_value': 50000,
        'tracking_tag_id': 23,
        'client_id': 13377,
        'status': true,
        'create_date': '2019-03-21T09:03:46+09:00',
        'checked_date': '2019-03-21T09:03:46+09:00'
      },
      {
        'custom_tag_name': '2019 SS Event b',
        'rule': 'URL Equals',
        'category': 'Conversion',
        'custom_value_name': '2019_SS_Event_b',
        'destination_url': 'https://tiki.vn',
        'refer_url': 'https://tiki.vn',
        'conversion_value': 40000,
        'tracking_tag_id': 24,
        'client_id': 13377,
        'status': false,
        'create_date': '2019-03-21T09:03:46+09:00',
        'checked_date': '2019-03-21T09:03:46+09:00'
      }
    ]
  },
  trackingCompanies: config => {
    return [
      {
        'id': 1,
        'displayName': 'Adbrix Classic',
        'value': 'adbrix'
      },
      {
        'id': 2,
        'displayName': 'Adbrix',
        'value': 'adbrix2'
      }
    ]
  },
  userDirectories() {
    return [
      {
        'code': 'ct001',
        'name': 'IT',
        'stat_count': 0,
        'sub_items': [
          {
            'code': 'ct0010013',
            'parent_code': 'ct001',
            'name': 'IT Java',
            'stat_count': 600000
          },
          {
            'code': 'ct0010023',
            'parent_code': 'ct001',
            'name': 'IT Java',
            'stat_count': 600000
          }
        ]
      },
      {
        'code': 'ct002',
        'name': 'IT',
        'stat_count': 0,
        'sub_items': [
          {
            'code': 'ct001001',
            'parent_code': 'ct001',
            'name': 'IT Java',
            'stat_count': 600000
          },
          {
            'code': 'ct001002',
            'parent_code': 'ct001',
            'name': 'IT Java',
            'stat_count': 600000
          }
        ]
      }
    ]
  },
  setOfColumns: [
    {
      value: 'modify_columns',
      label: 'Modify columns'
    },
    {
      value: 'custom',
      label: 'Custom'
    },
    {
      value: '180308',
      label: '180308'
    }
  ],
  listColumns: [
    {
      default: true,
      isSelected: true,
      label: 'Account name',
      parent: 0,
      value: 'accountName'
    },
    {
      default: true,
      isSelected: true,
      label: 'Currency',
      parent: 0,
      value: 'currency'
    }
  ],
  verifyKeyword() {
    return [
      {
        'keyword': 'Currency',
        'stat_result': 30000
      }
    ]
  },
  verifyPosition() {
    return [
      {
        'site_name': 'donga.com',
        'date': '18/02/28'
      }
    ]
  },
  revenueRange() {
    return {
      'cpc': {
        'pc': { 'min': '150', 'max': '3000' },
        'mobile': { 'min': '50', 'max': '3000' }
      },
      'cpm': {
        'pc': { 'min': '200', 'max': '3000' },
        'mobile': { 'min': '50', 'max': '3000' }
      },
      'cpvc': {
        'pc': { 'min': '2000', 'max': '4000' },
        'mobile': { 'min': '1000', 'max': '4000' }
      },
      'cpmg': {
        'pc': { 'min': '2000', 'max': '6000' },
        'mobile': { 'min': '1000', 'max': '6000' }
      }
    }
  },
  listCarriers() {
    return [
      {
        'id': 1494,
        'country': 'Japan',
        'carrier_name': 'NTT Docomo',
        'stat_count': 4321000
      }
    ]
  },
  listBrowsers() {
    return [
      {
        'id': 1,
        'name': 'Chrome',
        'number_of_site': 9000
      }
    ]
  },
  getListCustomUserGroup() {
    return [
      {
        'campaign_library_id': 1494,
        'targeting_device': 'OAID',
        'register_date': '2018-04-23',
        'targeting_name': 'A set'
      }
    ]
  },
  getListManufacture() {
    return [
      {
        'id': 1494,
        'manufacture': 'Samsung',
        'carrier_name': 'GalaxyS7(G930A)',
        'stat_count': 4138792
      }
    ]
  }
}
