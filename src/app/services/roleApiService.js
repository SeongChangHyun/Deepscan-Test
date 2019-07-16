import RestAdapter from '@/services/restAdapter'
import { user } from '@/common/apiUrlConfig'

/**
 * @typedef  {RoleApiService}
 */
export default class RoleApiService extends RestAdapter {
  /**
   * @type  {String}
   */
  static resource = RestAdapter.resource
  getAccountRole(accountId) {
    return this.get(user.get_account_roles.replace('{account_id}', accountId))
  }
  getAccountRoleWidthClient(accountId, clientId) {
    return this.get(user.get_account_roles_with_role.replace('{account_id}', accountId).replace('{client_id}', clientId))
  }
  getListAccount(accountId) {
    return this.get(user.get_list_account.replace('{account_id}', accountId))
  }
  getServicesConfiguration(accountId) {
    const header = { 'Content-Type': 'application/json' }
    return this.get(user.get_list_services_configuration.replace('{account_id}', accountId), {}, header)
  }
  saveServicesConfiguration(accountId, payload) {
    const header = { 'Content-Type': 'application/json' }
    return this.post(user.get_list_services_configuration.replace('{account_id}', accountId), payload, header)
  }
  searchAccountByKeyword(accountId, keyword) { // only super
    return this.get(user.get_all_account_by_keyword.replace('{account_id}', accountId) + '?keyword=' + keyword)
  }
}
