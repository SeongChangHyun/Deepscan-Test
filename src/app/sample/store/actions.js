import { getSampleDataApi } from '../apiServices'
import { SampleMutationTypes } from './mutationTypes'
export default {
  sampleAction({ commit }, payload) {
    const response = getSampleDataApi(payload)
    commit(SampleMutationTypes.SAMPLE_MUTATION_TYPE, { response })
  }
}
