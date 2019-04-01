import { CreativeConstant } from '@/common/constants'
import { CreativeImageMutationType
} from './actionsTypes'
export default {
  // Get CIs
  [CreativeImageMutationType
    .GET_CREATIVE_IMAGE_IN_PROGRESS]: () => {},
  [CreativeImageMutationType
    .GET_CREATIVE_IMAGE_SUCCESS]: (state, payload) => {
    state.listCi = payload
  },
  // Get imageSizes
  [CreativeImageMutationType
    .GET_IMAGE_SIZES_BY_ACCOUNT_IN_PROGRESS]: () => {},
  [CreativeImageMutationType
    .GET_IMAGE_SIZES_BY_ACCOUNT_SUCCESS]: (state, payload) => {
    state.imageSizes = payload
  },
  [CreativeImageMutationType
    .GET_IMAGE_SIZES_BY_ACCOUNT_FAILD]: () => {},
  // Delete CIs
  [CreativeImageMutationType
    .DELETE_CREATIVE_IMAGES_IN_PROGRESS]: () => {},
  [CreativeImageMutationType
    .DELETE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.filter(ci => payload.indexOf(ci.id) < 0)
  },
  [CreativeImageMutationType
    .DELETE_CREATIVE_IMAGES_FAILD]: () => {},
  // Activate CIs
  [CreativeImageMutationType
    .ACTIVATE_CREATIVE_IMAGES_IN_PROGRESS]: () => {},
  [CreativeImageMutationType
    .ACTIVATE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.map(ci => payload.indexOf(ci.id) < 0 ? ci : { ...ci, status: CreativeConstant.CI_STATUS.ENABLE })
  },
  [CreativeImageMutationType
    .ACTIVATE_CREATIVE_IMAGES_FAILD]: () => {},
  // Deactivate CIs
  [CreativeImageMutationType
    .DEACTIVATE_CREATIVE_IMAGES_IN_PROGRESS]: () => {},
  [CreativeImageMutationType
    .DEACTIVATE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.map(ci => payload.indexOf(ci.id) < 0 ? ci : { ...ci, status: CreativeConstant.CI_STATUS.DISABLE })
  },
  [CreativeImageMutationType
    .DEACTIVATE_CREATIVE_IMAGES_FAILD]: () => {}
}
