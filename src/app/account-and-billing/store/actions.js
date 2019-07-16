import {
  UserMutationType,
  ClientUserMutationType,
  SettlementApiTableTopMutationType,
  SettlementApiTableBottomMutationType,
  myInformationType,
  ServiceManageMutationType,
  ClientMutationType } from './actionsTypes'
import apiServices from '@/app/services/clientApiService'
import CommonApiService from '@/app/services/commonApiService'
import AccountApiService from '@/app/services/accountApiService'
import UserApiService from '@/app/services/userApiService'
import RoleApiService from '../../services/roleApiService'

const ClientApiServices = apiServices.build()
const commonApiService = CommonApiService.build()
const accountApiService = AccountApiService.build()
const userApiService = UserApiService.build()
const roleApiService = RoleApiService.build()
export default {

  getListService({ commit }, params) {
    commit(ServiceManageMutationType.GET_LIST_SERVICE_IN_PROGRESS, {})
    return ClientApiServices.getListService(params).then(response => {
      commit(ServiceManageMutationType.GET_LIST_SERVICE_SUCCESS, response)
    }).catch(error => {
      commit(ServiceManageMutationType.GET_LIST_SERVICE_FAIL, error)
    })
  },

  getAllUsersAccessByCreateAccount({ commit }) {
    commit(UserMutationType
      .GET_LIST_USER_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      userApiService.getAllUsersAccessByCreateAccount()
        .then(response => {
          commit(UserMutationType
            .GET_LIST_USER_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(UserMutationType
            .GET_LIST_USER_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getClientsByCreateAccount({ commit }) {
    commit(ClientMutationType
      .GET_LIST_CLIENT_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ClientApiServices.getClientsByCreateAccount()
        .then(response => {
          commit(ClientMutationType
            .GET_LIST_CLIENT_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(ClientMutationType
            .GET_LIST_CLIENT_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getListAccountsByClient({ commit }, clientId) {
    commit(ClientUserMutationType
      .GET_LIST_CLIENT_USER_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      userApiService.getListAccountsByClient(clientId)
        .then(response => {
          commit(ClientUserMutationType
            .GET_LIST_CLIENT_USER_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(ClientUserMutationType
            .GET_LIST_CLIENT_USER_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getSettlementApiDataTableTop({ commit, dataGet }) {
    commit(SettlementApiTableTopMutationType
      .GET_LIST_DATA_TABLE_TOP_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ClientApiServices.getsettlementDataTableTop(dataGet)
        .then(response => {
          commit(SettlementApiTableTopMutationType
            .GET_LIST_DATA_TABLE_TOP_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(SettlementApiTableTopMutationType
            .GET_LIST_DATA_TABLE_TOP_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getSettlementApiDataTableBottom({ commit, dataGet }) {
    commit(SettlementApiTableBottomMutationType
      .GET_LIST_DATA_TABLE_BOTTOM_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ClientApiServices.getsettlementDataTableBottom(dataGet)
        .then(response => {
          commit(SettlementApiTableBottomMutationType
            .GET_LIST_DATA_TABLE_BOTTOM_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(SettlementApiTableBottomMutationType
            .GET_LIST_DATA_TABLE_BOTTOM_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  // Client manage
  getListClientsInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.getListClients(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  createClientInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.createClients(data)
        .then(response => {
          resolve()
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  deleteClientsInClientManage(data) {
    return new Promise((resolve, reject) => {
      accountApiService.deleteClients(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  updateStatusOfClientInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.updateStatusOfClient(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getDetailClientInClientManage({ commit }, clientId) {
    return new Promise((resolve, reject) => {
      accountApiService.getClientDetail(clientId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getUserAccessOfClientInClientManage({ commit }, clientId) {
    return new Promise((resolve, reject) => {
      userApiService.getUserAccessOfClient({ client_id: clientId })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  verifyPhoneNumberInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.checkPhoneNumber(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getListAdminOfClientInClientManage() {
    return new Promise((resolve, reject) => {
      userApiService.getListAdminOfClientInClientManage()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getListAgencyOfClientInClientManage() {
    return new Promise((resolve, reject) => {
      userApiService.getListAgencyOfClientInClientManage()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  assignRoleForUserInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      ClientApiServices.assignRoleForUserInClientManage(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  updateClientInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.updateClients(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  removeUserPermissionInClientManage({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.removeUserPermission(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getListIndustryInClientManage({ commit }, dataPost) {
    return new Promise((resolve, reject) => {
      commonApiService.getListIndustry()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getAccountInformationInClientManage({ commit }, dataPost) {
    return new Promise((resolve, reject) => {
      accountApiService.getFullInformationUser()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  getAdvertiserTerm() {
    return new Promise((resolve, reject) => {
      accountApiService.getAdvertiserTerm()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  // the end
  getFullInformationUser({ commit }, accId) {
    return new Promise((resolve, reject) => {
      accountApiService.getFullInformationUser(accId)
        .then(response => {
          commit(myInformationType
            .GET_USER_BY_ID_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          // TODO: wait result of confirm with BA and BE for handle error.
          // commit(myInformationType
          //   .GET_USER_BY_ID_FAILED, error)
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  updateInformationUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.updateInformation(data)
        .then(response => {
          resolve()
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  changePhoneNumber({ commit }, phoneNumber) {
    return new Promise((resolve, reject) => {
      accountApiService.checkPhoneNumber(phoneNumber)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  verifyTelCode({ commit }, telCode) {
    return new Promise((resolve, reject) => {
      accountApiService.verifyTelCode(telCode)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  // end
  getListAccountConsignment({ commit }, clientId) {
    return new Promise((resolve, reject) => {
      accountApiService.getAccountConsignment(clientId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  sendInvite({ commit }, data) {
    return new Promise((resolve, reject) => {
      accountApiService.sendInviteUser(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  inviteUserToManageClients({ commit }, payload) {
    return new Promise((resolve, reject) => {
      accountApiService.inviteUserToManageClients(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  editUserRole({ commit }, payload) {
    return new Promise((resolve, reject) => {
      return userApiService.editUserRole(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  removeUserPermissionWithClient({ commit }, data) {
    return new Promise((resolve, reject) => {
      return accountApiService.removeUserPermissionWithClient(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  updateCommissionFee({ commit }, data) {
    return new Promise((resolve, reject) => {
      return accountApiService.updateCommissionFee(data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  },
  SaveListServicesConfiguration({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      return roleApiService.saveServicesConfiguration(payload.account_id, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response)
          } else {
            reject(error)
          }
        })
    })
  }
}
