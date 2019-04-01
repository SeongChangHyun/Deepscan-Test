const data = {
  campaign: {
    data: 'request thanh cong'
  }
}

export default {
  requestDatacampaign: config => {
    return data
  },
  checkingTag: config => {
    return true
  },
  getIndustry: config => {
    return { name: 'Life & Hobby' }
  },
  getListAdGroup: config => {
    return [{ id: 1, name: 'Group name 1' }, { id: 2, name: 'Group name 2' }]
  },
  getListCampaign: config => {
    return [{ id: 1, name: 'Campaign 1' }, { id: 2, name: 'Campaign 2' }]
  },
  getListIosApp: config => {
    return [{ id: 1, name: 'App Ios 1' }, { id: 2, name: 'App Ios 2' }]
  },
  getListAndroidApp: config => {
    return [{ id: 1, name: 'App android 1' }, { id: 2, name: 'App android 2' }]
  },
  getListCountry: config => {
    return [{ id: 1, name: 'Country 1' }, { id: 2, name: 'Country 2' }]
  },
  getListLocation: config => {
    return [{ id: 1, name: 'Location 1', total: '10000' }, { id: 2, name: 'Location 2', total: '20000' }]
  },
  getListLanguage: config => {
    return [{ id: 1, name: 'Language 1', total: '10000' }, { id: 2, name: 'Language 2', total: '20000' }]
  },
  getListDevice: config => {
    return [
      { label: 'All available device(default)', value: 'all', total: '' },
      { label: 'Desktop(All)', value: 'dta', total: '610,720' },
      { label: 'Mobile(All)', value: 'mball', total: '1000' },
      { label: 'Mobile(Web)', value: 'mbweb', total: '200' },
      { label: 'Mobile(App)', value: 'mbapp', total: '1000' }
    ]
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
