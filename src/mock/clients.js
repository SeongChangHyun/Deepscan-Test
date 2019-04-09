import clientsData from './data/listClients'
import industryData from './data/listIndustries'

export default {
  getListIndustry: config => {
    return industryData
  },

  getList: config => {
    return {
      page: 2,
      itemPerPage: 20,
      totals: 100,
      list: clientsData
    }
  },

  deleteList: config => {
    return {
      status: true
    }
  },

  createClient: config => {
    return true
  }
}
