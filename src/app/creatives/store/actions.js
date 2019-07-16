import apiServices from '@/app/services/clientApiService'
import AccountApiService from '@/app/services/accountApiService'
import { CreativeImageMutationType } from './actionsTypes'
import { CreativeConstant } from '@/common/constants'
import { convertToFormData } from '@/utils/creative'

const ClientApiServices = apiServices.build()
const accountApiService = AccountApiService.build()

export default {
  getCreativeImages({ commit }) {
    commit(CreativeImageMutationType
      .GET_CREATIVE_IMAGE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ClientApiServices.getCreativeImages()
        .then(response => {
          commit(CreativeImageMutationType
            .GET_CREATIVE_IMAGE_SUCCESS, response)
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
      ClientApiServices.deleteCreativeImages(creativeImages)
        .then(response => {
          commit(CreativeImageMutationType
            .DELETE_CREATIVE_IMAGES_SUCCESS, response)
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
      ClientApiServices.activateCreativeImages(creativeImages)
        .then(response => {
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_IMAGES_SUCCESS, response)
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
      ClientApiServices.deactivateCreativeImages(creativeImages)
        .then(response => {
          commit(CreativeImageMutationType
            .DEACTIVATE_CREATIVE_IMAGES_SUCCESS, response)
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
      ClientApiServices.getImageSizesByAccount()
        .then(response => {
          commit(CreativeImageMutationType
            .GET_IMAGE_SIZES_BY_ACCOUNT_SUCCESS, response)
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
      ClientApiServices.createCreativeImages(creativeImages)
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
  getListCreative({ commit }, params) {
    commit(CreativeImageMutationType
      .GET_LIST_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      accountApiService.getListCreative(params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteCreative({ commit }, creative) {
    commit(CreativeImageMutationType
      .DELETE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      accountApiService.deleteCreative(creative)
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
  changeStatusCreative({ commit }, creative) {
    commit(CreativeImageMutationType
      .ACTIVATE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      accountApiService.changeStatusCreative(creative)
        .then(response => {
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_SUCCESS, response)
          resolve()
        })
        .catch(error => {
          commit(CreativeImageMutationType
            .ACTIVATE_CREATIVE_FAILED, error)
          reject(error)
        })
    })
  },
  getListSizeCreative({ commit }) {
    commit(CreativeImageMutationType
      .ACTIVATE_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      accountApiService.getListSizeCreative()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getCreative({ commit }) {
    commit(CreativeImageMutationType
      .GET_CREATIVE_IN_PROGRESS, {})
    return new Promise((resolve, reject) => {
      ClientApiServices.getCreative()
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
      ClientApiServices.updateDynamicCreative(creative)
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
  },
  createCreative({ commit }, params) {
    switch (params.type) {
      case CreativeConstant.CREATIVE_BANNER_TYPE:
        return new Promise((resolve, reject) => {
          accountApiService.createFixedBanner(params.formData)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response) {
                reject(error.response)
              } else {
                reject(error)
              }
            })
        })
      case CreativeConstant.CREATIVE_ANIMATED_TYPE:
        return new Promise((resolve, reject) => {
          accountApiService.createCreativeAnimated(params.formData)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response) {
                reject(error.response)
              } else {
                reject(error)
              }
            })
        })
      case CreativeConstant.CREATIVE_DYNAMIC_TYPE:
        return new Promise((resolve, reject) => {
          accountApiService.createDynamicAds(params.formData)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response) {
                reject(error.response)
              } else {
                reject(error)
              }
            })
        })
      case CreativeConstant.CREATIVE_NATIVE_TYPE:
        return new Promise((resolve, reject) => {
          accountApiService.createNativeAds(convertToFormData(params.formData))
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response) {
                reject(error.response)
              } else {
                reject(error)
              }
            })
        })
      case CreativeConstant.CREATIVE_VIDEO_TYPE:
        return new Promise((resolve, reject) => {
          accountApiService.createVideoAds(params.formData)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response) {
                reject(error.response)
              } else {
                reject(error)
              }
            })
        })
      default:
        break
    }
  },
  createCreativeUploadImages({ commit }, params) {
    return accountApiService.createCreativeUploadImages(params)
  }
}
