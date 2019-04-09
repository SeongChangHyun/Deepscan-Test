import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth'
import { refreshToken } from '@/app/auth/services/login'
import { getClientId } from './auth'

class BaseApiService {
  constructor() {
    axios.defaults.baseURL = process.env.BASE_API //  api base_url
    axios.defaults.timeout = process.env.REQUEST_TIMEOUT // request timeout
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    this.initToken()
    this.axiosResponseValidate()
  }

  initToken = () => {
    const token = getToken()
    if (token) {
      this.setToken(token)
    }
  }

  axiosResponseValidate() {
    axios.interceptors.response.use((response) => {
      if (response.status === 200) {
        return response
      }
      Message({
        message: 'An error has occurred, please try again later !',
        type: 'error',
        duration: 5 * 1000
      })
      // TO DO : handle error orther
    }, (error) => {
      if (error.response && error.response.status) {
        const status = error.response.status
        switch (status) {
          case 401:
            // TO DO : handle 401
            break
          case 404:
            // TO DO : handle 404
            break
          case 500:
            // TO DO : handle 500
            break
          default:
            // TO DO : handle error orther
            break
        }
      } else {
        Message({
          message: 'Network Failed, please try again later !',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error)
    })
  }

  setToken = (token) => {
    setToken(token)
    axios.defaults.headers.common['token'] = token
  }

  replaceUrl(url = '') {
    url = url.replace('{client_id}', getClientId())
    return url
  }
  processPayload(payload) {
    payload.url = this.replaceUrl(payload.url)
    return payload
  }
  async call(payload) {
    payload = this.processPayload(payload)
    try {
      return axios.request(payload)
    } catch (error) {
      if (error.message === 'ExpiredTime') {
        // when token ExpiredTime
        await refreshToken()
        return axios.request(payload) // recall api
      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        throw new Error(error)
      }
    }
  }

  get = (url, params = {}) => this.call({ url, params, method: 'GET' })

  post = (url, data = {}, params = {}) => this.call({ url, data, params, method: 'POST' })

  put = (url, data = {}, params = {}) => this.call({ url, data, params, method: 'PUT' })

  delete = (url, params = {}) => this.call({ url, params, method: 'DELETE' })

  uploadFile = (url, acceptedFiles, process = () => { }) => {
    const data = new FormData()
    const file = acceptedFiles[0]
    data.append('files', file, file.name)

    return this.call({
      url,
      data,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default new BaseApiService()
