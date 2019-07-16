import { getToken } from '@/utils/auth'
export default {
  user: '',
  status: '',
  code: '',
  id: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: '',
  rolesRouter: '',
  addr1: '',
  addr2: '',
  contact_name: '',
  country_code: '',
  language: '',
  timezone: '',
  view_currency: '',
  zip: '',
  setting: {
    articlePlatform: []
  },
  postalAddressesRoadBase: [],
  postalAddressesHouseBase: [],
  postalAddressesError: '',
  resetAddressesDialog: false,
  resultConfig: {
    title: '',
    content: '',
    buttonText: '',
    actionBtn: () => {}
  },
  listAccount: [],
  getlistAccountProgress: false,
  account_id: '',
  service_manage: {}
}
