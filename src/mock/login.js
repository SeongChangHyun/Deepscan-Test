import { param2Obj } from '@/utils'
import loginData from './data/login'

export default {
  getUserInfo: config => {
    const tmp = param2Obj(config.url)
    const id = tmp.id ? tmp.id : 'adm001' // mockdata: if id === undefined -> return infomation of current sample
    const result = loginData.userMap.filter(user => user.id === id)
    return result.length === 0 ? false : result[0]
  },
  logout: () => 'success'
}
