import HttpAdapter from './httpAdapter'
import { Common } from '@/common/constants'

/**
 * @type Auth
 */
export default class AuthAdapter extends HttpAdapter {
  /**
   * @type {String}
   */
  static resource = '/oauth'
  static base = ''

  /**
   * @type {String}
   */
  id = 'id'

  /**
   * @param {String} resource
   * @param {Object} options
   * @param {Object} http
   */
  constructor(resource, options = {}, http = null) {
    super({
      baseURL: process.env.OAUTH2_API,
      path: AuthAdapter.normalize(AuthAdapter.base, resource)
    })
    this.axiosConfig()
  }

  static build() {
    return new this(this.resource)
  }

  axiosConfig() {
    this.http.interceptors.request.use((config) => {
      config.headers.Authorization = `Basic ${window.btoa(Common.AUTHORIZATION_TOKEN)}`
      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  configError(error) {
    if (error.response && error.response.status) {
      const status = error.response.status
      switch (status) {
        case 403: case 404: case 500:
          this.respondError(this.i18n.t(`api.status${status}`))
          return Promise.reject(error)
        default:
          return Promise.reject(error)
      }
    } else {
      this.respondError(this.i18n.t(`api.networkError`))
    }
    return Promise.reject(error)
  }
}

export const Auth = new AuthAdapter()
