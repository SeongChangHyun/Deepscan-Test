import {
  UserMutationType, ClientUserMutationType, SettlementApiTableTopMutationType, SettlementApiTableBottomMutationType,
  myInformationType,
  ServiceManageMutationType,
  ClientMutationType
} from './actionsTypes'

export default {
  // Get list creative
  [UserMutationType.GET_LIST_USER_IN_PROGRESS]: () => {
  },
  [UserMutationType.GET_LIST_USER_SUCCESS]: (state, payload) => {
    state.listUsers = payload
  },
  [UserMutationType.GET_LIST_USER_FAILED]: (state) => {
    state.listUsers = []
  },
  // settlement api
  [SettlementApiTableTopMutationType.GET_LIST_DATA_TABLE_TOP_IN_PROGRESS]: () => {
  },
  [SettlementApiTableTopMutationType.GET_LIST_DATA_TABLE_TOP_SUCCESS]: (state, payload) => {
    state.listTableTop = payload
  },
  [SettlementApiTableTopMutationType.GET_LIST_DATA_TABLE_FAILED]: (state) => {
    state.listUsers = []
  },
  [SettlementApiTableBottomMutationType.GET_LIST_DATA_TABLE_BOTTOM_IN_PROGRESS]: () => {
  },
  [SettlementApiTableBottomMutationType.GET_LIST_DATA_TABLE_BOTTOM_SUCCESS]: (state, payload) => {
    state.listTableBottom = payload
  },
  [SettlementApiTableBottomMutationType.GET_LIST_DATA_TABLE_BOTTOM_FAILED]: (state) => {
    state.listUsers = []
  },

  // My Information form
  [myInformationType.GET_USER_BY_ID_IN_PROGRESS]: () => {
  },
  [myInformationType.GET_USER_BY_ID_SUCCESS]: (state, payload) => {
    state.currentUser = payload
    if (payload.cell_phone_no) {
      state.currentUser.cell_phone = payload.cell_phone_no
    }
    if (payload.business_phone_no) {
      state.currentUser.phone = payload.business_phone_no
    }
  },
  [myInformationType.GET_USER_BY_ID_FAILED]: (state) => {
    state.currentUser = null
  },

  [myInformationType.UPDATE_USER_INFORMATION_IN_PROGRESS]: () => {
  },
  [myInformationType.UPDATE_USER_INFORMATION_SUCCESS]: (state, payload) => {
    state.currentUser = payload
  },
  [myInformationType.UPDATE_USER_INFORMATION_FAILED]: (state) => {
    state.currentUser = null
  },

  // Get List Services
  [ServiceManageMutationType.GET_LIST_SERVICE_IN_PROGRESS]: () => {
  },
  [ServiceManageMutationType.GET_LIST_SERVICE_SUCCESS]: (state, payload) => {
    state.listService = payload
  },
  [ServiceManageMutationType.GET_LIST_SERVICE_FAIL]: (state) => {
    state.listService = []
  },
  // Get list client
  [ClientMutationType.GET_LIST_CLIENT_IN_PROGRESS]: () => {
  },
  [ClientMutationType.GET_LIST_CLIENT_SUCCESS]: (state, payload) => {
    state.listClients = payload
  },
  [ClientMutationType.GET_LIST_CLIENT_FAILED]: (state) => {
    state.listClients = []
  },
  // Get list client users
  [ClientUserMutationType.GET_LIST_CLIENT_USER_IN_PROGRESS]: () => {
  },
  [ClientUserMutationType.GET_LIST_CLIENT_USER_SUCCESS]: (state, payload) => {
    state.listClientUsers = payload
  },
  [ClientUserMutationType.GET_LIST_CLIENT_USER_FAILED]: (state) => {
    state.listClientUsers = []
  }
}
