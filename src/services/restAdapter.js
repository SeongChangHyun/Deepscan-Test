import HttpAdapter from './httpAdapter'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Auth } from '@/common/constants'
import { MessageBox } from 'element-ui'

/**
 * @typedef {RestAdapter}
 */
export default class RestAdapter extends HttpAdapter {
  /**
   * @type {String}
   */
  static resource = '/rest/v3'

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
      baseURL: process.env.BASE_API,
      path: RestAdapter.normalize(RestAdapter.base, resource)
    })
    this.axiosConfig()
  }

  axiosConfig() {
    this.http.interceptors.request.use((config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      const user = store.getters.user
      // Replace account_id
      let accountId = store.getters.getRoutersInfo.type === 'client' ? store.getters.getRoutersInfo.accountParentId : store.getters.getRoutersInfo.userAccountId
      if (!accountId) {
        if (user) {
          if (user.account_id) {
            accountId = user.account_id
          }
        }
      }
      if (config.url.includes('{account_id}') && accountId) {
        config.url = config.url.replace('{account_id}', accountId)
      }
      // Replace client_id
      const clientId = store.getters.getRoutersInfo.type === 'client' ? store.getters.getRoutersInfo.clientId : ''
      if (config.url.includes('{client_id}') && clientId) {
        config.url = config.url.replace('{client_id}', clientId)
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  async configError(error, payload) {
    if (error.response && error.response.status) {
      const status = error.response.status
      let errorData = error.response.data
      if (typeof errorData === 'string') {
        errorData = JSON.parse(errorData)
      }
      switch (status) {
        case 401:
          if (!errorData) {
            store.dispatch('FedLogOut')
            return Promise.reject(error)
          } else {
            switch (errorData.error) {
              case Auth.INVALID_TOKEN:
                if (!errorData.error_description) {
                  store.dispatch('FedLogout')
                  return Promise.reject(error)
                } else {
                  const parseErrDesc = errorData.error_description.split(':')
                  switch (parseErrDesc[0]) {
                    case Auth.ACCESS_TOKEN_EXPIRED:
                      // refresh token
                      await store.dispatch('RefreshToken').catch(() => {
                        store.dispatch('FedLogOut')
                      })
                      // recall request
                      try {
                        const dataRecall = await this.http.request(payload)
                        return dataRecall.data
                      } catch (errorRecall) {
                        return await this.configError(errorRecall, payload)
                      }
                    default:
                      return Promise.reject(error)
                  }
                }

              default:
                return Promise.reject(error)
            }
          }
        case 403:
          this.respondError(this.i18n.t(`api.status403`))
          return Promise.reject(error)
        case 404:
          if (errorData) {
            this.respondError(errorData.path + ' ' + errorData.message)
          } else {
            this.respondError(this.i18n.t(`api.status404`))
          }
          return Promise.reject(error)
        case 500:
          if (errorData.title === Auth.SESSION_EXPIRED) {
            MessageBox.alert(
              this.i18n.t(`alertLogout.message`),
              this.i18n.t(`alertLogout.title`),
              {
                confirmButtonText: this.i18n.t(`alertLogout.btnConfirm`),
                type: 'warning',
                showClose: false,
                callback: () => {
                  store.dispatch('FedLogOut').then(() => {
                    window.location.href = ''
                    window.reload()
                  })
                }
              })
          } else {
            this.respondError(this.i18n.t(`api.status500`))
          }
          return Promise.reject(error)

        default:
          return Promise.reject(error)
      }
    } else {
      this.respondError(this.i18n.t(`api.networkError`))
      return Promise.reject(error)
    }
  }

  /**
   * @return {this}
   */
  static build() {
    return new this(this.resource)
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  create(record) {
    return this.post('', record)
  }

  /**
   * @param {String|Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  read(record) {
    return this.get(`/${this.getId(record)}`)
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  update(record) {
    return this.patch(`/${this.getId(record)}`, record)
  }

  /**
   * @param {Object} record
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  destroy(record) {
    return this.delete(`/${this.getId(record)}`)
  }

  /**
   * @param {Object} parameters
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  search(parameters = {}) {
    const queryString = ''
    // apply your logic here
    return this.get(`?${queryString}`).then(response => ({
      rows: response.rows // just an example
    }))
  }

  /**
   * @param {String|Object} record
   * @returns {String}
   */
  getId(record) {
    if (typeof record === 'object') {
      return record[this.id]
    }
    return String(record)
  }
}

export const Rest = new RestAdapter()
