import { getToken } from '@/utils/auth'
export default {
  user: '',
  status: '',
  code: '',
  id: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
}
