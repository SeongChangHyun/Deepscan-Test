import {
  getCreativeImages,
  deleteCreativeImages,
  activateCreativeImages,
  deactivateCreativeImages,
  getImageSizesByAccount,
  createCreativeImages,
  getListCreative,
  deleteCreative,
  activateCreative,
  getCreative,
  updateDynamicCreative
} from '../services/apiServices'
import { CreativeImageMutationType } from './actionsTypes'

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
            .GET_CREATIVE_IMAGE_FAILED, error)
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
            .DELETE_CREATIVE_IMAGES_FAILED, error)
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
            .ACTIVATE_CREATIVE_IMAGES_FAILED, error)
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
            .DEACTIVATE_CREATIVE_IMAGES_FAILED, error)
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
            .GET_IMAGE_SIZES_BY_ACCOUNT_FAILED, error)
          reject(error)
        })
    })
  },
  createCreativeImages({ commit }, creativeImages) {
    commit(CreativeImageMutationType
      .CREATE_CREATIVE_IMAGE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      createCreativeImages(creativeImages)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .CREATE_CREATIVE_IMAGE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .CREATE_CREATIVE_IMAGE_FAILED, error)
          reject(error)
        })
    })
  },
  getListCreative({ commit }) {
    commit(CreativeImageMutationType
      .GET_LIST_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getListCreative()
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .GET_LIST_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .GET_LIST_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  deleteCreative({ commit }, creative) {
    commit(CreativeImageMutationType
      .DELETE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      deleteCreative(creative)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .DELETE_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .DELETE_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  activateCreative({ commit }, creative) {
    commit(CreativeImageMutationType
      .ACTIVATE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      activateCreative(creative)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  deactivateCreative({ commit }, creativeImages) {
    commit(CreativeImageMutationType
      .DEACTIVATE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      activateCreative(creativeImages)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .DEACTIVATE_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .DEACTIVATE_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  getCreative({ commit }) {
    commit(CreativeImageMutationType
      .GET_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      getCreative()
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .GET_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .GET_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  updateDynamicCreative({ commit }, creative) {
    commit(CreativeImageMutationType
      .UPDATE_DYNAMIC_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      updateDynamicCreative(creative)
        .then(response => {
          const { data } = response
          commit(CreativeImageMutationType
            .UPDATE_DYNAMIC_CREATIVE_SUCCESS, data)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .UPDATE_DYNAMIC_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  }
}
