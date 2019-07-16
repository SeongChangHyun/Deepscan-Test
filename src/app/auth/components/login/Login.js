import {
  validEmail
} from '@/utils/validate'
import { Auth } from '@/common/constants'

/*
  Version: v0.6
  Documentation: WP_TG3.0_Functional Requirement Specification_Authentication_v0.6
*/

export default {
  name: 'LoginForm',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.includes('@') && !validEmail(value)) {
        callback(new Error(this.$t('login.errMsgEmail')))
      } else {
        callback()
      }
    }
    return {
      validateUsername,
      loginForm: {
        email: '',
        password: '',
        redirect: undefined
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur', message: this.$t('generalAuth.msg1') },
          { trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('generalAuth.msg3') }
        ]
      },
      passwordType: Auth.TYPE_PASSWORD_FIELD,
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      for (const key in this.loginForm) {
        if (this.loginForm.hasOwnProperty(key)) {
          if (this.loginForm[key]) {
            this.loginForm[key] = this.loginForm[key].trim()
          }
        }
      }
      this.$refs.loginForm.validate((valid, errorList) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.$message({
                message: this.$t('generalAuth.loginSuccessfully'),
                type: 'success'
              })
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch((error) => {
              this.loading = false
              if (!error.response) {
                this.$message.error(this.$t(`generalAuth.loginFailed`))
                return
              }
              if (error.response.data && error.response.status) {
                let errorData = error.response.data
                if (typeof errorData === 'string') {
                  errorData = JSON.parse(errorData)
                }
                if (errorData.error_description) {
                  this.$message.error(this.$t(`generalAuth.${errorData.error_description}`))
                } else {
                  this.$message.error(this.$t(`generalAuth.loginFailed`))
                }
              } else {
                this.$message.error(this.$t(`generalAuth.loginFailed`))
              }
              this.loading = false
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
    showPwd() {
      if (this.passwordType === Auth.TYPE_PASSWORD_FIELD) {
        this.passwordType = ''
      } else {
        this.passwordType = Auth.TYPE_PASSWORD_FIELD
      }
    },
    goToRegister() {
      this.$router.push({ path: '/register' })
    },
    goToResetPwd() {
      if (this.loading) {
        return
      }
      this.$router.push({ path: '/reset-password' })
    }
  }
}
