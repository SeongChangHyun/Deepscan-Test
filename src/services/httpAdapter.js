import axios from 'axios'
import Service from './services'
import i18n from '@/lang' // Internationalization

/**
 * @typedef {HttpAdapter}
 */
export default class HttpAdapter extends Service {
  /**
   * @param {String} path
   * @param {String} baseURL
   * @param {Object} options
   * @param {Object} http
   */
  constructor({
    path,
    options = {},
    http = null,
    baseURL,
    timeout = process.env.REQUEST_TIMEOUT
  }) {
    super(options)
    this.path = path
    this.i18n = i18n
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL,
      timeout
    })
  }

  call = async(payload) => {
    try {
      const result = await this.http.request(payload)
      return result.data
    } catch (error) {
      return this.configError(error, payload)
    }
  }

  configError(error) {
    return Promise.reject(error)
  }

  /**
   * @param {String} path
   * @param {Object} options
   */
  static build(path, options) {
    return new this(path, options)
  }

  /**
   * @param {String} url
   * @param {Object} params
   * @returns {*|Promise<any>}
   */
  get(url, params = {}, headers = {}) {
    return this.call({ url: this.constructor.normalize(this.path, url), params, headers, method: 'GET' })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @param {Object} params
   * @returns {*|Promise<any>}
   */
  post(url, data, headers = {}, params = {}) {
    return this.call({ url: this.constructor.normalize(this.path, url), data, headers, params, method: 'POST' })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @param {Object} params
   * @returns {*|Promise<any>}
   */
  put(url, data, params = {}) {
    return this.call({ url: this.constructor.normalize(this.path, url), data, params, method: 'PUT' })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @param {Object} params
   * @returns {*|Promise<any>}
   */
  patch(url, data, params = {}) {
    return this.call({ url: this.constructor.normalize(this.path, url), data, params, method: 'PATCH' })
  }

  /**
   * @param {String} url
   * @param {Object} params
   * @returns {*|Promise<any>}
   */
  delete(url, params = {}) {
    return this.call({ url: this.constructor.normalize(this.path, url), params, method: 'DELETE' })
  }

  /**
   * @param {Object} response
   * @returns {Object}
   */
  static then(response) {
    if (!response.data) {
      return {}
    }
    if (response.headers['content-type'] === 'application/vnd.ms-excel') {
      return response
    }
    if (typeof response.data === 'string') {
      return JSON.parse(response.data)
    }
    return response.data
  }

  static isJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  /**
   * @param {String} start
   * @param {String} end
   * @returns {String}
   */
  static normalize(start, end) {
    if (start) {
      return `${start}/${end}`.replace(/([^:]\/)\/+/g, '$1')
    }
    return `${end}`.replace(/([^:]\/)\/+/g, '$1')
  }

  extractFileNameFromContentDispositionHeader(value) {
    const patterns = [
      /filename\*=[^']+'\w*'"([^"]+)";?/i,
      /filename\*=[^']+'\w*'([^;]+);?/i,
      /filename="([^;]*);?"/i,
      /filename=([^;]*);?/i
    ]

    let responseFilename
    patterns.some(regex => {
      responseFilename = regex.exec(value)
      return responseFilename !== null
    })

    if (responseFilename !== null && responseFilename.length > 1) {
      try {
        return decodeURIComponent(responseFilename[1])
      } catch (e) {
        console.error(e)
      }
    }

    return null
  }
}
