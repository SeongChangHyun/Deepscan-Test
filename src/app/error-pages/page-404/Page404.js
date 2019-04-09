import err404 from '@/assets/images/404.png'
import err404cloud from '@/assets/images/404.png'
export default {
  name: 'Page401',
  data() {
    return {
      err404: err404 + '?' + new Date(),
      err404cloud: err404cloud + '?' + new Date()
    }
  },
  methods: {

  }
}
