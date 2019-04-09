import {
  verifyCode,
  sendVerifyEmail
} from '@/app/auth/services/activation'
import { Message } from 'element-ui'

/*
  Version: v0.5
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.5
*/

export default {
  name: 'UserActivation',
  data() {
    return {
      isLoading: false,
      isActivated: false
    }
  },
  mounted() {
    verifyCode(this.$route.query.validateCode)
      .then((response) => {
        this.isActivated = response.data
      })
  },
  methods: {
    handleActivation() {
      if (this.isActivated) {
        this.goTo('/login')
      } else {
        this.reSendVerifyEmail()
      }
    },
    reSendVerifyEmail() {
      sendVerifyEmail(this.$route.query.code)
        .then(() => {
          Message.success(this.$t('activation.msgSentVerifyEmail'))
        })
    },
    goTo(link) {
      this.$router.push({
        path: link
      })
    }
  }
}
