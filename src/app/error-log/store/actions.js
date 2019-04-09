import { errorLogTypes } from './mutationTypes'
export default {
  addErrorLog({ commit }, log) {
    commit(errorLogTypes.ADD_ERROR_LOG, log)
  }
}
