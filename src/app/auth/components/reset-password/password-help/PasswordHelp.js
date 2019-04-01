import { validEmail } from '@/utils/validate'
import resetPwdServices from '@/app/auth/services/resetPassword'
import { Message } from 'element-ui'
import { Auth } from '@/common/constants'

/*
  Version: v1.0
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.0
*/

export default {
  name: 'PasswordHelp',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('register.errMsgEmailRequired')))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('register.errMsgEmailFormat')))
      }
      callback()
    }
    return {
      isLoading: false,
      rsPwdForm: {
        email: ''
      },
      rsPwdRules: {
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ]
      }
    }
  },
  methods: {
    goTo(link) {
      this.$router.push({ path: link })
    },
    onRsPwd() {
      this.$refs.rsPwdForm.validate((valid) => {
        if (valid) {
          resetPwdServices.resetPassword(this.rsPwdForm).then((response) => {
            const user = response.data
            if (user) {
              if ((new Date().getTime()) - (new Date(user.time).getTime()) > Auth.MILISECONDS_OF_DAY) {
                Message.success(this.$t('resetPwd.errMsg005'))
              } else {
                Message.success(this.$t('resetPwd.errMsg004'))
                this.rsPwdForm.resetFields()
              }
            } else {
              Message.error(this.$t('resetPwd.errMsg003'))
            }
          })
        }
      })
    }
  }
}
