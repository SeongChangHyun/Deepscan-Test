import {
  getCreativeImages,
  deleteCreativeImages,
  activateCreativeImages,
  deactivateCreativeImages,
  getImageSizesByAccount
} from '../services/apiServices'
import { CreativeImageMutationType
} from './actionsTypes'

export default {
  getCreativeImages({ commit }) {
    commit(CreativeImageMutationType
      .GET_CREATIVE_IMAGE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getCreativeImages()
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .GET_CREATIVE_IMAGE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .GET_CREATIVE_IMAGE_FAILD, error)
          reject(error)
        })
    })
  },
  deleteCreativeImages({ commit }, creativeImages) {
    commit(CreativeImageMutationType
      .DELETE_CREATIVE_IMAGES_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      deleteCreativeImages(creativeImages)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .DELETE_CREATIVE_IMAGES_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .DELETE_CREATIVE_IMAGES_FAILD, error)
          reject(error)
        })
    })
  },
  activateCreativeImages({ commit }, creativeImages) {
    commit(CreativeImageMutationType
      .ACTIVATE_CREATIVE_IMAGES_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      activateCreativeImages(creativeImages)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_IMAGES_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_IMAGES_FAILD, error)
          reject(error)
        })
    })
  },
  deactivateCreativeImages({ commit }, creativeImages) {
    commit(CreativeImageMutationType
      .DEACTIVATE_CREATIVE_IMAGES_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      deactivateCreativeImages(creativeImages)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .DEACTIVATE_CREATIVE_IMAGES_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .DEACTIVATE_CREATIVE_IMAGES_FAILD, error)
          reject(error)
        })
    })
  },
  getImageSizesByAccount({ commit }) {
    commit(CreativeImageMutationType
      .GET_IMAGE_SIZES_BY_ACCOUNT_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getImageSizesByAccount()
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .GET_IMAGE_SIZES_BY_ACCOUNT_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .GET_IMAGE_SIZES_BY_ACCOUNT_FAILD, error)
          reject(error)
        })
    })
  }
}
