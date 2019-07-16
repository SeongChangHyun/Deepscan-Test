import {
  GetFeedSettingType,
  GetListCollectedInformationType,
  TrackingTagsType,
  StateSummaryType
} from './mutationTypes'
import { Message } from 'element-ui'
import i18n from '@/lang'
import { SUCCESS } from '../../../common/constants'
import accountApiService from '@/app/services/accountApiService'
import commonApiService from '@/app/services/commonApiService'

// Init api services
const AccountApiService = accountApiService.build()
const CommonApiService = commonApiService.build()

export default {
  getFeedSummaryData({ commit }) {
    return new Promise((resolve, reject) => {
      AccountApiService.getFeedSummaryData().then(response => {
        commit(StateSummaryType.UPDATE_FEED_SUMMARY_DATA_SUCCESS, response)
        resolve(response)
      }).catch((error) => {
        Message.error(i18n.t('productFeed.stateSummaryErrorMessage.feedSummaryData'))
        commit(StateSummaryType.UPDATE_FEED_SUMMARY_DATA_FAIL, [])
        reject(error)
      })
    })
  },
  getProductListData({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.getProductListData(params).then(response => {
        commit(StateSummaryType.UPDATE_PRODUCT_LIST_DATA_SUCCESS, response)
        resolve(response)
      }).catch((error) => {
        Message.error(i18n.t('productFeed.stateSummaryErrorMessage.productListData'))
        commit(StateSummaryType.UPDATE_PRODUCT_LIST_DATA_FAIL, [])
        reject(error)
      })
    })
  },
  getListSuggestion({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.getProductListData(params).then(response => {
        commit(StateSummaryType.UPDATE_SUGGEST_LIST_DATA_SUCCESS, response)
        resolve(response)
      }).catch((error) => {
        Message.error(i18n.t('productFeed.stateSummaryErrorMessage.suggestListData'))
        commit(StateSummaryType.UPDATE_SUGGEST_LIST_DATA_FAIL, [])
        reject(error)
      })
    })
  },
  getListFeedSetting({ commit }, params) {
    commit(GetFeedSettingType.GET_FEED_SETTING_IN_PROGRESS, [])
    return AccountApiService.getListFeedSetting(params)
      .then(response => {
        if (response) {
          commit(GetFeedSettingType.GET_FEED_SETTING_SUCCESS, response)
        } else {
          commit(GetFeedSettingType.GET_FEED_SETTING_FAILED, response)
        }
      })
      .catch(error => {
        commit(GetFeedSettingType.GET_FEED_SETTING_FAILED, error)
      })
  },

  getListCollectedInformation({ commit }, params) {
    commit(GetListCollectedInformationType.GET_COLLECTED_INFORMATION_IN_PROGRESS, [])
    return AccountApiService.getListCollectedInformation(params)
      .then(response => {
        if (response instanceof Array) {
          commit(GetListCollectedInformationType.GET_COLLECTED_INFORMATION_SUCCESS, response)
        } else {
          commit(GetListCollectedInformationType.GET_COLLECTED_INFORMATION_FAILED, [])
        }
      })
      .catch(error => {
        commit(GetListCollectedInformationType.GET_COLLECTED_INFORMATION_FAILED, error)
      })
  },
  s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  },
  downloadCollectedInformation({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.http.defaults.responseType = 'blob'
      AccountApiService.downloadCollectedInformation(params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteFeedSetting({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.deleteFeedSetting(params)
        .then(response => {
          if (!response) {
            return reject()
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkFeedType({ commit }, params) {
    return new Promise((resolve, reject) => {
      CommonApiService.checkFeedType(params)
        .then(response => {
          if (!response) {
            return reject()
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkFeedFull({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.checkFeedFull(params)
        .then(response => {
          if (!response) {
            return reject()
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkFeedUrl({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.checkFeedUrl(params)
        .then(response => {
          if (!response) {
            return reject()
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createFeedSetting({ commit }, params) {
    return new Promise((resolve, reject) => {
      AccountApiService.createFeedSetting(params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetchTrackingTagsStatus({ commit }, payload) {
    commit(TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_STATUS)
    return AccountApiService.statusTrackingTags(payload)
      .then(response => {
        commit(TrackingTagsType.UPDATE_TRACKING_TAGS_STATUS, response)
      })
      .catch(error => {
        commit(TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_STATUS, false)
        this.handleError(error)
      })
  },
  fetchTrackingTagsVerify({ commit }) {
    commit(TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_VERIFY)
    return AccountApiService.verifyTrackingTags()
      .then(response => {
        commit(TrackingTagsType.UPDATE_TRACKING_TAGS_VERIFY, response)
      })
      .catch(error => {
        commit(TrackingTagsType.UPDATE_TRACKING_TAGS_LOADING_VERIFY, false)
        this.handleError(error)
      })
  },
  getAllTrackingTags({ commit }, params) {
    return AccountApiService.getAllTrackingTags(params)
      .then(response => {
        if (response instanceof Array) {
          commit(TrackingTagsType.GET_ALL_TRACKING_TAGS_SUCCESS, response)
        } else {
          commit(TrackingTagsType.GET_ALL_TRACKING_TAGS_FAILED, response)
        }
      })
      .catch(error => {
        commit(GetFeedSettingType.GET_FEED_SETTING_FAILED, error)
        this.handleError(error)
      })
  },
  createTrackingTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      AccountApiService.createTrackingTag(payload)
        .then(response => {
          if (response && response.result === SUCCESS) {
            commit(TrackingTagsType.CREATE_TRACKING_TAG_SUCCESS, payload)
          } else {
            commit(TrackingTagsType.CREATE_TRACKING_TAG_FAILED, null)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkExist({ commit }, { params, callback }) {
    return AccountApiService.getAllTrackingTags(params)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  changeTrackingTagStatus({ commit }, { params, callback }) {
    return AccountApiService.changeTrackingTagStatus(params)
      .then(res => {
        return callback(null, res)
      })
      .catch(error => {
        return callback(error)
      })
  },
  handleError({ error }) {
    if (error.response) {
      let errorData = error.response.data
      if (typeof errorData === 'string') {
        errorData = JSON.parse(errorData)
      }
      Message.error(errorData.error_description)
      this.rsPwdForm.email = ''
      this.isLoading = false
    } else {
      Message.error(i18n.t('api.generalError'))
    }
  }
}
