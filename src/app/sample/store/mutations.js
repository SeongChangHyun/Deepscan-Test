import { SampleMutationTypes } from './mutationTypes'
export default {
  [SampleMutationTypes.SAMPLE_MUTATION_TYPE]: (state, payload) => {
    state.data = payload
  }
}
