import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import { refreshToken } from '@/app/auth/services/login'

class BaseApiService {
  constructor() {
    axios.defaults.baseURL = process.env.BASE_API //  api base_url
    axios.defaults.timeout = process.env.REQUEST_TIMEOUT // request timeout
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    // axios.interceptors.request.use(
    //   config => {
    //     if (store.getters.token) {
    //       config.headers['X-Token'] = getToken()
    //     }
    //     return config
    //   },
    //   error => {
    //     console.log(error)
    //     Promise.reject(error)
    //   }
    // )
    this.initToken()
  }

  initToken = () => {
    const token = getToken()
    if (token) {
      this.setToken(token)
    }
  }

  setToken = (token) => {
    setToken(token)
    axios.defaults.headers.common['token'] = token
  }

  call = async(payload) => {
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
