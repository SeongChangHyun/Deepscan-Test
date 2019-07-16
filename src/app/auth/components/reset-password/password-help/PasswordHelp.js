import { validEmail } from '@/utils/validate'
import AccountApiService from '@/app/services/accountApiService'

/*
  Version: v1.5
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.5
*/

// Init api services
const AccountService = AccountApiService.build()

export default {
  name: 'PasswordHelp',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('resetPwd.msg2')))
      }
      callback()
    }
    return {
      validateEmail,
      isLoading: false,
      rsPwdForm: {
        email: ''
      },
      rsPwdRules: {
        email: [
          { required: true, trigger: 'blur', message: this.$t('generalAuth.msg1') },
          { trigger: 'blur', validator: validateEmail }
        ]
      }
    }
  },
  methods: {
    goTo(link) {
      this.$router.push({ path: link })
    },
    onRsPwd() {
      this.rsPwdForm.email = this.rsPwdForm.email.trim()
      this.$refs.rsPwdForm.validate((valid, errorList) => {
        if (valid) {
          this.isLoading = true
          AccountService.resetPassword(this.rsPwdForm)
            .then(() => {
              this.$message({
                message: this.$t('resetPwd.msg5'),
                type: 'success'
              })
              this.$store.dispatch('UpdateResultForm', {
                title: 'resetPwd.subTitle',
                content: 'resetPwd.sentAccSuccessful',
                buttonText: 'resetPwd.rsForm',
                actionBtn: () => {
                  this.goTo('/reset-password')
                }
              })
              this.goTo('/result')
              this.isLoading = false
            })
            .catch((error) => {
              if (error.response) {
                let errorData = error.response.data
                if (typeof errorData === 'string') {
                  errorData = JSON.parse(errorData)
                }
                this.$message.error(this.$t(`resetPwd.${errorData.message}`))
                this.rsPwdForm.email = ''
                this.isLoading = false
              } else {
                this.$message.error(this.$t('api.generalError'))
              }
            })
        } else {
          for (const key in errorList) {
            if (errorList.hasOwnProperty(key)) {
              const element = errorList[key]
              this.$message.error(this.$t(element[0].message))
              break
            }
          }
          return false
        }
      })
    }
  }
}
