import resetPwdServices from '@/app/auth/services/resetPassword'
import { Auth } from '@/common/constants'
import { validPassword } from '@/utils/validate'

/*
  Version: v1.0
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.0
*/

export default {
  name: 'ResetForm',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.maxLengthPwd) {
        callback(new Error(this.$t('register.errMsgPwdLength')))
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      } else {
        callback()
      }
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if (value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.maxLengthPwd) {
        callback(new Error(this.$t('register.errMsgPwdLength')))
      }
      if (!validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      if (value !== this.rsPwdForm.password) {
        callback(new Error(this.$t('register.errMsgRepeatPwd')))
      }
      callback()
    }
    return {
      rsPwdForm: {
        password: '',
        passwordRpt: ''
      },
      rsPwdRules: {
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordRpt: [
          { required: true, trigger: 'blur', validator: validateRepeatPassword }
        ]
      },
      hasExpired: true,
      isLoading: false
    }
  },
  mounted() {
    resetPwdServices.checkCode({ code: this.$route.query.passwordResetCode })
      .then((response) => {
        this.hasExpired = ((new Date().getTime()) - (new Date(response.data.time).getTime())) > Auth.MILISECONDS_OF_DAY
      })
  },
  methods: {
    goTo(link) {
      this.$router.push({ path: link })
    },
    onRsPwd() {
      this.$refs.rsPwdForm.validate((valid) => {
        if (valid) {
          resetPwdServices.changePassword(this.registerForm).then((response) => {
            if (response.data) {
              this.goTo('/login')
            }
          })
        }
      })
    }
  }
}
