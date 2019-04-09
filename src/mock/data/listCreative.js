export const mockTableColumns = [
  {
    label: '',
    prop: 'status',
    sortable: true,
    width: '30px'
  },
  {
    label: '소재명',
    prop: 'name',
    sortable: 'true'
  },
  {
    label: '유형',
    prop: 'type',
    sortable: true
  },
  {
    label: '크기',
    prop: 'size'
  },
  {
    label: '미리보기',
    prop: 'view'
  },
  {
    label: '외부배경색',
    prop: 'backgroundcolor'
  },
  {
    label: '연결캠페인수',
    prop: 'campaignnumber'
  },
  {
    label: '등록일',
    prop: 'createddate'
  }
]
export const mockTableData = [
  {
    id: '1',
    status: 'Active',
    name: '소재 001',
    type: '다이나믹',
    size: '000x000',
    view: '마우스 오버시 URL 툴팁 처리',
    backgroundcolor: '없음',
    campaignnumber: 20,
    createddate: '20-03 09:13'
  }, {
    id: '2',
    status: 'StandBy',
    name: '소재 002',
    type: '다이나믹',
    size: '000x001',
    view: '마우스 오버시 URL 툴팁 처리',
    backgroundcolor: 'FF9900',
    campaignnumber: 20,
    createddate: '20-03 09:13'
  }, {
    id: '3',
    status: 'Paused',
    name: '소재 003',
    type: '다이나믹 1',
    size: '000x002',
    view: '마우스 오버시 URL 툴팁 처리',
    backgroundcolor: '없음',
    campaignnumber: 20,
    createddate: '20-03 09:13'
  }, {
    id: '4',
    status: 'Disabled',
    name: '소재 004',
    type: '다이나믹 1',
    size: '000x003',
    view: '마우스 오버시 URL 툴팁 처리',
    backgroundcolor: 'FF9900',
    campaignnumber: 20,
    createddate: '20-03 09:13'
  }
]
export const creative = {
  id: '1',
  action: 'update',
  creative_type: 'dynamic',
  banner_name: 'creative banner',
  bannerNamePrefix: 'Qoo10_YP_',
  theme: '+AltButton_300x250',
  url: 'https://placeholder.com/',
  impression_check_url: 'https://placeholder.com/',
  app_deeplink_android: '',
  impression_check_app_deeplink_android: '',
  app_deeplink_apple: 'https://placeholder.com/',
  impression_check_app_deeplink_apple: 'https://placeholder.com/',
  app_mobile_url: 'https://placeholder.com/',
  impression_check_app_mobile_url: 'https://placeholder.com/',
  status: 'Active',
  name: '소재 001',
  type: 'dynamic ads',
  size: '480x720',
  view: '마우스 오버시 URL 툴팁 처리',
  backgroundcolor: '없음',
  campaignnumber: 20,
  createddate: '20-03 09:13',
  ci: {
    id: '1',
    status: 'Disable',
    name: '소재 001',
    type: '다이나믹',
    size: '1024x768',
    basicci: 'https://placeholder.com/',
    auxiliaryci: 'https://placeholder.com/',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  },
  dynamicOption: {
    backgroundColor: '#c9dee6',
    labelContext: '사용안함',
    titleBold: true,
    titleColor: '#000000',
    titlePt: 11,
    priceColor: '#ffffff',
    pricePt: 11
  },
  backgroundFileName: 'tmp_201904022125.jpg',
  externalBackgroundColor: '#000000',
  template_codes: [
    'bannerTypeWp:wpHtml:wpTplDot_310_90',
    'bannerTypeWp:wpHtml:wpTplAndGlass_468_60'
  ],
  option: 'use_search',
  event_file_name: 'tmp_201904022124.jpg',
  copy_parameters: 'false',
  extend_options: {
    outer_color: '#b21818'
  }
}
export const creativeToUpdate = {
  id: '1',
  action: 'update',
  creative_type: 'dynamic',
  banner_name: 'creative banner',
  url: 'https://placeholder.com/',
  impression_check_url: 'https://placeholder.com/',
  app_deeplink_android: '',
  impression_check_app_deeplink_android: '',
  app_deeplink_apple: 'https://placeholder.com/',
  impression_check_app_deeplink_apple: 'https://placeholder.com/',
  app_mobile_url: 'https://placeholder.com/',
  impression_check_app_mobile_url: 'https://placeholder.com/',
  status: 'Active',
  name: '소재 001',
  type: 'dynamic ads',
  size: '480x720',
  view: '마우스 오버시 URL 툴팁 처리',
  backgroundcolor: '없음',
  campaignnumber: 20,
  createddate: '20-03 09:13',
  ci: {
    id: '1',
    status: 'Disable',
    name: '소재 001',
    type: '다이나믹',
    size: '1024x768',
    basicci: 'https://placeholder.com/',
    auxiliaryci: 'https://placeholder.com/',
    nooflinkedcreative: 20,
    createddate: '20-03 09:13'
  },
  dynamicOption: {
    backgroundColor: '#c9dee6',
    labelContext: '사용안함',
    titleBold: true,
    titleColor: '#000000',
    titlePt: 11,
    priceColor: '#ffffff',
    pricePt: 11
  },
  backgroundFileName: 'tmp_201904022125.jpg',
  externalBackgroundColor: '#000000',
  template_codes: [
    'bannerTypeWp:wpHtml:wpTplDot_310_90',
    'bannerTypeWp:wpHtml:wpTplAndGlass_468_60'
  ],
  option: 'use_search',
  event_file_name: 'tmp_201904022124.jpg',
  copy_parameters: 'false',
  extend_options: {
    outer_color: '#b21818'
  }
}
export default {
  getListCreative: () => {
    return mockTableData
  },
  deleteCreative: config => {
    const listCreative = JSON.parse(config.body)
    return listCreative.map(creative => creative.id)
  },
  activateCreative: config => {
    const listCreative = JSON.parse(config.body)
    return listCreative.map(creative => creative.id)
  },
  deactivateCreative: config => {
    const listCreative = JSON.parse(config.body)
    return listCreative.map(creative => creative.id)
  },
  getCreative: () => {
    return creative
  },
  updateDynamicCreative: config => {
    const creativeToUpdate = JSON.parse(config.body)
    return creativeToUpdate
  }
}
