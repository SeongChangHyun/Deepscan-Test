import { Message } from 'element-ui'

/**
 * @typedef {Service}
 */
export default class Service {
  /**
   * @param {*} options
   */
  constructor(options) {
    this.options = options
  }

  respondError(message) {
    Message({
      message: message,
      type: 'error',
      duration: 3 * 1000
    })
  }

  /**
   * @param {*} options
   */
  static build(options) {
    return new this(options)
  }
}
