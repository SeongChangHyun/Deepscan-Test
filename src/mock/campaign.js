import { mockCampaignReporting } from './data/listCampaignReporting'
export default {
  requestDatacampaign: config => {
    return mockCampaignReporting.campaignReportings
  },
  checkingTag: config => {
    return true
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
    return [{ id: 1, name: 'Location 1', total: '10000' }, { id: 2, name: 'Location 2', total: '20000' }]
  },
  getListLanguage: config => {
    return [{ id: 1, name: 'English', effected_number: '10000', 'code': 'en' }, { id: 2, 'code': 'l2', name: 'Language 2', effected_number: '20000' }]
  },
  getListDevice: config => {
    return [
      { name: 'All available device(default)', code: 'all', effected_number: '' },
      { name: 'Desktop(All)', code: 'dta', effected_number: '610,720' },
      { name: 'Mobile(All)', code: 'mball', effected_number: '1000' },
      { name: 'Mobile(Web)', code: 'mbweb', effected_number: '200' },
      { name: 'Mobile(App)', code: 'mbapp', effected_number: '1000' }
    ]
  },
  getProbabilityOfPurchase: config => {
    return { targetUV: 1, convRate: 1, visitUV: 1, convUV: 1, appearedUser: 1 }
  },
  bidDetailsCalcEstimate: config => {
    const { value } = JSON.parse(config.body)
    return {
      estimateMonthlyClick: 10 * value,
      estimateImpressionsClick: 2 * value,
      estimateMonthlySpend: 300 * value
    }
  }
}
