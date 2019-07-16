import AccountApiService from '@/app/services/accountApiService'
import { Auth } from '@/common/constants'
import { validPassword } from '@/utils/validate'

/*
  Version: v1.5
  Documentation: WP_TG3.0_Functional Requirement Specification_ResetPassword_v1.5
*/

// Init api services
const AccountService = AccountApiService.build()

export default {
  name: 'ResetForm',
  data() {
    const validatePassword = (rule, value, callback) => {
      if ((value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) || !validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      callback()
    }
    const validateRepeatPassword = (rule, value, callback) => {
      if ((value.length < Auth.MIN_LENGTH_PASSWORD || value.length > Auth.MAX_LENGTH_PASSWORD) || !validPassword(value)) {
        callback(new Error(this.$t('register.errMsgPwdCondition')))
      }
      if (value !== this.rsPwdForm.password) {
        callback(new Error(this.$t('register.errMsgRepeatPwd')))
      }
      callback()
    }
    return {
      validatePassword,
      validateRepeatPassword,
      tokenInvalid: false,
      oldEmail: '',
      rsPwdForm: {
        password: '',
        passwordRpt: ''
      },
      rsPwdRules: {
        password: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: 'Password' }) },
          { trigger: 'blur', validator: validatePassword }
        ],
        passwordRpt: [
          { required: true, trigger: 'blur', message: this.$t('memberAccount.errMsg1', { fieldName: 'Confirm Password' }) },
          { trigger: 'blur', validator: validateRepeatPassword }
        ]
      },
      hasExpired: false,
      isLoading: true
    }
  },
  mounted() {
    AccountService.verifyResetToken({ token: this.$route.query.passwordResetCode })
      .then(() => {
        this.hasExpired = false
        this.isLoading = false
      })
      .catch((error) => {
        let errorData = error.response.data
        if (typeof errorData === 'string') {
          errorData = JSON.parse(errorData)
        }
        this.tokenInvalid = errorData.errorKey === undefined ? true : errorData.errorKey.split(':')[0] !== Auth.TOKEN_INVALID
        this.oldEmail = errorData.errorKey ? errorData.errorKey.split(':')[1] : ''
        this.isLoading = false
        this.hasExpired = true
        this.$message.error(this.$t(`resetPwd.${!this.tokenInvalid ? 'alertExpired' : 'msgInvalid'}`))
      })
  },
  methods: {
    goTo(link, query = {}) {
      this.$router.push({ path: link, query })
    },
    onRsPwd() {
      this.rsPwdForm.password = this.rsPwdForm.password.trim()
      this.rsPwdForm.passwordRpt = this.rsPwdForm.passwordRpt.trim()
      this.$refs.rsPwdForm.validate((valid, errorList) => {
        if (valid) {
          AccountService.updatePassword({
            token: this.$route.query.passwordResetCode,
            password: this.rsPwdForm.password,
            confirmation_password: this.rsPwdForm.passwordRpt
          })
            .then(() => {
              this.$message({
                message: this.$t('resetPwd.msg005'),
                type: 'success'
              })
              this.goTo('/login')
            })
            .catch((error) => {
              let errorData = error.response.data
              if (typeof errorData === 'string') {
                errorData = JSON.parse(errorData)
              }
              this.$message.error(errorData.title)
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
    },
    getText(tokenInvalid) {
      const result = this.$t(`resetPwd.${tokenInvalid ? 'msgInvalid' : 'msgExpired'}`)
      return result.replace('\n', '<br>')
    },
    resentGetToken() {
      if (this.tokenInvalid) {
        this.goTo('/login')
      }
      this.isLoading = true
      AccountService.resetPassword({
        email: this.oldEmail
      })
        .then(() => {
          this.$message({
            message: this.$t('resetPwd.msg5'),
            type: 'success'
          })
          this.$store.dispatch('UpdateResultForm', {
            title: 'resetPwd.sentEmailSuccessTitle',
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
          let errorData = error.response.data
          if (typeof errorData === 'string') {
            errorData = JSON.parse(errorData)
          }
          this.$message.error(this.$t(`resetPwd.${errorData.message}`))
          this.isLoading = false
        })
    }
  }
}
