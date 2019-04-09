import { errorLogTypes } from './mutationTypes'
export default {
  [errorLogTypes.ADD_ERROR_LOG]: (state, log) => {
    state.logs.push(log)
  }
}
