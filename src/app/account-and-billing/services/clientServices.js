import BaseApiService from '@/utils/baseApiService'
import {
  client_management
} from '@/common/apiUrlConfig'

export default {
  getListIndustry() {
    return BaseApiService.get(client_management.get_list_industry)
  },
  getListClients(dataPost) {
    return BaseApiService.get(client_management.get_list, {
      dataPost
    })
  },
  createClients(client) {
    return BaseApiService.post(client_management.create_client, {
      client
    })
  },
  updateClients(client) {
    return BaseApiService.post(client_management.update_client, {
      client
    })
  },
  deleteClients(client) {
    return BaseApiService.post(client_management.delete_client, {
      client
    })
  }
}
