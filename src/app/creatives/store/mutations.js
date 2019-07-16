import { CreativeConstant } from '@/common/constants'
import {
  CreativeImageMutationType
} from './actionsTypes'

export default {
  // Get CIs
  [CreativeImageMutationType.GET_CREATIVE_IMAGE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.GET_CREATIVE_IMAGE_SUCCESS]: (state, payload) => {
    state.listCi = payload
  },
  // Get imageSizes
  [CreativeImageMutationType.GET_IMAGE_SIZES_BY_ACCOUNT_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.GET_IMAGE_SIZES_BY_ACCOUNT_SUCCESS]: (state, payload) => {
    state.imageSizes = payload
  },
  [CreativeImageMutationType.GET_IMAGE_SIZES_BY_ACCOUNT_FAILED]: () => {
  },
  // Delete CIs
  [CreativeImageMutationType.DELETE_CREATIVE_IMAGES_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.DELETE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.filter(ci => payload.indexOf(ci.id) < 0)
  },
  [CreativeImageMutationType.DELETE_CREATIVE_IMAGES_FAILED]: () => {
  },
  // Activate CIs
  [CreativeImageMutationType.ACTIVATE_CREATIVE_IMAGES_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.ACTIVATE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.map(ci => payload.indexOf(ci.id) < 0 ? ci : {
      ...ci,
      status: CreativeConstant.CI_STATUS.ENABLE
    })
  },
  [CreativeImageMutationType.ACTIVATE_CREATIVE_IMAGES_FAILED]: () => {
  },
  // Deactivate CIs
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_IMAGES_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_IMAGES_SUCCESS]: (state, payload) => {
    state.listCi = state.listCi.map(ci => payload.indexOf(ci.id) < 0 ? ci : {
      ...ci,
      status: CreativeConstant.CI_STATUS.DISABLE
    })
  },
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_IMAGES_FAILED]: () => {
  },
  // Create CIs
  [CreativeImageMutationType.CREATE_CREATIVE_IMAGE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.CREATE_CREATIVE_IMAGE_SUCCESS]: (state, payload) => {
    state.createdCis = payload
  },
  [CreativeImageMutationType.CREATE_CREATIVE_IMAGE_FAILED]: () => {
  },

  // Get list creative
  [CreativeImageMutationType.GET_LIST_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.GET_LIST_CREATIVE_SUCCESS]: (state, payload) => {
    state.listCreative = payload
  },
  [CreativeImageMutationType.GET_LIST_CREATIVE_FAILED]: () => {
  },

  // Delete Creative
  [CreativeImageMutationType.DELETE_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.DELETE_CREATIVE_SUCCESS]: (state, payload) => {
    state.listCreative = state.listCreative.filter(creative => payload.indexOf(creative.id) < 0)
  },
  [CreativeImageMutationType.DELETE_CREATIVE_FAILED]: () => {
  },

  // Activate Creative
  [CreativeImageMutationType.ACTIVATE_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.ACTIVATE_CREATIVE_SUCCESS]: (state, payload) => {
    state.listCreative = state.listCreative.map(creative => payload.indexOf(creative.id) < 0 ? creative : {
      ...creative,
      status: CreativeConstant.CREATIVE_STATUS.ACTIVE
    })
  },
  [CreativeImageMutationType.ACTIVATE_CREATIVE_FAILED]: () => {
  },
  // Deactivate CIs
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_SUCCESS]: (state, payload) => {
    state.listCreative = state.listCreative.map(creative => payload.indexOf(creative.id) < 0 ? creative : {
      ...creative,
      status: CreativeConstant.CREATIVE_STATUS.DISABLED
    })
  },
  [CreativeImageMutationType.DEACTIVATE_CREATIVE_FAILED]: () => {
  },

  // Get creative
  [CreativeImageMutationType.GET_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.GET_CREATIVE_SUCCESS]: (state, payload) => {
    state.creative = payload
  },
  [CreativeImageMutationType.GET_CREATIVE_FAILED]: () => {
  },
  // Update creative
  [CreativeImageMutationType.UPDATE_DYNAMIC_CREATIVE_IN_PROGRESS]: () => {
  },
  [CreativeImageMutationType.UPDATE_DYNAMIC_CREATIVE_SUCCESS]: (state, payload) => {
    state.creativeToUpdate = payload
  },
  [CreativeImageMutationType.UPDATE_DYNAMIC_CREATIVE_FAILED]: () => {
  }

}
