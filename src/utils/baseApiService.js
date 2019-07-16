import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import accountApiService from '@/app/services/accountApiService'
import { getClientId } from './auth'

class BaseApiService {
  constructor() {
    axios.defaults.baseURL = process.env.BASE_API //  api base_url
    axios.defaults.timeout = process.env.REQUEST_TIMEOUT // request timeout
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    this.axiosResponseValidate()
  }

  axiosResponseValidate() {
    axios.interceptors.request.use((config) => {
      if (config.baseURL === process.env.BASE_API && !config.headers.Authorization) {
        const token = getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    }, (error) => {
      // Do something with request error
      console.log(error)
      return Promise.reject(error)
    })
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
        return Promise.reject(error)
      } else {
        Message({
          message: 'Network Failed, please try again later !',
          type: 'error',
          duration: 5 * 1000
        })
      }
    })
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
        await accountApiService.refreshToken()
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
