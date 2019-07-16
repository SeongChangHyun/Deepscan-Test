import state from './states'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const campaign = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default campaign
