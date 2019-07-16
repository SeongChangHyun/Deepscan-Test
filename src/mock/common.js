export default {
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
  }
}
