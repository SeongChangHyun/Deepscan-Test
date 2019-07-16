import { mockFeedSetting } from './data/listFeedSetting'
import { mockCollectedInformation } from './data/listCollectedInformation'
export default {
  requestListFeedSetting: config => {
    return mockFeedSetting.listFeedSetting
  },
  requestListCollectedInformation: config => {
    return {
      data: mockCollectedInformation.collectedInformation
    }
  },
  deleteFeedSetting: config => {
    return {
      data: 'success'
    }
  },
  createFeedSetting: config => {
    return {
      result: 'success'
    }
  },
  checkFeedType: config => {
    return {
      feed_type: 'naver_open_v3',
      message: 'tgapimsg_not_sure_feed_type'
    }
  },
  checkFullFeed: config => {
    return {
      result: 'success'
    }
  },
  checkFullUrl: config => {
    return [
      {
        result: 'valid',
        url_type: 'adding_feed'
      },
      {
        result: 'valid',
        url_type: 'soldout_feed'
      }
    ]
  }
}
