import RestAdapter from '@/services/restAdapter'
import { user } from '@/common/apiUrlConfig'

/**
 * @typedef  {UserApiService}
 */
export default class UserApiService extends RestAdapter {
  /**
   * @type  {String}
   */
  static resource = RestAdapter.resource + '/users'
  getUserInfo(data) {
    return this.get(user.get_user_info, data)
  }
  getListAgencyOfClientInClientManage() {
    return this.get(user.get_list_agency)
  }
  getListAdminOfClientInClientManage() {
    return this.get(user.get_list_super_admin)
  }
  getUserAccessOfClient(data) {
    return this.get(user.get_user_access_of_client, data)
  }
  editUserRole(data) {
    return this.post(user.edit_user_role, data)
  }
  getAllUsersAccessByCreateAccount() {
    return this.get(user.get_all_users_access_by_create_account)
  }
  getListAccountsByClient(clientId) {
    return this.get(user.get_list_accounts_by_client + '?client_id=' + clientId)
  }
}
